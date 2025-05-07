
const BASE_URL = process.env.REACT_APP_BASE_URL

export const categories = {

    CATEGORY_API : BASE_URL + '/getAllCategories'
}


// auth apis
export const Auth_apis = {

    LOGIN_API: BASE_URL + '/login',
    SENDOTP_API: BASE_URL + '/sendOtp',
    SIGNUP_API: BASE_URL + '/signup',
    RESETPASSWORDTOKEN_API: BASE_URL + '/resetToken',
    RESETPASSWORD_API : BASE_URL + '/resetPassword',
}


// contact us api
export const CONTACT_API = {
    CONTACT_US_API : BASE_URL + '/contactUs',
}


// update profile

export const PROFILE_apis = {
    UPDATE_PROFILE_API: BASE_URL + '/updateProfile',
    UPDATE_PASSWORD_API: BASE_URL + '/updatePassword',
    UPDATE_PICTURE_API: BASE_URL + '/updatePicture',
}


// course api
export const COURSE_APIS = {
    GET_ALL_CATEGORIES: BASE_URL + '/getAllCategories',
    CREATE_COURSE_API: BASE_URL + '/createCourse',
    EDIT_COURSE_API: BASE_URL + '/editCourseDetails',
    DELETE_COURSE_API: BASE_URL + '/deleteCourse',
    GET_FULL_COURSE_DETAILS : BASE_URL + '/getFullCourseDetails',
    UPDATE_SECTION_API: BASE_URL + '/updateSection',
    CREATE_SECTION_API: BASE_URL + '/createSection',
    DELETE_SECTION_API: BASE_URL + '/deleteSection',
    CREATE_SUBSECTION_API: BASE_URL + '/createSubSection',
    UPDATE_SUBSECTION_API: BASE_URL + '/updateSubSection',
    DELETE_SUBSECTION_API: BASE_URL + '/deleteSubSection',
    GET_INSTRUCTORE_COURSES_API: BASE_URL + '/instructoreCourses',
}



//category api
export const CATEGORY_API = {
    CATEGORY_PAGE_DETAILS: BASE_URL + '/categoryPageDetails'
}


// payment api
export const PAYMENT_API = {
    CAPTURE_PAYMENT_API: BASE_URL + '/capturePayment',
    VERIFY_PAYMENT_API: BASE_URL + '/verifyPayment',
    SEND_SUCCESS_ENROLL_EMAIL_API: BASE_URL + '/sendSuccessEmail'
}