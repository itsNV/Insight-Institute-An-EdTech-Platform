
const mongoose = require('mongoose');



const CategorySchema = mongoose.Schema({
    categoryName: {
        type:String,
    },

    course: [{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Course',
    }],

    description: {
        type:String
    }
})



module.exports = mongoose.model('Category',CategorySchema)