

import { apiConnector } from "../apiConnector"
import { Auth_apis } from "../apis"
import toast from "react-hot-toast"
import { setUser } from "../../slices/profile";
import { setToken } from "../../slices/Auth";
import { resetCart } from "../../slices/cart";





// destructure api 
const {

    LOGIN_API,
    SENDOTP_API,
    SIGNUP_API,
    RESETPASSWORDTOKEN_API,
    RESETPASSWORD_API
} = Auth_apis;



// login
export function login(email, password,navigate,setLoading) {
    
    return async (dispatch) => {
        
        try {

           dispatch(setLoading(true));
            if (!email || !password) { 
                return toast.error("Please enter required email or password")
            }

            const result = await apiConnector("POST", LOGIN_API, { email, password });

            console.log('printing result', result)

            dispatch(setLoading(false))

            if (!result.data.success) { 
                return toast.error("Error login to your account");
            }

          
            console.log('printing result', result)
            dispatch(setToken(result.data.token));
            localStorage.setItem('token', result.data.token);
            dispatch(setUser(result.data.user))
            localStorage.setItem("user", JSON.stringify(result.data.user));
        
            

            // console.log('logged data,', result.data);
            navigate('/dashboard/my-profile');
            
            dispatch(toast.success("Logged in successfully"));
            
            
        } catch (error) {

            toast.error(error.response.data.message)
            console.log('error while logging in', error);
            
        }
    }
}


// signup
export function signup(
    firstName,
    lastName,
    email,
    accountType,
    password,
    confirmPassword,
    otp,
    navigate
) {
    
    return async (dispatch) => {
        
        try {

            const result = await apiConnector("POST", SIGNUP_API, {
                firstName,
                lastName,
                email,
                accountType,
                password,
                confirmPassword,
                otp
            })


            if (!result.data.success) {
                return toast.error("Error while signing in")
            }

            // push value to local storag
            dispatch(setToken(result.data.token))
            localStorage.setItem("token", JSON.stringify(result.data.token));

            dispatch(setUser(result.data.user))
            localStorage.setItem("user", JSON.stringify(result.data.user))


            toast.success("Account created successfully")
            
            dispatch(navigate('/login'));

            

        } catch (error) {
            console.log('Error while signUp', error)
            toast.error(error.response.data.message)
        }
    }
}


// send otp or otp verification
export function sendOtp(email,navigate) {

    return async (dispatch) => {
        
        try {

            if (!email) { 
                return(
                dispatch(navigate('/signup')),
                toast.error("Please enter all required fields")
                )

            }

            const result = await apiConnector("POST", SENDOTP_API, { email })
            
            if (!result.data.success) {
                return toast.error("error sending otp")
            }

            console.log('printing otp result', result.data)

            toast.success("Otp sent successfully");
            dispatch(navigate('/verify-email'));
            
        } catch (error) {

            console.log('error sending otp', error); 
            toast.error(error.response.data.message);
            dispatch(navigate('/signup'))
            
        }
    }
}



// reset password token
export function resetPasswordToken(email,navigate) {

    return async (dispatch) => {
        try {

            if (!email) {
                return (
                    toast.error("Fill required fields")
                )
            }
            const result = await apiConnector("POST",RESETPASSWORDTOKEN_API, { email })

            // console.log("printong api",Auth_apis.RESETPASSWORDTOKEN_API)
            // console.log('printing result', result);

            if (!result.data.success) {
                return (
                    toast.error("Error sending token"),
                    navigate('/reset-password-token')
                )
            }
    
            dispatch(toast.success("Token sent successfully"))
            dispatch(navigate('/reset-password-token'))
            
        } catch (error) {
            console.log("Error while sending reset token, " + error)
            toast.error(error.response.data.message);
            dispatch(navigate('/reset-password-token'))
            
        }
    }
}



// resetpassword
export function resetPassword(newPassword, confirmPassword,resetPasswordToken,navigate) { 
    return async (dispatch) => {
        
        try {

            const result = await apiConnector("POST", RESETPASSWORD_API, { newPassword, confirmPassword, resetPasswordToken })
            
            if (!result.data.success) {
                return toast.error("Error while creating new password")
            }

            console.log('printing new password', result.data)
            toast.success("Password reset successfully")
            navigate('/login')
            
        } catch (error) {

            console.log('Error while reseting password', error)
            toast.error(error.response.data.message)
            
        }
    }
}
    
  
   
// logout
export function logout(navigate) { 

    return  (dispatch) => {
        
        try {

            console.log('printing in logout,')
            dispatch(setUser(null));
            dispatch(setToken(null));
            dispatch(resetCart());
            localStorage.removeItem('user'); 
            localStorage.removeItem('token');
            

            toast.success("Logout successfully")
            navigate('/')
            
        } catch (error) {

            console.log("error while logging out", error)
            toast.error(error)
            dispatch(navigate('/'))
            
        }
    }

}
