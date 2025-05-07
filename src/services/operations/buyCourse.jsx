import toast from "react-hot-toast";
import { PAYMENT_API } from "../apis";
import rzpLogo from '../../assets/Images/my-logo-updated.png'
import { resetCart } from "../../slices/cart";
import { apiConnector } from "../apiConnector";
import { setUser } from "../../slices/profile";




const {

    CAPTURE_PAYMENT_API,
    VERIFY_PAYMENT_API,
    SEND_SUCCESS_ENROLL_EMAIL_API


} = PAYMENT_API


function loadScript(src) {

    return new Promise((resolve) => {
        
        const script = document.createElement('script');
        script.src = src;

        script.onload = () => {
            resolve(true);
        }

        script.onerror = () => {
            resolve(false);
        }


        document.body.appendChild(script);
    })
}

export async function buyCourse(token,courses,userDetails,navigate,dispatch) {

    const toastId = toast.loading('Loading.......')
    try {

        const res = loadScript('https://checkout.razorpay.com/v1/checkout.js');

        if (!res) {
            return res.status(400).json({
                success: false,
                message: "Failed to load Razorpay script",
            })
        }

        // create or initiate the order
        const orderResponse = await apiConnector('POST', CAPTURE_PAYMENT_API, courses,
            {
                Authorization : 'Bearer ' + `${token}`
            }
            
        )

        console.log('PRINTING OREDER RESPONSE ', orderResponse)

        if (!orderResponse.data.success) {
            
            throw new Error('Failed to create order AT SERVICES')
        }


        //verify payment
        // we need orderId and paymentId to verify order, above line is for that

        const options = {
            
            key: process.env.REACT_APP_RAZORPAY_KEY,
            currency: orderResponse.data.message.currency,
            amout : `${orderResponse.data.paymentResponse.amount}`,
            order_Id: orderResponse.data.paymentResponse.id,
            name: 'Insite-Institute',
            description: "Thanks for purchasing the course",
            image: rzpLogo,
            prefill: {
                name: `${userDetails.firstName} ${userDetails.lastName}`,
                email : userDetails.email
            },
            handler: function (response) {
                
                // send successfull email
                sendSuccessEmail(response, orderResponse.data.paymentResponse.amount, token)
                
                //verify payment
                verifyPayment({...response,courses,userDetails}, navigate, dispatch)


            }
        }

        
        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
        paymentObject.on('payment.failed', function (response) {
            toast.error("Payment Failed. Please try again.");
            console.error(response.error);
        })

   
    } catch (error) {

        console.log('ERROR WHILE BUYING COURSE', error);
        toast.error(error.response.data.message); 
        
    }

    toast.dismiss(toastId);
    
}


async function sendSuccessEmail(response, amount, token) {

    const toastId = toast.loading("Loading...");

    try {

        const result = await apiConnector('POST', SEND_SUCCESS_ENROLL_EMAIL_API, {
            orderId: response.razorpay_order_id,
            paymentId: response.razorpay_payment_id,
            amount,
            
        },
            {
            Authorization: 'Bearer ' + `${token}`
            })
        
        
        console.log('PRINTNG PAYMENT SUCCESS EMAIL', result);

        if (!result.data.success) {
            throw new Error('Failed to send payment success email AT SERVICES')
        }


        toast.success("Check your Mail");


        
    } catch (error) {
        console.log('ERROR WHILE SENDING EMAIL', error);
    }

    toast.dismiss(toastId);
    
}


async function verifyPayment(bodyData, navigate, dispatch) {
    
    const toastId = toast.loading("Loading...");

    try {

        const result = await apiConnector("POST", VERIFY_PAYMENT_API, bodyData)
        

        console.log('PRINTING PAYMENT VERIFICATION RESPONSE', result);

        if (!result.data.success) {
            throw new Error('Failed to verify payment AT SERVICES')
        }     

        console.log('modifieded result',result.data.enrollCourse)
        localStorage.setItem('user', JSON.stringify(result.data.enrollCourse))
        dispatch(setUser(result.data.enrollCourse))
        toast.success("Payment Successful");
        navigate('/dashboard/enrolled-courses')
        dispatch(resetCart());
        
    } catch (error) {
        console.log('ERROR WHILE VERIFYING PAYMENT', error);
        toast.error('Payment verification Failed at SERIVICES');
        
    }

    toast.dismiss(toastId)

}