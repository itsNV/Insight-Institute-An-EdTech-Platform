
const SubSection = require('../models/SubSection');
const Section = require('../models/Section');
require('dotenv').config();
const { uploadFileToCloudinary } = require('../utils/cloudinary')
const Course = require('../models/Course');
const { default: mongoose } = require('mongoose');


// create Subsection
exports.createSubSection = async (req, res) => {
    
    try {

        //get data
        const { title, description,  sectionId,courseId } = req.body;

        const video = req.files.videoFile;

        // validate
        if (!title || !description || !video) {
            return res.status(400).json({
                success: false,
                message: "fill all required fields",
            })
        }


        // upload video to cloudinary
        const uploadVideo = await uploadFileToCloudinary(video, "Insight-Institute");

        

        // create subsection
        const newSubSection = await SubSection.create({
            title: title,
            description: description,
            videoUrl: uploadVideo.secure_url,
            timeDuration: `${uploadVideo.duration}`
        })


        
        //validate section id
        const sectionId_obj = new mongoose.Types.ObjectId(`${sectionId}`)
        const sectionDetails = await Section.findById(sectionId_obj);

        if (!sectionDetails) {
            return res.status(404).json({
                success: false,
                message: "section not found",
            })
        }


        // update section by inserting new subsection into it
        const updatedSection = await Section.findByIdAndUpdate({ _id: sectionId }, {

            $push: {
                subsection: newSubSection._id,
            },
            
        }, { new: true }).populate('subsection').exec();
        

        const updatedCourse = await Course.findByIdAndUpdate({ _id: courseId }).populate({
            path: 'CourseContent',
            populate: {
                path: 'subsection'
            }
        }).exec();

        return res.status(200).json({
            success: true,
            message: "Subsection created successfully",
            updatedCourse: updatedCourse,
        })
        
    } catch (error) {

        return res.status(400).json({
            success: false,
            message: "Error while creating SubSection",
            error: error
        })
        
    }
}



//update section
exports.updateSubSection = async (req, res) => {
    
    try {

        // fetch data
        const { subsectionId, title, description,courseId,sectionId } = req.body;

        console.log('subsectionId',subsectionId)
        
        //validate subsection id
        const subsectionId_obj = new mongoose.Types.ObjectId(`${subsectionId}`)
        const subsectionDetails = await SubSection.findById(subsectionId_obj);

        if (!subsectionDetails) {
            return res.status(404).json({
                success: false,
                message: "Subsection not found"
            })
        }

        if (title !== undefined) {
            subsectionDetails.title = title;
        }

        if (description !== undefined) { 
            subsectionDetails.description = description;

        }

        // if defined or video edited then upload to cloudinary else previous video is already uploaded to cloudinary
        if (req.files && req.files.video !== undefined) { 
            // upload video to cloudinary
            const video = req.files.video
            const uploadVideo = await uploadFileToCloudinary(video, process.env.FOLDER_NAME)
            
            subsectionDetails.videoUrl = uploadVideo.secure_url;
            subsectionDetails.timeDuration = `${uploadVideo.duration}`
        }

        await subsectionDetails.save();

      

        const updatedSection = await Section.findByIdAndUpdate({_id: sectionId},{new:true})

        const updatedCourse = await Course.findByIdAndUpdate({ _id: courseId }).populate({
            path: "CourseContent",
            populate: {
                path:"subsection"
            }
        })



        return res.status(200).json({
            success: true,
            message: "Subsection updated successfully",
            updatedCourse: updatedCourse
    })
        
    } catch (error) {

        return res.status(400).json({
            success: false,
            message: error.message,
            error:"Error while updating Subsection"
        })
        
    }
}



// delete subsection
exports.deleteSubSection = async (req, res) => {
    
    try {

        // get id
        const { subsectionId,courseId,sectionId} = req.body;

        //validate id
        const subsectionDetails = await SubSection.findById(subsectionId);

        if (!subsectionDetails) {
            return res.status(404).json({
                success: false,
                message: "Subsection not found",
            })
        }


        // delete subsection
        await SubSection.findByIdAndDelete({ _id: subsectionId })

        const updatedSection = await Section.findByIdAndUpdate({ _id: sectionId },{new:true})
        
        const updatedCourse = await Course.findByIdAndUpdate({ _id: courseId }, { new: true }).populate({
            path: 'CourseContent',
            populate: {
                path: 'subsection'
            }
        })

        return res.status(200).json({
            success: true,
            message: "Subsection deleted successfully",
            updatedSection: updatedSection,
            updatedCourse: updatedCourse
        })
        
    } catch (error) {

        return res.status(400).json({
            success: false,
            message: "Error while deleting Subsection",
        })
        
    }
}