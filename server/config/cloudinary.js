
const cloudinary = require('cloudinary');
require('dotenv').config();

exports.CloudinaryConnect = async () => {
    
    try {
        cloudinary.config({
            cloud_name: process.env.Cloud_name,
            api_key: process.env.API_KEY,
            api_secret: process.env.API_SECRET
            
        })

        
        
    } catch (error) {

        console.log("Error connecting to cloudinary", error);
        
    }
  
}