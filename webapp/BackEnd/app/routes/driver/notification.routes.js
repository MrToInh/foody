const { verifyToken } = require("../../middleware/authJwt.js");

module.exports=app=>{
    const notification=require("../../controllers/driver/notification.controller.js");
    let router=require("express").Router();
    router.post("/accept-order",verifyToken,notification.acceptOrder);
    router.post("/reject-order",notification.rejectOrder);
    app.use("/api/driver/notification",router);
}