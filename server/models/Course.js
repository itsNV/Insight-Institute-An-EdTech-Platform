
const mongoose = require('mongoose');

const CourseSchema = mongoose.Schema({

    CourseName: {
        type: String,
        trim: true,
    },
    description: {
        type: String,
    },
    CourseContent: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Section'
        }
    ],
    RatingAndReview: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'RatingAndReview'
        }
    ],
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref : 'Category'
    },
    enrolledStudents: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    
    tag: {
        type: [String],
    },

    thumbnail: {
        type : String
    },

    price: {
        type:String
    },
    instructor: {
        type: mongoose.Schema.Types.ObjectId,
        ref  : 'User'
    },
    whatYouWillLearn: {
        type : String
    },
    status: {
        type: String,
        enum: ['Draft', 'Published']
    },
    instructions: {
        type : [String],
    },
    CreatedAt: {
        type: Date,
        default: Date.now()
    }
})


module.exports = mongoose.model('Course', CourseSchema);