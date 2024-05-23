const { verifyTokenDriver } = require("../../middleware/authJwt.js");

module.exports=app=>{
    const notification=require("../../controllers/driver/notification.controller.js");
    let router=require("express").Router();
    router.post("/accept-order",verifyTokenDriver,notification.acceptOrder);
    router.post("/reject-order",verifyTokenDriver,notification.rejectOrder);
    app.use("/api/driver/notification",router);
}