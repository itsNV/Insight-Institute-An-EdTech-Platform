
const User = require('../models/User');
const Profile = require('../models/AdditionalDetails');
const Course = require('../models/Course');
const bcrypt = require('bcrypt');
const { uploadFileToCloudinary } = require('../utils/cloudinary')
require('dotenv').config();


// we have alredy created the profile in sign up controller made the values of propeties null.



// we just have to update that profile

//update profile
exports.updateProfile = async (req, res) => {
    
    try {

        //get data
        
        const updates = req.body;

        console.log('updates: ' , updates)

        //get user id
        const userId = req.user.id;  // from authentication (auth.js) at decode token
        const userDetails = await User.findById(userId);

    //    console.log('userDetails', userDetails)

        const profileId = userDetails.additionalDetails; //additionalDetails takes profileid

    //    console.log('profileId: ' ,profileId)

        //validate profileId
        const profileDetails = await Profile.findOne({_id:profileId});
        
        // console.log('profileDetails', profileDetails)

        

        if (!profileDetails) {
            return res.status(404).json({
                success: false,
                message: "profile not found",
            })
        }

         
        //update only those info. which is changed
        for (const key in updates) {
            if (updates.hasOwnProperty(key)) { 
                profileDetails[key] = updates[key];
            }
        }

        // console.log('profileDetails', profileDetails)

        await profileDetails.save();

        

        const updatedProfile = await Profile.findByIdAndUpdate({ _id: profileId },{new:true});
        

        //update user
        const updatedUser = await User.findByIdAndUpdate({ _id: userId }, { additionalDetails: updatedProfile._id }, { new: true }).populate('additionalDetails').exec();
        // send response to client
        console.log('updatedUser', updatedUser)

        res.status(200).json({
            success: true,
            message: "profile updated successfully",
           
            updatedUser: updatedUser
        })
        
    } catch (error) {

        return res.status(400).json({
            success: false,
            message: "Error while updating profile",
            error: error.message
        })
        
    }
}




// delete acoount

exports.deleteAccount = async (req, res) => {
    
    try {

        // fetch id
        const userId = req.user.id;

        // validate id
        const userDetails = await User.findById(userId);

        if (!userDetails) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            })
        }

       

        // delete profile
        await Profile.findByIdAndDelete({ _id: userDetails.additionalDetails })

        console.log('profile')
        
        
        // delete from enrolled courses
     
            
        await User.findByIdAndDelete({_id:userDetails.course})
       
        
        // delete account
        await User.findByIdAndDelete({ _id: userId });

        res.status(200).json({
            success: true,
            message:"Account deleted successfully"
        })
        
    } catch (error) {

        return res.status(400).json({
            success: false,
            message: "Error while deleting account",
            error: error.message,
        })
        
    }
}



// get all user details
exports.getAllUserDetails = async (req, res) => {
    
    try {

        // get user id
        const userId = req.user.id;
        const userDetails = await User.findById(userId).populate(
            {
                path: 'additionalDetails',
            },
            {new: true}
        ).execPopulate();

        if (!userDetails) {
            return res.status(404).json({
                success: false,
                message: "User not found",
                
            })
        }

        res.status(200).json({
            success: true,
            message: "User details successfully retrieved",
            userDetails
        })

       
        
    } catch (error) {

        return res.status(400).json({
            success: false,
            message: "Error while fetching all user details",
            error: error.message,
        })
        
    }
}



// change password
exports.changePassword = async (req, res) => {
    
    try {

        // fetch data
        const { oldPassword, newPassword } = req.body;
        

        //validate
        if (!oldPassword || !newPassword) { 
            return res.json({
                success: false,
                message: "Fill in required information"
            })
        }

        
        // get user by email which is in token which is in middleware where it's decoded and sent to req.user
        const userDetails = await User.findOne({ email: req.user.email })

        // check if old password is correct or not
        console.log('old password',userDetails.password)
        if (await bcrypt.compare(oldPassword, userDetails.password)) {

            const hashPassword = await bcrypt.hash(newPassword, 10);

            await User.findOneAndUpdate({ email: req.user.email },
                { password: hashPassword },
                {new: true}
            )

           return  res.status(200).json({
                success: true,
                message: "Password Changed successfully"
            })
              

     
        }
        else {
            return res.status(402).json({
                success: false,
                message: "old Password is incorrect",
                
            })
    }
            
            // check if passwords match
            // if (newPassword !== confirmPassword) { 
            //     return res.status(402).json({
            //         success: false,
            //         message: "new password and confirm password does not match",
            //     })
                
            // }


            
        

        
    } catch (error) {

        return res.status(402).json({
            success: false,
            error: "Error while changing password",
            message: error.message
        })
        
    }
}


//change profile picture
exports.changePicture = async (req, res) => {
    
    try {

        const userId = req.user.id;
        

        const userDetails = await User.findById({ _id: userId })

        if (!userDetails) {
            return res.status(404).json({
                success: false,
                message: "user not found"
            })
        }
      
        
        if (req.files && req.files.displayimage !== undefined) {
            const displayimage = req.files.displayimage;
            const image = await uploadFileToCloudinary(displayimage, process.env.FOLDER_NAME, 1000, 1000);

            userDetails.image = image.secure_url;
            
        }

        await userDetails.save();
        

        // console.log('image uploaded', image)
        
        const updatedUser = await User.findByIdAndUpdate({ _id: userId }, { new: true }).populate('additionalDetails').exec();

        return res.status(200).json({
            success: true,
            message: "Profile picture updated successfully",
            updatedUser: updatedUser,
        })




        
    } catch (error) {
        console.log("error while updating profile picture", error)
        
        return res.status(500).json({
            success: false,
            message: error.message,
            error:"error while updating profile picture"
        })
    }
}