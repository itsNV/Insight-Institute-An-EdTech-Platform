
const User = require('../models/User');
const jwt = require('jsonwebtoken');
require('dotenv').config();

// auth
exports.auth = async (req, res, next) => { 

    try {

       
        //fetch token
        let token = req.body.token || req.cookies.token
            || req.header("Authorization").replace('Bearer ', "");
        
        
        // validate
        if (!token) { 
            return res.status(403).json({
                success: false,
                message: 'error fetching token'
            })
        }


        // verify token

        // console.log('token', token)
        try {
            
            let decode = jwt.verify(token, process.env.JWT_SECRET);
            // send data to req
            req.user = decode
            console.log('decode',decode)

        } catch (e) {
            return res.json({
                success: false,
                message: 'error verifying the  token',
                error: e.message
            })
        }

        next();

     
        
    } catch (error) {

        return res.status(401).json({
            success: false,
            message: 'error while authenticating user',
            error:error.message
        })
        
    }
}



//isStudent

exports.isStudent = async (req, res, next) => {

    try {

        if (req.user.accountType !== 'Student') {
            return res.status(400).json({
                success: false,
                message: "This is protected route only for students"
            })
        }
        
        next();

    } catch (error) {
        return res.status(400).json({
            success: false,
            message: 'Can not find user role'
        })
        
    }
}


// isInstructor
exports.isInstructor = async (req, res, next) => { 

    try {

        if (req.user.accountType !== 'Instructor') {
            return res.status(400).json({
                succcess: false,
                message: "This is protected route only for instructor"
            })
        }

        next();
        
    } catch (error) {

        return res.status(401).json({
            success: false,
            message: "Can not find user role"
        })
        
    }
}


// isAdmin

exports.isAdmin = async (req, res, next) => {
    
    try {
        
        if (req.user.accountType !== 'Admin') {
            return res.status(400).json({
                success: false,
                message: "This is protected route only for admin",
            })
        }

        next();

    } catch (error) {
        
        return res.status(401).json({
            success: false,
            message: "Can not find user role",
        })
    }
}