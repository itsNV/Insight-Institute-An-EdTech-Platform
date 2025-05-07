import toast from "react-hot-toast";
import { apiConnector } from "../apiConnector"
import { CONTACT_API } from "../apis";

const {CONTACT_US_API} = CONTACT_API


export function contactUs(formData) {
    return async (dispatch) => {
        const toastId = toast.loading('Loading...')
        try {
            console.log('inside contact us api call')
            const result = await apiConnector("POST", CONTACT_US_API, formData)

            toast.dismiss()
            
            console.log('printing contactus result', result);

            if (!result.data.success) {
                 throw new Error("Error sending response of contact us......")
            }

            toast.success("Response sent successfully.....");

        } catch (error) {
            return (
                console.log('error', error),
            toast.error(error.response.data.message)
            
           )
        }

        toast.dismiss(toastId);
    }
}