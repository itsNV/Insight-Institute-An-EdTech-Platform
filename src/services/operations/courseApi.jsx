import toast from "react-hot-toast";
import { apiConnector } from "../apiConnector";
import { COURSE_APIS } from "../apis";
import { setCourse, setStep,setInstructoreCourses, setIsSaved } from "../../slices/course";


const {
    GET_ALL_CATEGORIES,
    CREATE_COURSE_API,
    EDIT_COURSE_API,
    DELETE_COURSE_API,
    UPDATE_SECTION_API,
    CREATE_SECTION_API,
    DELETE_SECTION_API,
    CREATE_SUBSECTION_API,
    UPDATE_SUBSECTION_API,
    DELETE_SUBSECTION_API,
    GET_INSTRUCTORE_COURSES_API,
    GET_FULL_COURSE_DETAILS
} = COURSE_APIS


// get all categories
export function getAllCategories() {
    return async () => {
    
        let result = []

        try {
            
            
            const response = await apiConnector("GET", GET_ALL_CATEGORIES)
            
            if (!response.data.success) {
                return toast.error(response.data.message)
            }

            // console.log('result of category', response)
            result = response.data.allCategorys
            
            
            
        } catch (error) {
            // console.log(error.response.data.message)
            console.log('error occurred',error)
        }

        console.log('printing result ', result)
        return result

    }
}



// create course
export function createCourse(formData, token) {
    return async (dispatch) => {
        let result = []
        console.log('inside api call')
        const toastId = toast.loading("Loading.......")
        
        try {

           

            const response = await apiConnector("POST", CREATE_COURSE_API, formData, {
                "Content-Type": "multipart/form-data",
                Authorization: "Bearer " + `${token}`
            })

            toast.dismiss(toastId)
       
        
         
            
            console.log('printing results', response)

            if (!response.data.success) {
                throw new Error("Couldn't crate a course")
            }

            
            
            result = response.data.newCourse
            dispatch(setCourse(result))
            localStorage.setItem('course', JSON.stringify(result))
            dispatch(setStep(2))
            dispatch(setIsSaved(true));
            toast.success("Course details added successfully")
            
        } catch (e) { 
            console.log("Error: ", e)
            toast.error(e.response.data.message)
        }

        

        
    }
}


// edit course
export function editCourseDetails(formData, token) { 

    return async (dispatch) => {

        const toastId = toast.loading('Loading....');
        try {

            const response = await apiConnector("PUT", EDIT_COURSE_API, formData, {
                Authorization: "Bearer " + `${token}`
            })

            toast.dismiss(toastId);

            console.log('edit course reaponse', response);

            if (!response.data.success) {
                throw new Error("Can't edit the course")
            }

            const result = response.data.updatedCourse;
            dispatch(setCourse(result));
            localStorage.setItem('course', JSON.stringify(result));
            dispatch(setStep(2));
            dispatch(setIsSaved(true));
            
            toast.success("Course details updated successfully");
            
        } catch (error) {

            console.log('error while calling api for edit course', error);
            toast.error(error.response.data.message);

            
        }
    }
}



//delete course
export function deleteCourse(courseId, token) { 
    return async (dispatch) => {
        
        const toastId = toast.loading('Loading....');
        try {

            const response = await apiConnector("DELETE", DELETE_COURSE_API, {courseId}, {
                Authorization: "Bearer " + `${token}`
            })

            toast.dismiss(toastId)

            console.log('delete course response:', response);

            const result = response.data.instructoreCourses;
            console.log('instructore result', result);
            dispatch(setInstructoreCourses(result))
            localStorage.setItem('instructoreCourses', JSON.stringify(result));
            
            toast.success("Course deleted successfully");
            
        } catch (error) {
            console.log('delete course error', error);
            toast.error(error.response.data.message)
        }
    }
}


// edit course =--> add setIsSaved(true)

// update section 
export function updateSection(data,token) {
    return async (dispatch) => {
        
        let result = []
        const toastId = toast.loading("Loading.......")
        try {
            
            const response = await apiConnector("PUT", UPDATE_SECTION_API, data,
                {
                    Authorization: "Bearer " +`${token}`
                }
            )

            toast.dismiss(toastId)

            console.log('printing response', response)
            
            if (!response.data.success) {
                throw new Error("Can't update the section ")
            }

            result = response.data.updatedCourse
            dispatch(setCourse(result))
            dispatch(setIsSaved(true));
            toast.success("Section Name updated successfully");

        } catch (error) {
            console.log('error', error);
            toast.error(error.response.data.message)
        }

       
       
    }
}



// create section
export function createSection(data, token) {
    return async (dispatch) => {
        let result = []
        const toastId = toast.loading("Loading.......")
        try {

            const response = await apiConnector("POST", CREATE_SECTION_API, data,
                {
                    Authorization: "Bearer " + `${token}`
                }
            )

            toast.dismiss(toastId)

            console.log('printing response', response)

            if (!response.data.success) {
                throw new Error("Can't create section ")
            }

            result = response.data.updatedCourse;
            dispatch(setCourse(result))
            dispatch(setIsSaved(true));
            
            toast.success("Section created successfully")
            
        } catch (error) {
            console.log('error', error)
            toast.error(error.response.data.message)
        }

       
        
    }
}



//delete section
export function DeleteSection(data, token) {
    return async (dispatch) => {
        let result = []
        const toastId = toast.loading("Loading.......")
        try {

            const response = await apiConnector("DELETE", DELETE_SECTION_API, data, {
               
                Authorization : "Bearer " + `${token}`
            })

            toast.dismiss(toastId)
            

            console.log('printing delete response', response)

            if (!response.data.success) {
                throw new Error("Error deleting the section");
            }


            result = response.data.updatedCourse
            dispatch(setCourse(result))
            toast.success("Section Deleted Successfully");

        } catch (error) {
            console.log('deleting section error', error)
            toast.error(error.response.data.message)
            
        }

        
    }
}

 

// create subsection
export function createSubSection(data, token) {
    return async (dispatch) => {
        
        let result = []
        const toastId = toast.loading("Loading.......")
        try {

            const response = await apiConnector("POST", CREATE_SUBSECTION_API, data, {
                Authorization: "Bearer " + `${token}`
            })

            toast.dismiss(toastId)

            console.log('response of subsec creation', response)
            
            if (!response.data.success) { 
                throw new Error("Error creating Subsection at api call");
            }


            result = response.data.updatedCourse
            console.log('result of subsec creation', result)
            dispatch(setCourse(result))
            toast.success("Subsection created successfully");
            
        } catch (error) {

            console.log('error', error);
            toast.error(error.response.data.message);
            
        }

        
    }
}


// edit subsection
export function editSubSection(data, token) {
    return async (dispatch) => {
        
        let result = []
        const toastId = toast.loading("Loading.......")
        try {

            const response = await apiConnector("PUT", UPDATE_SUBSECTION_API, data, {
                Authorization: "Bearer " + `${token}`
            })

            toast.dismiss(toastId)
            console.log('response of subsec edition', response)
            
            if (!response.data.success) { 
                throw new Error("Error editing Subsection at api call");
            }


            result = response.data.updatedCourse
            dispatch(setCourse(result))
            toast.success("Subsection edited successfully");
            
        } catch (error) {

            console.log('error', error);
            toast.error(error.response.data.message);
            
        }

        
    }
}


//delete subsection 
export function deleteSubSection(subsectionId,sectionId,courseId, token) {
    return async (dispatch) => {
        let result = []
        const toastId = toast.loading("Loading.......")
        try {

            const response = await apiConnector("DELETE", DELETE_SUBSECTION_API, {subsectionId,sectionId,courseId}, {
                Authorization : "Bearer " + `${token}`
            })
            
            toast.dismiss(toastId)

            console.log('printing subsec delete response', response)

            if (!response.data.success) {
                throw new Error("Error deleting the section");
            }


            result = response.data.updatedCourse
            dispatch(setCourse(result))
            toast.success("SubSection Deleted Successfully");

        } catch (error) {
            console.log('deleting Subsection error', error)
            toast.error(error.response.data.message)
            
        }

        
    }
}



// get instructor courses
export function getInstructorCourses(token) {

    return async (dispatch) => {
        
        const toastId = toast.loading("Loading ....")

        try {

            const response = await apiConnector("GET", GET_INSTRUCTORE_COURSES_API,"", {
                Authorization : "Bearer " + `${token}`
            })

            toast.dismiss(toastId)

            console.log('instructor courses response', response)


            if (!response.data.success) { 
                throw new Error("Error fetching instructor courses");
            }


           

            const result = response.data.instructoreCourses
            console.log('instructore result', result);
            dispatch(setInstructoreCourses(result))
            localStorage.setItem('instructoreCourses', JSON.stringify(result))
            toast.success("Instructor courses are successfully fetched");
            
        } catch (error) {

            console.log('error fetching instructore courses', error)
             toast.error(error.response.data.message);
            
        }
    }
}




