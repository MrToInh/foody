const {verifyToken} = require('../../middleware/authJwt.js');
module.exports = app => {
    const driver_auth_controller = require('../../controllers/driver/auth.controller.js');
    const router = require('express').Router();
    router.post('/signup', driver_auth_controller.signup);
    router.post('/signin', driver_auth_controller.signin);
    router.put('/update', verifyToken, driver_auth_controller.editProfile);
    router.get('/profile', verifyToken, driver_auth_controller.getDriverInfo);
    router.post('/profile', verifyToken, driver_auth_controller.updateDriverAndProfile);
    app.use('/api/driver/auth', router);
}