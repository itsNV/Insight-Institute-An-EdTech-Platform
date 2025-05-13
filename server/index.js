
const express = require('express');
const app = express();


require('dotenv').config();
const PORT = process.env.PORT || 4000;

// database
const db = require('./config/database');

// cloudinary
const cloudinary = require('./config/cloudinary');


// routes
const CourseRoute = require('./router/CourseRoute');
const UserRoutes = require('./router/UserRoutes');
const ProfileRoute = require('./router/ProfileRoute');
const ContactRoute = require('./router/ContactRoute')
const Payment = require('./router/Payment');

// middleware

app.use(express.json());
const cookieParser = require("cookie-parser")
app.use(cookieParser());
const fileUpload = require('express-fileupload');
app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: '/tmp/'
}));
const cors = require('cors');
const { urlencoded } = require('body-parser');
app.use(cors({
    origin: 'https://insight-institute-an-ed-tech-platform.vercel.app' , // to entertain request from frontend

}));


// mount routes
app.use('/api/v1', CourseRoute);
app.use('/api/v1', UserRoutes);
app.use('/api/v1', ProfileRoute);
app.use('/api/v1', ContactRoute);
app.use('/api/v1', Payment);


// connect database 
db.connect();
// connect cloudinary
cloudinary.CloudinaryConnect();

//start server
app.listen(PORT, () => {
    console.log(`server started at ${PORT}`);
});


// default routes
app.get('/', (req, res) => 
{
    return res.json({
        success: true,
        message: "You have successfully started the server"
    })
})


