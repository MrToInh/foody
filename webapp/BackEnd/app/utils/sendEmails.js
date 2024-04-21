// // utils/sendEmails.js
// const nodemailer = require("nodemailer");
// const config = require("../config/auth.config");
// const { google } = require('googleapis');
// const sendEmail = async (options) => {
//   // const oAuth2Client = new google.auth.OAuth2(
//   //   config.client_id,
//   //   config.client_secret,
//   //   'https://developers.google.com/oauthplayground'
//   // );
//   // oAuth2Client.setCredentials({
//   //   access_token: config.access_token,
//   // });
//   // try {
//   //   const transporter = nodemailer.createTransport({
//   //     service: 'gmail',
//   //     auth: {
//   //       type: 'OAuth2',
//   //       user: config.user,
//   //       clientId: config.client_id,
//   //       clientSecret: config.client_secret,
//   //       refreshToken: config.refesh_token,
//   //       accessToken: oAuth2Client.getAccessToken(),
//   //     },
//   //   });
    
//     // const mailOptions = {
//     //   from: process.env.SMTP_MAIL,
//     //   to: options.to,
//     //   subject: options.subject,
//     //   html: options.message,
//     // };

//   //   await transporter.sendMail(mailOptions);

//   //   console.log("Email sent successfully!");
//   // } catch (error) {
//   //   console.error("Error sending email:", error);
//   //   throw new Error("Error sending email");
//   // }
//   const transporter = nodemailer.createTransport({
//     service: 'gmail',
//     auth: {
//       user: config.user,
//       pass: config.password,
//     },
//     tls: {
//       rejectUnauthorized: false,
//     },
//   });
//   const mailOptions = {
//     from: process.env.SMTP_MAIL,
//     to: options.to,
//     subject: options.subject,
//     html: options.message,
//   };
// };

// module.exports = sendEmail;
