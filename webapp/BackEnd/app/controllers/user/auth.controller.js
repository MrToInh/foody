const db = require("../../models/index.js");
const config = require("../../config/auth.config.js");
const User = db.user;
const Role = db.role;
const OTP = require("../user/otp.controller.js");
const Op = db.Sequelize.Op;
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const userCache = require("../../cache/userCache.js");
const nodemailer = require('nodemailer');
// Import module để xác thực OTP
exports.signup = async (req, res) => {
  try {
    const { username, email, password, phone_number } = req.body;

    userCache.saveUserInfo(email, {
      username: username,
      email: email,
      password: bcrypt.hashSync(password, 8),
      phone_number: phone_number
      
    });
    await OTP.sendOTP(req, res);
    res.send({ message: "OTP sent successfully! Please enter OTP for verification." });
    
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};


exports.signin = async (req, res) => {
  try {
    const user = await User.findOne({
      where: {
        username: req.body.username,
      },
    });

    if (!user) {
      return res.status(404).send({ message: "User Not found." });
    }

    const passwordIsValid = bcrypt.compareSync(
      req.body.password,
      user.password
    );

    if (!passwordIsValid) {
      return res.status(401).send({
        message: "Invalid Password!",
      });
    }

    const token = jwt.sign({ id: user.id },
                           config.secret,
                           {
                            algorithm: 'HS256',
                            allowInsecureKeySizes: true,
                            expiresIn: 86400, // 24 hours
                           });
              
    let authorities = [];
    const roles = await user.getRoles();
    for (let i = 0; i < roles.length; i++) {
      authorities.push("ROLE_" + roles[i].name.toUpperCase());
    }


    return res.status(200).send({
      id: user.id,
      username: user.username,
      email: user.email,
      roles: authorities,
      accessToken: token
    });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};

exports.signout = async (req, res) => {
  try {
    req.session = null;
    return res.status(200).send({
      message: "You've been signed out!"
    });
  } catch (err) {
    this.next(err);
  }
};

//exports.editProfile = async (req, res) => {
//   try {
//         const userId = decoded.id;
//         const user = await User.findByPk(userId);
//         if (!user) {
//           return res.status(404).send({
//             message: "User not found."
//           });
//         }

//         await user.update({
//           password: bcrypt.hashSync(req.body.password, 8),
//           phone_number: req.body.phone_number
//         });

//         return res.send({ message: "Profile updated successfully!" });
//       }
//      catch (err) {
//     return res.status(500).send({
//       message: err.message || "Some error occurred while updating the profile."
//     });
//   }
// };

exports.editProfile = async (req, res) => {
  try {

  // Tìm driver dựa trên id từ req.userId
  const userId = req.userId;
  const user = await User.findByPk(userId);

  if (!user) {
    return res.status(404).send({ message: "User Not found." });
  }
  const { username, email, phone, fullname } = req.body;

    user.fullname = fullname || user.fullname;
    user.username = username || user.username;
    user.email = email || user.email;
<<<<<<< HEAD
    user.phone_number = phone_number || user.phone_number;
=======
    user.phone_number = phone || user.phone_number;
>>>>>>> tinh
    await user.save();

    res.send({ message: "User updated successfully!" });
  } catch (error) {
    console.error("Error updating user", error);
    res.status(500).send({ message: error.message });
  }
};

<<<<<<< HEAD




=======
>>>>>>> tinh
function generateOTP() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

exports.forgotPassword = async (req, res) => {
  try {
    const { email, newPassword } = req.body;

    if (!newPassword) {
      return res.status(400).send({ message: "New password is required" });
    }

    // Check if user exists
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).send({ message: 'User not found.' });
    }

    // Generate OTP
    const otp = generateOTP();

    // Hash new password and save OTP and new password in cache
    const hashedPassword = bcrypt.hashSync(newPassword, 8);
    userCache.saveUserInfo(email, { otp, newPassword: hashedPassword });

    // Create transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user:'nguyenthanhtinh667@gmail.com',
        pass:'ffinnsztpuaiwtfu'
      }
    });

    // Mail options
    let mailOptions = {
      from: 'your-email@gmail.com',
      to: email,
      subject: 'Password Reset OTP',
      text: `Your OTP for password reset is ${otp}`
    };

    // Send email with OTP
    transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });

    res.send({ message: 'OTP sent successfully! Please check your email.' });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};


exports.verifyOTP = async (req, res) => {
  try {
    const { email, otp } = req.body;

    // Retrieve OTP and new password from cache
    const userInfo = userCache.getUserInfo(email);
    if (!userInfo || userInfo.otp !== otp) {
      return res.status(400).send({ message: 'Invalid OTP.' });
    }

    // Update user's password
    const user = await User.findOne({ where: { email } });
    user.password = userInfo.newPassword;
    await user.save();

    // Clear user info from cache
    userCache.deleteUserInfo(email);

    res.send({ message: 'Password updated successfully!' });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};
exports.getUserProfile = async (req, res) => {
  try{
      const userId = req.userId;
      const user = await User.findByPk(userId);
      if (!user) {
        return res.status(404).send({
          message: "User not found."
        });
      }
      return res.send(user);
  }catch(err){
    return res.status(500).send({
      message: err.message || "Some error occurred while updating the profile."
    });
  }
}
