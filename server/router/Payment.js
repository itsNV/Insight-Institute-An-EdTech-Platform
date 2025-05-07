
const express = require('express');
const router = express.Router();


// ----------------- payment controller --------------------------------
const {
    capturePayment,
    verifyPayment,
    sendSuccessEmail
} = require('../controller/Payment');


// ----------------- middleware --------------------------------
const {auth,isStudent} = require('../middlewares/auth')

//routes



// -------------------------------- payment routes --------------------------------
router.post('/capturePayment',auth,isStudent, capturePayment);
router.post('/verifyPayment',  verifyPayment);
router.post('/sendSuccessEmail', auth, sendSuccessEmail);


module.exports = router;



