module.exports = app => {
    const order_controller = require("../controllers/order.controller.js");
    const router = require("express").Router();
    router.post("/addorder", order_controller.addOrder);
    app.use("/api/orders", router);
}