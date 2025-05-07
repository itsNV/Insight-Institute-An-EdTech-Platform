const Category = require('../models/Category');
const Course = require('../models/Course');
const mongoose = require('mongoose');

// create Category
exports.createCategory = async (req, res) => {
    
    try {

        //fetch data
        const { categoryName, description } = req.body;

        // validate
        if (!categoryName || !description) { 
            return res.status(400).json({
                success: false,
                message: "Fill all required fields"
            })
        }

        // make entry in database
        const CategoryEntry = await Category.create({ categoryName, description })
        
        res.status(200).json({
            success: true,
            message: "Category created successfully",
            CategoryEntry : CategoryEntry
        })
        
    } catch (error) {

        console.log(error);
        return res.status(400).json({
            success: false,
            message: "Error creating Category"
        })
        
    }
}




// get all Categories
exports.getAllCategories = async (req, res) => { 

    try {

        const allCategorys = await Category.find({});

        return res.status(200).json({
            success: true,
            message: "all Categorys are retrieved",
            allCategorys : allCategorys,
        })
        
    } catch (error) {

        console.log(error)
        return res.status(400).json({
            success: false,
            message: "Error getting all Categorys"
        })
        
    }
}


// category page details
exports.categoryPageDetails = async (req, res) => {
    
    try {

        //get category Id
        const {categoryId}  = req.query;
       
        console.log('category Id: ' , categoryId)

        // get courses for specified category Id
        const selectedCategory = await Category.findById(categoryId)
            .populate(
                {
                    path: 'course',
                    populate: {
                        path : 'instructor'
                    }
                }
        )
            .sort({CreatedAt : 1})
            .exec();
        
        if (!selectedCategory) {
            return res.status(404).json({
                success: false,
                message: "selected category not found",
            })
        }

        console.log('selectedCategory',selectedCategory)

        // issue here
        const ObjcategoryId = new mongoose.Types.ObjectId(categoryId);
        // console.log('ObjcategoryId: ' , ObjcategoryId)

        // get all differrent courses
        const differentCourses = await Category.find({
            _id: { $ne: ObjcategoryId }  // exclude the current category from the list of different courses
        }).populate({
            path: 'course',
            populate: {
                path : 'instructor'
            },
            populate: {
                path: 'category'
            }
        }).exec();
        
        console.log('different courses',differentCourses)

        // console.log('-------------before top 10course-----------')
        // get top 10 sold courses
        const top10Courses = await Course.find({}).populate('instructor').sort({enrolledStudents : -1}).limit(10).exec();


        // console.log('-------------after top 10course-----------')
        console.log('top10Courses', top10Courses)

        return res.status(200).json({
            success: true,
            message: "Category page details fetch successfully",
            selectedCategory: selectedCategory,
            differentCourses: differentCourses,
            top10Courses: top10Courses,
        })
        
    } catch (error) {

        console.log(error.message);

        return res.status(500).json({
            success: false,
            message: "Error fetching category page details",
            error : error.message
        })
        
    }
}