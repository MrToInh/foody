// app/controllers/otp.controller.js
const db = require("../../models");
const OTP = db.Otp;
const User = db.user;
const Role = db.role;
const Op = db.Sequelize.Op;
const userCache = require("../../cache/userCache");
const nodemailer = require('nodemailer');
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user:'nguyenthanhtinh667@gmail.com',
    pass:'ffinnsztpuaiwtfu'
  },
  tls: {
    acceptUnauthorized: false
  }
});
// Logic gửi OTP
exports.sendOTP = async (req, res) => {
  try {
    const { email } = req.body;
    const otp = generateOTP(); // Tạo OTP ngẫu nhiên
    const otpExpiration = new Date(Date.now() + 60000); // Thời gian hết hạn sau 1 phút

    // Lưu OTP vào database với thời gian hết hạn
    await OTP.create({ email, otp, expiration: otpExpiration });
    const mailOptions = {
      from: process.env.SMTP_MAIL,  // Replace with your sender's email address
      to: email,                    // Replace with recipient's email address
      subject: "Your OTP for [Your Platform Name]",  // Customize the subject
      html: `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Your OTP from Foody Website</title>
      <style>
        /* Include your custom CSS styles here (optional) */
      </style>
    </head>
    <body>
      <div class="container">
        <header class="header">
        <div class="content">
          <h1>Your One-Time Password (OTP)</h1>
          <p>Dear ${email},</p>
          <p>Here's your OTP to verify your identity on Foody Website:</p>
          <div class="otp-container">
            <p class="otp-label">Your OTP:</p>
            <span class="otp-code">${otp}</span>
            <p class="otp-instructions">Enter this code to verify your identity.</p>
            <p class="otp-validity">This OTP is valid for 1 minutes. Please do not share it with anyone.</p>
          </div>
          <p>If you did not request this OTP, please contact us immediately at nguyenthanhtinh667@gmail.com (if applicable).</p>
        </div>
        <footer class="footer">
          <p>Thanks,<br>The Team at Foody/p>
          <p><a href="Foody">Visit our website</a></p>
        </footer>
      </div>
    </body>
    </html>
    `,
    };
    

    // Gửi OTP qua email
    transporter.sendMail(mailOptions, function(error, info) {
      if(error){
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });
    
  } catch (error) {
    console.error("Error sending OTP:", error);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
};

// Logic xác thực OTP
// Logic xác thực OTP
exports.verifyOTP = async (req, res) => {
  // try {
  //   const { email, otp } = req.body; // Chỉnh sửa: không cần .email ở cuối

  //   // Tìm OTP trong database
  //   const existingOTP = await OTP.findOne({ where: { email, otp, } });

  //   if (existingOTP) {
  //     if (existingOTP.expiration < Date.now()) {
  //       await existingOTP.destroy();
  //     } else {
  //       res.status(400).json({ success: false, error: "Expired OTP" });
  //       await existingOTP.destroy();
  //       await User.destroy({ where: { email } });
  //     }
  //   } else {
  //     // Nếu OTP không hợp lệ
  //     res.status(400).json({ success: false, error: "Invalid OTP" });
  //   }
  // } catch (error) {
  //   console.error("Error verifying OTP:", error);
  //   res.status(500).json({ success: false, error: "Internal server error" });
  // }
  try {
    const { email, otp } = req.body;

    const existingOTP = await OTP.findOne({ where: { email, otp } });

    if (existingOTP) {
      if (existingOTP.expiration < Date.now()) {
        await existingOTP.destroy();
      } else {
        // Lấy thông tin user từ cache
        const userInfo = userCache.getUserInfo(email);

        // Tạo user mới trong DB
        const user = await User.create({
          username: userInfo.username,
          email: userInfo.email,
          password: userInfo.password,
          phone_number: userInfo.phone_number,
        });

        // Kiểm tra và gán quyền cho user
        if (userInfo.roles) {
          const roles = await Role.findAll({
            where: {
              name: {
                [Op.or]: userInfo.roles,
              },
            },
          });
          await user.setRoles(roles);
        } else {
          const defaultRole = await Role.findOne({ where: { name: "user" } });
          await user.setRoles([defaultRole.id]);
        }

        // Xóa thông tin user khỏi cache sau khi lưu vào DB thành công
        userCache.deleteUserInfo(email);

        res.status(200).send({ message: "User created successfully!" });
      }
    } else {
      res.status(400).json({ success: false, error: "Invalid OTP" });
    }
  } catch (error) {
    console.error("Error verifying OTP:", error);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
};


// Hàm tạo OTP ngẫu nhiên
function generateOTP() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}
