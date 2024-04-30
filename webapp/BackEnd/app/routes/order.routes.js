

module.exports = app => {
    const order_controller = require("../controllers/order.controller.js");
    const Orderdetails = require("../controllers/orderdetail.controller.js");
    const router = require("express").Router();
    router.post("/addorder", Orderdetails.createAndAddToOrder);
    router.get("/getorder", Orderdetails.getAllOrderDetails);
    app.use("/api/orders", router);
}