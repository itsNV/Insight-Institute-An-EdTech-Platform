import toast from "react-hot-toast"
import { CATEGORY_API } from "../apis";
import { apiConnector } from "../apiConnector";


const {
    CATEGORY_PAGE_DETAILS_API
} = CATEGORY_API

//  export function categoryPageDetails(categoryId) {
//     return async (dispatch) => {
        
//         const toastId = toast.loading('Loading....');

//         try {

//             const response = await apiConnector("GET", CATEGORY_PAGE_DETAILS_API, categoryId)
            
//             console.log('CATEGORY PAGE DETAILS RESPONSE', response)

//             if (!response.data.success) {
//                 throw new Error("Error fetching category details")
//             }

            
            
//         } catch (error) {

//             console.log('ERROR WHILR FETCHING CSTRGORY PAGE DETAILS', error)
//             toast.error(error.response.data.error);
//         }

//         toast.dismiss(toastId);
//     }
//  }