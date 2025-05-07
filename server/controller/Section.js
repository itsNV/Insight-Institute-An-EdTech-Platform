
const Section = require('../models/Section');
const Course = require('../models/Course');
const { default: mongoose } = require('mongoose');


// create section
exports.createSection = async (req, res) => {
    
    try {

        //get data
        const { sectionName, courseId } = req.body;

        //validate data
        if (!sectionName || !courseId) {
            return res.status(403).json({
                success: false,
                message:"Please provide required information"
            })
        }

        //create section
        const newSection = await Section.create({ sectionName });
       

        // update that into course
        const updatedCourse = await Course.findByIdAndUpdate({_id:courseId} ,
            { 
                $push: {
                    CourseContent: newSection._id,
                }
            },
            { new: true }
            
        ).populate('CourseContent').exec();


        res.status(200).json({
            success: true,
            message: "section created successfully",
            updatedCourse,
        })
        
    } catch (error) {

        return res.status(500).json({
            success: false,
            message: "error occurred while creating section",
        })
        
    }
}



//update section
exports.updateSection = async (req, res) => {
    
    try {

        //get data
        const { sectionId, sectionName,courseId } = req.body;

        //validate
        const sectionDetails = await Section.findById(sectionId);

        if (!sectionDetails) { 
            return res.status(404).json({
                success: false,
                message: "section not found",
            })
        }

        // update section
        const updatedSection = await Section.findByIdAndUpdate({ _id: sectionId },
            { sectionName: sectionName },
            {new:true}
        )

        const updatedCourse = await Course.findById({ _id: courseId }
            
        ).populate(
            {
                path: 'CourseContent',
                populate: {
                    path: "subsection"
                }
            }
        ).exec();


        return res.status(200).json({
            success: true,
            message: "section updated successfully",
            updatedCourse: updatedCourse,
        })
        
    } catch (error) {

        return res.status(500).json({
            success: false,
            message: "error updating section",
            error: error.message
        })
        
    }
}




// delete section
exports.deleteSection = async (req, res) => {
    
    try {

        // get section id
        const { sectionId,courseId } = req.body;

        console.log('section ID', sectionId)
        //validate id
        
        const secion_obj = new mongoose.Types.ObjectId(`${sectionId}`)
        const sectionDetails = await Section.findById(secion_obj );

        if (!sectionDetails) { 
            return res.status(404).json({
                success: false,
                message: "section not found",
            })
        }

        console.log('section details', sectionDetails)

        // delete section
        await Section.findByIdAndDelete({ _id: sectionId });

        const updatedCourse = await Course.findById(courseId).populate('CourseContent').exec();

        return res.status(200).json({
            success: true,
            message: "section deleted successfully",
            updatedCourse:updatedCourse
        })
        
    } catch (error) {

        return res.status(403).json({
            success: false,
            message: "Error while deleting section",
            error: error.message
        })
        
    }
}