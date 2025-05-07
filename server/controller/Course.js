
const Course = require('../models/Course');
const User = require('../models/User');
const { uploadFileToCloudinary } = require('../utils/cloudinary');
const Category = require('../models/Category');
const SubSection = require('../models/SubSection');
const Section = require('../models/Section');
const { default: mongoose } = require('mongoose');
require('dotenv').config();

// create course

exports.createCourse = async (req, res) => {
    
    try {

        //fetch data
        const { CourseName, description, price,tag :_tag,
            whatYouWillLearn,category,instructions: _instructions,status
        } = req.body;

        const tag = JSON.parse(_tag)
        const instructions = JSON.parse(_instructions)

        const thumbnail = req.files.thumbnailFile;
        console.log('thumbnail ', thumbnail);



        // validate  --- have to add //!thumbnail 
        // if (!CourseName || !description || !price || 
        //       !whatYouWillLearn || !category || !instructions) { 

        //     return res.status(400).json({
        //         success: false,
        //         message: "Fill all the required fields"
        //     })
        // }


        //find instructor
        const userId = req.user.id; // got from middleware after decode
        const instructorDetails = await User.findOne({ _id: userId })

        // validate instructor
        if (!instructorDetails) {
            return res.status(404).json({
                success: false,
                message: "instructor not found"
            })
        }

        // check if tag is valid or not
        const category_obj = new mongoose.Types.ObjectId(`${category}`)
        const categoryDetails = await Category.findOne({_id: category_obj });

        if (!categoryDetails) {
            return res.status(404).json({
                success: false,
                message: "category not found",
            })
        }


        // upload thumbnail to cloudinary

       const thumbnailImage = await uploadFileToCloudinary(thumbnail, process.env.FOLDER_NAME);
            
  

        // create new entry
        
        const newCourse = await Course.create({

            CourseName,
            description,
            price,
            tag,
            category: categoryDetails._id,
            instructor: instructorDetails._id,
            whatYouWillLearn: whatYouWillLearn,
            thumbnail: thumbnailImage.secure_url,
            instructions: instructions,
            status:status
            

        })

        // update course in user schema
        await User.findByIdAndUpdate({ _id: instructorDetails._id }, 
            {
                $push: {
                    
                    course : newCourse._id
                }
            }
        )


        // update tag schema
        await Category.findByIdAndUpdate({ _id: categoryDetails._id },
            {
                $push: {
                    course: newCourse._id
                }
            }
        )

        return res.status(200).json({
            success: true,
            message: "Course created successfully",
            newCourse
        })
        
    }
    catch (err) { 

        console.log(err);

        return res.status(400).json({
            success: false,
            message: "Error while creating a course",
            err: err.message
        })

    }
}


//delete course
exports.deleteCourse = async (req, res) => {
    
    try {

        const { courseId } = req.body;
        console.log('courseId', courseId);
        const userId = req.user.id;

        // validate id
        const courseDetails = await Course.findById({ _id: courseId })
        
        if (!courseDetails) {
            return res.status(404).json({
                success: false,
                message: "Course not found",
            })
        }


        // unerolled students from course
        const studentsEnrolled = courseDetails.enrolledStudents;

        for (const studentId of studentsEnrolled) { 

            await User.findByIdAndUpdate({ _id: studentId }, {
                $pull: {
                    course: courseId,
                }
            }, {
                new: true,
            })
        }
        
        
        // delete section and subsection

        const coursecontent = courseDetails.CourseContent;

        for (const sectionId of coursecontent) {
            
            const section = Section.findById(sectionId);

            if (section) {
                
                const subsections = section.subsection;

                // delete subsection
                for (const subsectionId in subsections) {

                    await SubSection.findByIdAndDelete(subsectionId )
                }
            }

            // delete section
            await Section.findByIdAndDelete(sectionId)
        }

        

        // delete course
        await Course.findByIdAndDelete({ _id: courseId })

        const instructoreCourses = await Course.find({ instructor: userId }).populate({
            path: 'instructor',
            populate: {
                path:'additionalDetails'
            }
        })
            .populate('enrolledStudents')
            .populate({
                path: 'CourseContent',
                populate: {
                    path: 'subsection'
                }
            })
            .populate('category')
            .populate('RatingAndReview')
            .sort({ createdAt: -1 })
            .exec()

        

        return res.status(200).json({
            success: true,
            message: "Course deleted successfully",
            instructoreCourses:instructoreCourses
        })
        
    } catch (error) {
        
        console.log("Error while deleting a course", error);
        return res.status(400).json({
            success: false,
            message: error.message,
            error: "Error while deleting a course",
        })
    }
}



// edit course
exports.editCourseDetails = async (req, res) => {
    
    try {
        

        const { courseId } = req.body
        const updates = req.body
        
        
       


        console.log('updates:', updates);
        
        // validate
        const courseDetails = await Course.findById({ _id: courseId })
        
        console.log('courseDetails', courseDetails);


        if (!courseDetails) {
            return res.status(404).json({
                success: false,
                message: "Course not found",
            })
        }


        // update only those details which are edited

       

        if (req.files && req.files.thumbnailImage !== undefined) {
            
            const thumbnail = req.files.thumbnailFile;
            const uploadImage = await uploadFileToCloudinary(thumbnail, process.env.FOLDER_NAME);

            courseDetails.thumbnail = uploadImage.secure_url
        }

        // only those details are sent which are updated so don't check for everyone because keys which are not updated can be didplayed undefined and can be updated as undefined
        for (const key in updates) {
            if (updates.hasOwnProperty(key)) { 
                if (key === 'tag' || key === 'instructions') {
                    
                    courseDetails[key] = JSON.parse(updates[key]);
                }

                else {
                    courseDetails[key] = updates[key]
                }
            }
        }


        await courseDetails.save();

        console.log('courseDetails',courseDetails)

        return res.status(200).json({
            success: true,
            message: "Course details updated successfully",
            updatedCourse: courseDetails
        })

    } catch (error) {

        console.log('error while updating course details', error)
        return res.status(400).json({
            success: false,
            message: error.message,
            error:  "Error while updating course details",
        })
        
    }
}

// get all courses
exports.getAllCourses = async (req, res) => {
    
    try {

        const getAllCourses = await Course.find({}, {
            CourseContent: true,
        }).populate({
            path: 'CourseContent',
            populate: {
                path : 'subsection',
            }
        }).exec();

        res.status(200).json({
            success: true,
            message: "All courses are suucessfully fetched",
            getAllCourses,
        })
        
    } catch (error) {

        return res.status(400).json({
            success: false,
            message: "Error while fetching all courses",
            error: error.message
        })
        
    }
}


//get full course details
exports.getFullCourseDetails = async (req, res) => {
    
    try {

        // get CourseId
        const { courseId } = req.query;

        console.log('courseId',courseId)

        //validate
        if (!courseId) {
            return res.status(400).json({
                success: false,
                message: "fill the required field",
            })
        }


        //find course
        const courseDetails = await Course.findById(courseId, {
            CourseContent: true,
            whatYouWillLearn: true,
            description: true,
            CourseName: true,
            CreatedAt: true,
            thumbnail: true,
            price : true,

        })
            .populate({
                path: 'CourseContent',
                populate: {
                    path: 'subsection',
                }
            })
            .populate("RatingAndReview")
            .populate("category")
            .populate({
                path: 'enrolledStudents',
                select: "firstName lastName email accountType"
            })
            .populate({
                path: 'instructor',
                select: "firstName lastName email accountType"
            })
            .exec();
        
        // validate
        if (!courseDetails) {
            return res.status(404).json({
                success: false,
                message:"course not found",
            })
        }


        return res.status(200).json({
            success: true,
            message: "Course details successfully fetched",
            courseDetails,
        })
        
        
    } catch (error) {

        return res.status(500).json({
            success: false,
            message: "Error while fetching course details",
            error: error.message,
        })
        
    }
}  




// instructor courses

exports.instructoreCourses = async (req, res) => {
    
    try {

        const userId = req.user.id;
        // console.log('userId', userId);

        // validate
        const userDetails = await User.findById({ _id: userId });
        

        if (!userDetails) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            })
        }


        // chech that which courses includes this user's or instructore's Id
        const userId_obj = new mongoose.Types.ObjectId(`${userId}`);
        const instructoreCourses = await Course.find({ instructor: userId_obj });

        if (!instructoreCourses) {
            return res.status(404).json({
                success: false,
                message: "No courses found for this instructor",
            })
        }

        return res.status(200).json({
            success: true,
            message: "Instructor courses successfully fetched",
            instructoreCourses: instructoreCourses,
        })
        
 
        
    } catch (error) {

        console.log('error while fetchimg intructore courses', error);

        return res.status(500).json({
            success: false,
            message: error.message,
            error: "Error while fetching instructor courses"
        })
        
    }
}