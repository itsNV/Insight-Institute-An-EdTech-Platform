
const mongoose = require('mongoose');
const { mailSender } = require('../utils/mailSender');
const otpTemplate = require('../mail/templates/emailVerificationTemplate');



const OTPSchema = new mongoose.Schema({

    otp: {
        type: String,
        required: true,
    },

    email: {
        type: String,
        required: true,
    },

    createdAt: {
        type: Date,
        default: Date.now(),
        expires: 5*60*1000   // 5 minutes
    }
})


// send mail for verification

const verificationMail = async (email, otp) => {
    
    try {

        await mailSender(email, "verification mail",
            otpTemplate(otp),
        );
        
    } catch (error) {

        console.log("error while sending verification mail", error);
        
    }
}


// send before saving the data to database
OTPSchema.pre("save", async function (next) {
    
   

    await verificationMail(this.email, this.otp);
    
    next();
})


module.exports = mongoose.model('OTP',OTPSchema);