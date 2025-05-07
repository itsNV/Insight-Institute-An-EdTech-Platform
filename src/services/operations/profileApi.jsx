import toast from "react-hot-toast"
import { apiConnector } from "../apiConnector"
import { PROFILE_apis } from "../apis"
import { setAdditionalDetails, setLoading, setUser } from "../../slices/profile"


const {
    UPDATE_PROFILE_API,
    UPDATE_PASSWORD_API,
    UPDATE_PICTURE_API
} = PROFILE_apis




// update profile
export function updateProfile(
    formData,token
) {
    return async (dispatch) => {
        
       const toastId = toast.loading('Loading....')
        
        try {

           

            const response = await apiConnector("PUT", UPDATE_PROFILE_API, formData,  {
                Authorization: `Bearer ${token}`
            })

            toast.dismiss(toastId)

            console.log('printing response for update profile', response)

            if (!response.data.success) {
                throw new Error("Can't update the profile")
            }

            const result = response.data.updatedUser

            // dispatch(setAdditionalDetails(result))
            dispatch(setUser(result))
            localStorage.setItem('user', JSON.stringify(result));
            
            toast.success("Profile updated successfully")
            
        } catch (error) {

            return (
                
                toast.error(error.response.data.message),
                console.log(error)
           ) 
            
        }

    

       
        
        
        
    }
}



// change password
export function changePassword(oldPassword, newPassword,token) {
    
    return async (dispatch) => {
         const toastId = toast.loading("Loading....")
        
        try {

            const result = await apiConnector("PUT", UPDATE_PASSWORD_API, {
                oldPassword,newPassword,token
            }, {
                Authorization: `Bearer ${token}`
            })
            
            toast.dismiss(toastId)

            toast.success("Password updated successfully")
            console.log('result',result)
            
        } catch (error) {
            console.log('error', error)
            toast.error(error.response.data.message)
        }
    }
}



//change picture
export function changePicture(formData,token) {
    
    return async (dispatch) => {
        
        const toastId = toast.loading('Loading....')

        try {

            const result = await apiConnector("PUT", UPDATE_PICTURE_API, formData, {
                Authorization: `Bearer ${token}`
            })

            toast.dismiss(toastId)

            if (!result.data.success) { 
                return toast.error(`Error updating picture`);
            }

            console.log('printing picture result', result)
            dispatch(setUser(result.data.updatedUser))
            toast.success(result.data.message)
            
        } catch (error) {
            return (
                console.log('error updating picture', error),
                toast.error(error.response.data.message)
            )
        }
    }
}