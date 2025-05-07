const express = require('express');
const router = express.Router();


// ----------------------- course controller -------------------- one left
const { createCourse,
    getAllCourses,
    getFullCourseDetails,
    instructoreCourses,
    deleteCourse,
    editCourseDetails,
} = require('../controller/Course')



// ----------------------- section controller --------------------
const { createSection,
    updateSection,
    deleteSection
} = require('../controller/Section');
 

// ----------------------- subsection controller --------------------
const { createSubSection,
    updateSubSection,
    deleteSubSection
} = require('../controller/SubSection');


// ----------------------- category controller --------------------
const {
    createCategory,
    getAllCategories,
    categoryPageDetails } = require('../controller/Category');


// ----------------------- Rating and reviews controller --------------------
const { createRating,
    getAllRatings,
    getAverageRating,
    getRatingsForSpecificCourse
} = require('../controller/RatingAndReview')


// ----------------------- middlewares -------------------------------------
const { auth,
    isAdmin,
    isInstructor,
    isStudent
} = require('../middlewares/auth'); 



// ******************************** routes *********************************


// ----------------------- course routes --------------------------------
router.post('/createCourse', auth, isInstructor, createCourse);
router.put('/editCourseDetails', auth, editCourseDetails);
router.delete('/deleteCourse', auth, deleteCourse);
router.get('/getAllCourses', auth, getAllCourses);
router.get('/getFullCourseDetails', auth, getFullCourseDetails);
router.get('/instructoreCourses', auth, instructoreCourses);



// ----------------------- section routes --------------------------------
router.post('/createSection', auth, isInstructor, createSection);
router.put('/updateSection', auth, isInstructor, updateSection);
router.delete('/deleteSection', auth, isInstructor, deleteSection);


// ----------------------- subsection routes --------------------------------
router.post('/createSubSection', auth, isInstructor, createSubSection);
router.put('/updateSubSection', auth, isInstructor, updateSubSection);
router.delete('/deleteSubSection', auth, isInstructor, deleteSubSection);


// --------------------- category routes -----------------------------------
router.post('/createCategory',auth,isAdmin, createCategory);
router.get('/getAllCategories', getAllCategories);
router.get('/categoryPageDetails', categoryPageDetails);


// -------------------- Rating and reviews routes ---------------------------
router.post('/createRating', auth, isStudent, createRating);
router.get('/getAllRatings', getAllRatings);
router.get('/getAverageRating', getAverageRating);
router.get('/getRatingsForSpecificCourse', getRatingsForSpecificCourse);




module.exports = router;