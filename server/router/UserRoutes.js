
const express = require('express');
const router = express.Router();


// ------------------ Auth controller --------------------------------
const { sendOtp, signUp, login } = require('../controller/Auth') // change password left

// ------------------Reset Password controller --------------------------------
const { resetPassword,
    resetToken
 } = require('../controller/ResetPassword');


// routes --------------------------------



// ------------------- Auth routes -------------------------------
router.post('/sendOtp', sendOtp);
router.post('/signUp', signUp);
router.post('/login', login);


// ------------------ reset password routes --------------------------------
router.post('/resetPassword', resetPassword);
router.post('/resetToken', resetToken);



module.exports = router;