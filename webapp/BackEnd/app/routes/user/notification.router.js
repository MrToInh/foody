const {verifyToken} = require('../../middleware/authJwt.js');
module.exports = app => {
    const notification = require('../../controllers/user/notification.controller.js');
    const router = require('express').Router();
    router.post('/', verifyToken, notification.notifyDriver);
    app.use('/api/notification', router);
}