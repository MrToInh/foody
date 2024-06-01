// app/routes/otp.routes.js
module.exports = app => {
    const otp = require("../../controllers/driver/otp.controller.js");
  
    let router = require("express").Router();
    router.post("/send-otp", otp.sendOTP);
    router.post("/verify-otp", otp.verifyOTP);
    app.use("/api/driver/otp", router);
  };
  