
const express = require('express');
const router = express.Router();


// ----------------- profile controller --------------------------------
const { updateProfile,
    getAllUserDetails,
    deleteAccount,
    changePassword,
    changePicture
} = require('../controller/Profile');

// ----------------- middleware --------------------------------
const {auth } = require('../middlewares/auth')

// routes
// 2 left
router.get('/getAllUserDetails', auth, getAllUserDetails);
router.delete('/deleteAccount', auth, deleteAccount);
router.put('/updateProfile', auth, updateProfile);
router.put('/updatePassword', auth, changePassword);
router.put('/updatePicture', auth, changePicture);


module.exports = router;