// app/controllers/otp.controller.js
const db = require("../models");
const OTP = db.otp;
const User = db.user;
const sendEmail = require("../utils/sendEmails");
const config = require("../config/auth.config");
const Role = db.role;
const Op = db.Sequelize.Op;
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const userCache = require("../cache/userCache");
// Logic gửi OTP
exports.sendOTP = async (req, res) => {
  try {
    const { email } = req.body;
    const otp = generateOTP(); // Tạo OTP ngẫu nhiên
    const otpExpiration = new Date(Date.now() + 1000000); // Thời gian hết hạn sau 1 phút

    // Lưu OTP vào database với thời gian hết hạn
    await OTP.create({ email, otp, expiration: otpExpiration });

    // Gửi OTP qua email
    await sendEmail({
      to: email,
      subject: "Your OTP",
      message: `Your OTP is: ${otp}`
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

        res.send({ message: "User created successfully!" });
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
