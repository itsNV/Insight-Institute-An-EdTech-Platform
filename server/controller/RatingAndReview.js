
const Course = require("../models/Course");
const RatingAndReview = require("../models/RatingAndReview");
const mongoose = require("mongoose");


// create rating
exports.createRating = async (req, res) => {
    try {
        // get user id
        const userId = req.user.id;

        // fetch data
        const { rating, review, courseId } = req.body;

        //validate
        const courseDetails = await Course.findById(courseId);

        if (!courseDetails) {
            return res.status(404).json({
                success: false,
                message: "Course not found",
            });
        }

        //user enrolled or not

        // facing issue here
        const isStudentEnrolled = await Course.find({
            _id: courseId,
            enrolledStudents: { $elemMatch: { $eq: userId }}
      }).exec();
      
      if (!isStudentEnrolled) {
          
          return res.status(400).json({
            success: false,
            message: "user not enrolled in this course",
          })
          
      }


      console.log('courseId', courseId)
      console.log('userId', userId)

      // already reviwed
      
      const isAlreadyReviewed = await RatingAndReview.findOne({
        // find userId which is same as user(in ratingAndReview model) 
        //so based on if we found userId and courseId in ratingAndReview then user already reviwed
          course: courseId,
          user: userId,
       } 
         
          
      )

      if (isAlreadyReviewed) { 
          return res.status(400).json({
              success: false,
              message: "user has already reviwed"
          })
      }


      // create rating
      const ratingAndReview = await RatingAndReview.create({
          rating, review,
          user: userId,
          course: courseId
      })


      // update course 
      const updatedCourse = await Course.findById({ _id: courseId },
          {
              $push: {
                  RatingAndReview: ratingAndReview._id,
              }
          },
          { new: true },
      )
          .populate({ path: "user" })
          .populate({path :  "course"}).exec();


      // return response
      return res.status(200).json({
          success: true,
          message: "User reviewed successfully",
          updatedCourse,
      })

  } catch (error) {
      
      console.log(error.message);

      return res.status(500).json({
          success: false,
          message: error.message
      })
  }
};



//getAverageRating
exports.getAverageRating = async (req, res) => {
    
    try {

       

        // fetch courseId
        const { courseId } = req.body;
        

        //get average rating
        const result = await RatingAndReview.aggregate([
            {
                // match the courseId with course(ratingAndReview's ) or find course with this userId
                $match: { 
                    course : new mongoose.Types.ObjectId(courseId)
                }
            },
            {
                $group: {
                    _id: null, // by this we can group all the data 
                    averageRating: {$avg : "$rating"} // by this we get the average ratingfrom gruoped data
                }
            }
        ]
        )


        if (result.length < 0) {
            return result.status(200).json({
                success: true,
                message: "No review found for this course",
            })
        }
        else {
            console.log('result', result)
        }


        // return response
        return res.status(200).json({
            success: true,
            message: "Average rating got successfully",
            averageRating: result[0].averageRating,
        })
            
        
    } catch (error) {

        console.log(error.message);

        return res.status(500).json({
            success: false,
            message: "Error getting average rating",
            error: error.message
        })
        
    }
}


// get all reatings and reviews
exports.getAllRatings = async (req, res) => {
    
    try {

        const allratings = await RatingAndReview.find({})
            .populate({
                path: "user",
                select: "firstName lastName email image"
            })
            .populate({
                path: "course",
                select : "courseName"
            })
        
        console.log('all ratings', allratings)

        return res.status(200).json({
            success: true,
            message: "All ratings are fetched successfully",
            data: allratings,
        })

        
    } catch (error) {
        console.log(error.message);

        return res.status(500).json({
            success: false,
            message: "Error getting all rating",
            error: error.message,
        })
        
    }
}


// get ratings for specific course

exports.getRatingsForSpecificCourse = async (req, res) => {
    
    try {

        // get course ID
        const { courseId } = req.body;

        // find ratings for that courseID
        const courseRating = await RatingAndReview.findById({ course: courseId })
            .populate({
                path: "course",
                selsect: "courseName"
            })
            .populate({
                path: "user",
                select : "firstName lastName email image",
            })
        
        
        // validate
        if (!courseRating) {
            return res.status(404).json({
                success: false,
                message: "course reating not found"
         })
     }
        
        
        return res.status(200).json({
            success: true,
            message: "Ratings for specified course fetched successfully"
        })


    } catch (error) {
        console.log(error.message);

        return res.status(500).json({
            success: false,
            message: "Error while fetching ratings for specified course",
            error: error.message
        })
        
    }
}