
const mongoose = require('mongoose');

const AdditionalDetails = new mongoose.Schema({

    dateOfBirth: {
        type:String,
    },
    about: {
        type:String,
    },
    gender: {
        type: String,
        
    },
    countryCode: {
        type: String,
    },
    contactNo: {
        type: String,
       
    },
    profession: {
        type: String,
    }

})


module.exports = mongoose.model('Profile',AdditionalDetails)