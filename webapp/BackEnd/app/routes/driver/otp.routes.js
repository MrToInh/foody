// app/routes/otp.routes.js
module.exports = app => {
    const otp = require("../../controllers/driver/otp.controller.js");
  
    let router = require("express").Router();
  
    // Route gửi OTP
    router.post("/send-otp", otp.sendOTP);
  
    // Route xác thực OTP
    router.post("/verify-otp", otp.verifyOTP);
  
    app.use("/api/driver/otp", router);
  };
  