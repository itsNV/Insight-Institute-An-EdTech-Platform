
const User = require('../models/User');
const { mailSender } = require('../utils/mailSender');
const bcrypt = require('bcrypt')

// reset resetPasswordToken   
exports.resetToken = async (req, res) => {
    
    try {

        // fetch data 
        const email = req.body.email;

        // validate email
        if (!email) { 
            return res.json({
                success: false,
                message: "Fill required field"
            })
        }

        // check if email is registered
        const user = await User.findOne({ email: email });

        if (!user) {
            return res.status(404).josn({
                success: false,
                message: "email is not registered"
            })
        }

        // generate resetPasswordToken
        let resetPasswordToken =  crypto.randomUUID();

        // make entry into database of this resetPasswordToken
        const userEntry = await User.findOneAndUpdate({ email: email },
            
            {
                resetPasswordToken: resetPasswordToken,
                resetPasswordTokenExpires: Date.now() + 5 * 60 * 1000,
            },
            {new:true}

        );


        // generate Link

        let url = `http://localhost:3000/update-password/${resetPasswordToken}`;


        // send mail containing this link

        await mailSender(email,
            "Reset Password Link",
            `Link : ${url}`,
        )

        res.status(200).json({
            success: true,
            message: "Reset Password Link sent successfully",
           

        })

        
    } catch (error) {

        res.status(400).json({
            success: false,
            message: "error sending reset password link"
        })
        
    }
}



// reset password
exports.resetPassword = async (req, res) => {
    
    try {

        // fetch data
        const { newPassword, confirmPassword, resetPasswordToken } = req.body;

        // validate
        if (!newPassword || !confirmPassword) { 
            return res.status(401).json({
                success: false,
                message:"Fill the required fields"
            })
        }

        // check if password match
        if (newPassword != confirmPassword) { 
            return res.status(401).json({
                success: false,
                messsage: "Password does not match"
            })
        }

        // if no entry - resetPasswordToken is invalid
        const userDetailes = await User.findOne({ resetPasswordToken: resetPasswordToken });

        if (!userDetailes) { 
            return res.status(401).json({
                success: false,
                message:"Invalid resetPasswordToken"
            })
        }

        // check for expires time
        if (userDetailes.resetPasswordTokenExpire < Date.now()) {
            return res.status(401).json({
                success: false,
                message:"Token expired please try again"
            })
        }

        const hashPassword = await bcrypt.hash(newPassword, 10);

        // update password in database
        await User.findOneAndUpdate({ resetPasswordToken: resetPasswordToken },
            { password: hashPassword },
            { new: true },
        )

        res.status(200).json({
            success: true,
            message: "Password updated successfully"
        })
        
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: "Error updating password"
        })
    }
}