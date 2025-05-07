

const nodemailer = require('nodemailer');
require('dotenv').config();


exports.mailSender = async (email, title, body) => {
    
    let transporter = nodemailer.createTransport({
        
        sendMail : true,
        service: 'gmail',
        host: process.env.MAIL_HOST,
        auth: {
            user: process.env.MAIL_USER,
            pass: process.env.MAIL_PASSWORD
        }
    })


    let info = transporter.sendMail({
        from: 'Insight-Institute',
        to: `${email}`,
        subject: `${title}`,
        html: `${body}`
    })

   
}