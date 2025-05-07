
const mongoose = require('mongoose');

const CourseProgressSchema = mongoose.Schema({
    courseId: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'Course'
    },
    completedVideos: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'SubSection'
    }
})


module.exports = mongoose.model('CourseProgress', CourseProgressSchema)