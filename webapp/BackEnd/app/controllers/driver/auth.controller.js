const db = require("../../models/index.js");
const OTP = require("../user/otp.controller.js");
const config = require("../../config/auth.config.js");
const drivers = db.drivers;
const Op = db.Sequelize.Op;
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const userCache = require("../../cache/userCache.js");
const { fcm_v1 } = require("googleapis");
// Import module để xác thực OTP
exports.signup = async (req, res) => {
  try {
    const { username, email, password,fcm_token, phone_number, licenseNumber, vehicleType, experience } = req.body;

    userCache.saveUserInfo(email, {
      username: username,
      email: email,
      password: bcrypt.hashSync(password, 8),
      fcm_token: fcm_token,
      phone_number: phone_number,
    });

    await OTP.sendOTP(req, res);
    res.send({ message: "OTP sent successfully! Please enter OTP for verification." });
    
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

exports.signin = async (req, res) => {
  try {
    const driver = await drivers.findOne({
      where: {
        username: req.body.username,
      },
    });

    if (!driver) {
      return res.status(404).send({ message: "Driver Not found." });
    }

    const passwordIsValid = bcrypt.compareSync(
      req.body.password,
      driver.password
    );

    if (!passwordIsValid) {
      return res.status(401).send({
        message: "Invalid Password!",
      });
    }

    const token = jwt.sign({ id: driver.id },
                           config.secret,
                           {
                            algorithm: 'HS256',
                            allowInsecureKeySizes: true,
                            expiresIn: 86400, // 24 hours
                           });
              
    let authorities = [];
    return res.status(200).send({
      id: driver.id,
      username: driver.username,
      email: driver.email,
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

exports.editProfile = async (req, res) => {
  try {
    const { username, email, phone_number, licenseNumber, vehicleType, experience } = req.body;

    // Tìm driver dựa trên id từ req.userId
    const driver = await drivers.findByPk(req.userId);

    if (!driver) {
      return res.status(404).send({ message: "Driver Not found." });
    }

    // Cập nhật thông tin driver
    driver.username = username;
    driver.email = email;
    driver.phone_number = phone_number;



    // Lưu thay đổi
    await driver.save();

    res.send({ message: "Profile updated successfully!" });
  } catch (error) {
    console.error("Error updating profile:", error);
    res.status(500).send({ message: error.message });
  }
};
exports.updateDriverAndProfile = async (req, res) => {
  try {
    const driverId = req.userId;
    const driver = await drivers.findByPk(driverId);

    if (!driver) {
      return res.status(404).send({ message: "Driver Not found." });
    }

    const { username, email, phone_number, licenseNumber, vehicleType, experience } = req.body;
    driver.username = username || driver.username;
    driver.email = email || driver.email;
    driver.phone_number = phone_number || driver.phone_number;
    await driver.save();

    // Tìm driverProfile
    let driverProfile = await db.DriverProfile.findOne({
      where: { driver_id: driver.id }
    });

    // Nếu không tìm thấy, tạo mới
    if (!driverProfile) {
      driverProfile = await db.DriverProfile.create({
        driver_id: driver.id,
        driver_licenseNumber,
        vehicleType,
        cicard_number
      });
    }

    // Cập nhật thông tin driverProfile
    driverProfile.driver_licenseNumber = licenseNumber || driverProfile.driver_licenseNumber;
    driverProfile.vehicleType = vehicleType || driverProfile.vehicleType;
    driverProfile.cicard_number = experience || driverProfile.cicard_number;
    await driverProfile.save();

    res.send({ message: "Driver and Driver Profile updated successfully!" });
  } catch (error) {
    console.error("Error updating driver and driver profile:", error);
    res.status(500).send({ message: error.message });
  }
};
exports.getDriverInfo = async (req, res) => {
  try {
    const driverId = req.userId;
    const driver = await drivers.findByPk(driverId);

    if (!driver) {
      return res.status(404).send({ message: "Driver Not found." });
    }

    // Tìm driverProfile
    const driverProfile = await db.DriverProfile.findOne({
      where: { driver_id: driver.id }
    });

    // Gửi thông tin driver và driverProfile
    res.send({ driver, driverProfile });
  } catch (error) {
    console.error("Error getting driver info:", error);
    res.status(500).send({ message: error.message });
  }
};