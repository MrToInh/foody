const {verifyToken} = require('../../middleware/authJwt.js');
module.exports = app => {
    const order_controller = require('../../controllers/driver/order.controller.js');
    const router = require('express').Router();
    router.get('/', verifyTokenDriver, order_controller.getOrdersByDriver);
    app.use('/api/driver/orders', router);
}