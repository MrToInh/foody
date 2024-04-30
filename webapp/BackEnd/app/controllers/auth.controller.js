const db = require("../models");
const config = require("../config/auth.config");
const User = db.user;
const Role = db.role;
const OTP = require("../controllers/otp.controller");
const Op = db.Sequelize.Op;
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const userCache = require("../cache/userCache");
// Import module để xác thực OTP
exports.signup = async (req, res) => {
  try {
    const { username, email, password, phone_number } = req.body;

    // Tạo user mới
    // const user = await User.create({
    //   username: username,
    //   email: email,
    //   password: bcrypt.hashSync(password, 8),
    //   phone_number: phone_number,
    // });
    // await OTP.sendOTP(req, res);
    // // Kiểm tra và gán quyền cho user
    // if (req.body.roles) {
    //   const roles = await Role.findAll({
    //     where: {
    //       name: {
    //         [Op.or]: req.body.roles,
    //       },
    //     },
    //   });
    //   await user.setRoles(roles);
    // } else {
    //   // Gán quyền mặc định nếu không có quyền được chỉ định
    //   const defaultRole = await Role.findOne({ where: { name: "user" } });
    //   await user.setRoles([defaultRole.id]);
    // }
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

    req.session.token = token;

    return res.status(200).send({
      id: user.id,
      username: user.username,
      email: user.email,
      roles: authorities,
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

exports.editProfile = async (req, res) => {
  try {
    const token = req.session.token;
    if (!token) {
      return res.status(403).send({
        message: "Unauthorized access! Please login first."
      });
    }

    jwt.verify(token, config.secret, async (err, decoded) => {
      if (err) {
        return res.status(401).send({
          message: "Invalid token!"
        });
      } else {
        const userId = decoded.id;
        const user = await User.findByPk(userId);
        if (!user) {
          return res.status(404).send({
            message: "User not found."
          });
        }

        await user.update({
          password: bcrypt.hashSync(req.body.password, 8),
          phone_number: req.body.phone_number
        });

        return res.send({ message: "Profile updated successfully!" });
      }
    });
  } catch (err) {
    return res.status(500).send({
      message: err.message || "Some error occurred while updating the profile."
    });
  }
};
