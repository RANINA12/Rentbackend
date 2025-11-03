const nodemailer = require('nodemailer');
// [CHANGE] Naye template system ko yahan import kiya gaya hai
const { masterTemplate } = require('./emailTemplates'); 

const sendEmail = async (options) => {
    const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS,
        },
    });

    // [CHANGE] Ab hum raw HTML (options.message) ki jagah,
    // options.templateData se naya HTML generate karenge.
    const htmlMessage = masterTemplate(options.templateData);

    const mailOptions = {
        from: `${process.env.FROM_NAME} <${process.env.FROM_EMAIL}>`,
        to: options.email,
        subject: options.subject,
        html: htmlMessage, // Yahan naya generated HTML use hoga
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log('Email sent successfully using template!');
    } catch (error) {
        console.error('Error sending email:', error);
    }
};

module.exports = sendEmail;


