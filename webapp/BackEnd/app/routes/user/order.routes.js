const { verifyToken } = require("../../middleware/authJwt.js");


module.exports = app => {

    const Orderdetails = require("../../controllers/user/orderdetail.controller.js");
    const Order = require("../../controllers/user/order.controller.js");
    const router = require("express").Router();
    router.post("/addorder",Orderdetails.OrderInProcess);
    router.get("/getorder",verifyToken, Order.getAllOrderProcessing);
    app.use("/api/orders", router);
}