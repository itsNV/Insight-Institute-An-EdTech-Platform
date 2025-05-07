const { instance } = require("../config/razorpay");
const Course = require("../models/Course");
const User = require("../models/User");
const mongoose = require("mongoose");
const { mailSender } = require("../utils/mailSender");
const crypto = require("crypto");
const {
  paymentSuccessEmail,
} = require("../mail/templates/paymentSuccessEmail");
require("dotenv").config();

// by this we can by multiple or single courses

// 1. initiate the order
exports.capturePayment = async (req, res) => {
  try {
    const courses = req.body;
    const userId = req.user.id;

    // validate
    if (!courses) {
      return res.status(404).json({
        success: false,
        message: "Courses not provided",
      });
    }

    // count the amount for all courses

    let totalAmount = 0;


      //  console.log('courseId',courses.length)
       for (const courseId of courses) {
         console.log("courseId", courseId);
         const course = await Course.findById(courseId);
 
         if (!course) {
           return res.status(404).json({
             success: false,
             message: "Course not found",
           });
         }
 
         // check if user is alreacy enrolled or not
         const uid = new mongoose.Types.ObjectId(`${userId}`);
 
         if (course.enrolledStudents.includes(uid)) {
           return res.status(400).json({
             success: false,
             message: "User already enrolled",
           });
         }
 
         totalAmount = totalAmount + parseInt(course.price);
         
       }
    

      
     
    

    // console.log('BEFORE OPTIONS')
    console.log('totalAmount',totalAmount)

    // initiate the order

    const options = {
      amount: totalAmount * 100,
      currency: "INR",
      receipt: Math.random(Date.now()).toString(),  
    };

    console.log('BEFORE PAYMENT INITIALIZATION')

    const paymentResponse = await instance.orders.create(options);

    console.log('AFTER   PAYMENT INITIALIZATION')
    if (!paymentResponse) {
      return res.status(500).json({
        success: false,
        message: "Failed to create order",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Payment initiated successfully",
      paymentResponse: paymentResponse,
    });
  } catch (e) {

    console.log('e',e)
    return res.status(500).json({
      success: false,
      message: "Error in initiating the payment process", 
      error: e.message,
    });
  }
};

// 2. verify payment
exports.verifyPayment = async (req, res) => {
  try {
    const razorpay_order_id = req.body.razorpay_order_id;
    const razorpay_payment_id = req.body.razorpay_payment_id;
    const razorpay_signature = req.body.razorpay_signature;
    const userId = req.body.userDetails._id;
    const courses = req.body?.courses;

    // validate
    if (
      !razorpay_payment_id ||
      !razorpay_order_id ||
      !razorpay_signature ||
      !courses
    ) {
      return res.status(400).json({
        success: false,
        message: "Missing required parameters",
      });
    }

    //generate signature
    let body = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_SECRET)
      .update(body.toString())
      .digest("hex");

    if (expectedSignature === razorpay_signature) {
      // enrolled student in the course
      await enrolledStudent(courses, userId, res);

      return res.status(200).json({
        success: true,
        message: "Payment verified successfully",
      });
    }

    return res.status(400).json({
      success: false,
      message: "Payment signature mismatch",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error in verifying the payment process",
      error: error.message,
    });
  }
};

// function for enrolling student

const enrolledStudent = async (courses, userId, res) => {
  if (!courses || !userId) {
    return res.status(400).json({
      success: false,
      message: "Missing required parameters",
    });
  }

  for (const courseId of courses) {
    try {
      if (!courseId) {
        return res.status(400).json({
          success: false,
          message: "Course id not provided",
        });
      }

      console.log("courseID : ", courseId);
      // enrolled student in the course
      const enrollStudent = await Course.findByIdAndUpdate(
        { _id: courseId },
        {
          $push: {
            enrolledStudents: userId,
          },
        },
        {
          new: true,
        }
      );

      // validate
      if (!enrollStudent) {
        return res.status(404).json({
          success: false,
          message: "Course not found",
        });
      }

      // update course in to user
      const enrollCourse = await User.findByIdAndUpdate(
        userId,
        {
          $push: {
            course: courseId,
          },
        },
        {
          new: true,
        }
      )
        .populate({  
          path: "course",
          populate: {
            path: "instructor",
          },
          populate: {
            path: "CourseContent",
            populate: {
              path: "subsection",
            },
          },
        })
        .exec();

      // validate
      if (!enrollCourse) {
        return res.status(404).json({
          success: false,
          message: "User not found",
        });
      }

      return res.status(200).json({
        success: true,
        message: "enrolled success",
        enrollCourse,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Error in enrolling student",
        error: error.message,
      });
    }
  }
};

// sent success email
exports.sendSuccessEmail = async (req, res) => {
  try {
    const { paymentId, orderId, amount } = req.body;

    const userId = req.user.id;

    //validate
    if (!paymentId || !orderId || !amount) {
      return res.status(400).json({
        success: false,
        message: "Missing required parameters",
      });
    }

    const enrolledStudent = await User.findById(userId);

    await mailSender(
      enrolledStudent.email,
      ` Payment accepted successfully `,
      paymentSuccessEmail(
        `${enrolledStudent.firstName} ${enrolledStudent.lastName}`,
        amount / 100,
        orderId,
        paymentId
      )
    );

    return res.status(200).json({
      success: true,
      message: "Payment success email sent successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error in sending payment success email",
      error: error.message,
    });
  }
};

// this works only if there was a single course to buy

// // capture payment or initiate order
// exports.capturePayment = async (req, res) => {

//     try {

//         //get data
//         const { courseId } = req.body;
//         const userId = req.user.id;

//         //validate
//         //validate user id

//         if (!userId) {
//             return res.status(404).json({
//                 success: false,
//                 message:"user data not found",
//             })
//         }

//         // validate course id
//         let courseDetails;
//         try {

//             courseDetails = await Course.findById({ _id: courseId });

//             if (!courseDetails) {
//                 return res.status(404).json({
//                     success: false,
//                     message:"course data not found",
//                 })
//             }

//             // check if already enrolled
//             const uid = mongoose.Types.ObjectId(userId);

//             if (courseDetails.enrolledStudents.includes(uid)) {
//                 return res.json({
//                     success: false,
//                     message: "User already enrolled"
//                 })
//             }

//         } catch (error) {

//             return res.status(500).json({
//                 success: false,
//                 message: "Error while checking if user enrolled or not"
//             })

//         }

//         //initiate order or create order

//         const amount = courseDetails.price;
//         const currency = "INR";

//         const option = {
//             amount: amount * 100,
//             currency,
//             receipt: Math.random(Date.now()).toString(),
//             notes: {
//                 courseId :courseId,
//                 userId :userId,
//             }
//         }

//         try {
//             const paymentDetails = instance.orders.create(option)

//             console.log(paymentDetails);

//             return res.status(200).json({
//                 success: true,
//                 message: "Razorpay order has been created successfully",
//                 course: courseDetails.courseName,
//                 courseDescription: courseDetails.courseDescription,
//                 currency,
//                 amount,
//                 orderId : paymentDetails._id,

//             })

//         } catch (error) {
//             return res.status(500).json({
//                 success: false,
//                 message: "Error creating order for razorpay",
//                 error: error.message,
//             })

//         }

//     } catch (error) {

//         return res.status(500).json({
//             success: false,
//             error: error.message,
//         })

//     }
// }

// // verify signature
// exports.verifySignature = async (req, res) => {

//     const webhookSecret = '12345678';

//     const signature = req.header['x-razorpay-signature'];

//     // convert webhhok into the encrypted form to compare with the signature

//     let shasum = crypto.createHmac('sha256', webhookSecret);

//     shasum.update(JSON.stringify(req.body));

//     const digest = shasum.digest('hex');

//     // compare digest and signature
//     if (digest === signature) {

//         // when secret matches then we have to perform some action
//         // like enrolled student in course and add course in user
//         // get userId and courseId
//         // this req is sent by razor pay so we have to fetch ids like following:

//         const { userId, courseId } = req.body.payment.payload.entity.notes;

//         try {

//             // fullfill action

//             //enrolled student in course
//             const enrolledCourse = await Course.findByIdAndUpdate({ courseId },
//                 {
//                     $push: {
//                         enrolledStudents: userId,
//                     }
//                 },
//                 {new:true},
//             )

//             if (!enrolledCourse) {
//                 return res.status(404).json({
//                     success: false,
//                     message: 'Course not found',
//                 })
//             }

//             // add course in user schema
//             const enrolledStudent = await User.findByIdAndUpdate({ userId },
//                 {
//                     $push: {
//                         course : courseId,
//                     }
//                 },
//                 {new:true},
//             )

//             if (!enrolledStudent) {
//                 return res.status(404).json({
//                     success: false,
//                     message: "User not found",
//                 })
//             }

//             // send mail
//             const emailResponse = await mailSender(enrolledStudent.email,
//                                                     "Congatulations, ",
//                                                      "You have successfully enrolled in the course"
//             )

//             res.status(200).json({
//                 success: true,
//                 message: "Student enrolled successfully",
//                 emailResponse,
//             })

//         } catch (error) {
//             return res.status(500).json({
//                 success: false,
//                 message:"Error while authorizing the payment"
//             })

//         }
//     }
// }
