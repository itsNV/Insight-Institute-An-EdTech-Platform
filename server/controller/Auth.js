
const User = require('../models/User');
const Profile = require('../models/AdditionalDetails');
const OTP = require('../models/OTP');
const otpGenerator = require('otp-generator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { response } = require('express');
require('dotenv').config()

// send otp

exports.sendOtp = async (req, res) => {
    
    try {

        //fetch data
        const { email } = req.body;

        // validate email
        if (!email) {
            return res.status(402).json({
                success: false,
                message:"enter email address"
            })
        }


        // check is already exist
        const exstingEmail = await User.findOne({ email: email })

        if (exstingEmail) {
            return res.status(400).json({
                success: false,
                message:"enter email address already exists"
            })
        }

        // generate otp
        let otp = await otpGenerator.generate(6, {
            upperCaseAlphabets: false,
            lowerCaseAlphabets: false,
            specialChars: false,
        })

        console.log('otp', otp)

        // check for unique otp
        let result = await OTP.findOne({ otp: otp })

        while (await result === otp) {
            otp = await otpGenerator.generate(6, {
                upperCaseAlphabets: false,
                lowerCaseAlphabets: false,
                specialChars: false,
            })
            
        }
        console.log('otp', otp)

        // generate entry in database
        const otpEntry = await OTP.create({email,otp})
       

        return res.status(200).json({
            success: true,
            message: " OTP sent successfully",
            otpEntry: otpEntry,
        })
        
    } catch (error) {

        return res.status(500).json({
            success: false,
            message: " Error sending the otp"
        })
        
    }
}



// sign up

exports.signUp = async (req, res) => {
    
    try {

        // fetch data from body
        const {
            firstName,
            lastName,
            email,
            otp,
            password,
            confirmPassword,
            accountType,
        } = req.body;
        

        //validate
        if (!firstName || !lastName || !email || !otp || !password || !confirmPassword) {
            return res.status(403).json({
                success: false,
                message: "Fill all required fields"
            })
        }

        // check 2 passwords
        if (password !== confirmPassword) {
            return res.status(400).json({
                success: false,
                message : 'password does not match'
            })
        }

        // check if email is already registered
        const existingEmail = await User.findOne({ email: email });

        if (existingEmail) {
            return res.status(400).json({
                success: false,
                message: "Email is already registered",
            })
        }

       
        // find recent otp
        const recentOtp = await OTP.find({ email: email }).sort({createdAt : -1}).limit(1)

        

        // validate otp
        console.log('email', email)
        console.log('recentotp', recentOtp)
        console.log('recentotp', recentOtp.otp)
        console.log("printing otp length", recentOtp.length)
        if (recentOtp.length == 0) {
            return res.status(400).json({
                success: false,
                message: "otp is not generated"
            })
        }

        
        if (otp !== recentOtp[0].otp) {
            return res.status(400).json({
                success: false,
                message: "entered otp is Invalid"
            })
        } 

        // hash password
        const hashPassword = await bcrypt.hash(password, 10);

       


        // create database entry

        const profileDetails = await Profile.create({
            gender: null,
            dateOfBirth: null,
            about: null,
            contactNo: null,


        })

       

        const user = await User.create({
            firstName,
            lastName,
            email,
            password: hashPassword,
            accountType,
            additionalDetails: profileDetails._id,
            image: `https://api.dicebear.com/5.x/initials/svg?seed=${firstName} ${lastName}`,
        })
        
        console.log('user', user)
        
        return res.status(200).json({
            success: true,
            message: "User created successfully",
            user
        })

    } catch (error) {
        console.log(error.message)
        return res.status(400).json({
            success: false,
            message: error.message,
            error: "Error creating user while signing Up, Please try again"
        })
        
    }
}



// login

exports.login = async (req, res) => {
    
    try {

        // fetch data
        const { email, password } = req.body;

        // validate
        if (!email || !password) { 
            return res.json({
                success: false,
                message: "Fill the required fields"
            })
        }


        // email exist or not
        const user = await User.findOne({ email: email }).populate('additionalDetails').
            populate({
                path: 'course',
                populate: {
                    path: 'CourseContent',
                    populate: {
                        path:'subsection'
                    }
                }
            }).exec();

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found while logging in"
            })
        }
        
      

        // check for password is correct and generate tocken
        if (await bcrypt.compare(password,user.password)) { 


            let payload = {
                email: user.email,
                id: user._id,
                accountType: user.accountType
            }

            const token = jwt.sign(payload, process.env.JWT_SECRET, {
                expiresIn: "2h"
            })

            user.token = token;
            user.password = undefined;

            

            let options = {
                httpOnly: true,
                expiresIn: Date.now() + 3*24*60*60*1000
            }
           

            return res.cookie('token', token, options).status(200).json({
                success: true,
                message: "User logged in successfully",
                user,
                token,
            })

            

        }
        else {
            return res.status(400).json({
                success: false,
                message: "Password is incorrect"
            })
        }
        
        
    } catch (error) {

        return res.status(400).json({
            success: false,
            message: "Error while logging in" 
        })
        
    }
}


// conta


