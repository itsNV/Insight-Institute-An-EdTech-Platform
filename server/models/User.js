
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({

    firstName: {
        type: String,
        required: true,
        trim: true,
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
    },
    password: {
        type: String,
        required: true, 

    },
    email: {
        type: String,
        required: true,
        trim: true,
    },
    additionalDetails: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'Profile'
    },
    courseProgress: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'CourseProgress'
    },
    course: [
        {
        type: mongoose.Schema.Types.ObjectId,
        ref:'Course'
        }
    ],
    accountType: {
        type: String,
        enum:['Admin','Student','Instructor']
    },
    image: {
        type: String,
    },

    resetPasswordToken: {
        type: String,
    },

    resetPasswordTokenExpire: {
        type: Date,
    },
    

})


module.exports = mongoose.model('User', userSchema);