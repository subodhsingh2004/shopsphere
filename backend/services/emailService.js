// import nodemailer from "nodemailer";
// import dotenv from "dotenv";

// dotenv.config();

// const htmlContent = `
// <!DOCTYPE html>
// <html lang="en">
// <head>
//     <meta charset="UTF-8">
//     <meta name="viewport" content="width=device-width, initial-scale=1.0">
//     <title>ShopSphere</title>
//     <style>
//         body {
//             margin: 0;
//             padding: 20;
//             font-family: 'Poppins', sans-serif;
//             background-color: #141414;
//             display: flex;
//             justify-content: center;
//             align-items: center;
//             height: 100vh;
//         }
//         .container {
//             background-color: #141414;
//             box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
//             border: 1px solid #333;
//             height: auto;
//             width: 500px;
//             border-radius: 20px;
//             padding: 20px;
//             color: #D1D1D1;
//             display: flex;
//             flex-direction: column;
//             justify-content: space-between;
//             align-items: center;
//             margin-top: 20px;
//         }
//         h1 {
//             font-family: 'Cookie', cursive;
//             font-size: 40px;
//             line-height: 1;
//             color: #3772ff;
//         }
//         h1 span {
//             color: #f8d525;
//         }
//         .message {
//             text-align: left;
//         }
//         p {
//             font-size: 0.875rem;
//             margin-top: 10px;
//         }
//         .otp {
//             background-color: #3772ff;
//             width: 100%;
//             text-align: center;
//             padding: 10px;
//             border-radius: 8px;
//             margin-top: 20px;
//         }
//         .otp span {
//             font-size: 18px;
//             font-weight: bold;
//             color: white;
//             letter-spacing: 1px;
//         }
//         .footer {
//             text-align: left;
//             margin-top: 20px;
//             font-size: 0.875rem;
//         }
//         .footer span {
//             font-weight: bold;
//             color: #ffd400;
//         }
//     </style>
// </head>
// <body>

//     <div class="container">
//         <h1>Shop<span>Sphere</span></h1>

//         <div class="message">
//             <p>Thank you for choosing Shopsphere! We’re excited to have you join our community. To complete your signup process, please enter the One-Time Password (OTP) below:</p>

//             <div class="otp">
//                 <span>{{OTP_CODE}}</span>
//             </div>

//             <p>This code is valid for the next 10 minutes. If you didn’t request this, please ignore this email.</p>

//             <p class="footer">Best regards, <br />
//                 <span>The Shopsphere Team</span>
//             </p>
//         </div>
//     </div>

// </body>
// </html>

// `

// const transporter = nodemailer.createTransport({
//     service: process.env.EMAIL_SERVICE,
//     port: 465,
//     secure: true,
//     auth: {
//         user: `${process.env.EMAIL}`,
//         pass: `${process.env.EMAILPASS}`
//     }
// });

// export const sendOTPEmail = async (username, otp, email) => {
    
//     const mailOptions = {
//         from: `${process.env.EMAIL}`, // sender address
//         to: email, // recipient address
//         subject: 'Your OTP Code for Secure Access to ShopSphere',
//         html: htmlContent.replace('{{OTP_CODE}}', otp),
// //         text: `Dear ${username},

// // We’ve received a request to verify your account on ShopSphere. To ensure your security, please use the following (OTP) to complete the process:

// // Your OTP is: ${otp}

// // This code is valid for the next 10 minutes. Please enter it on the website to continue your activity.

// // If you did not request this, please ignore this email, and your account will remain secure.

// // Best regards,
// // The ShopSphere Team`
//     };

//     try {
//         const info = await transporter.sendMail(mailOptions);
//         if(info) return info
//     } catch (error) {
//         throw error
//     }
// }