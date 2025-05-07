const { contactUsEmail } = require("../mail/templates/contactFormRes");
const { mailSender } = require("../utils/mailSender");


exports.contactUs = async (req, res) => {

    try {

        const { email, firstName, lastName, message, phNo, countryCode } = req.body;

        console.log('req.body', req.body);
    
        const emailres = await mailSender(email, " Your Response sent successfully",
            contactUsEmail(email,firstName,lastName,message,phNo,countryCode)
        )
    
        console.log('email res', emailres);
    
        return res.json({
            success: true,
            message: "Response sent successfully"
        }) 
        
    } catch (error) {
        console.log('error while sending response of contactUs', error);
        return res.status(500).json({
            success: false,
            message: error.message,
            error: "Error while sendign contactUs response"
        }) 
          
    }
    
   
}