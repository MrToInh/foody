const {verifyToken} = require('../../middleware/authJwt.js');
const { checkDuplicateUsernameOrEmailDriver } = require('../../middleware/verifySignUp.js');
module.exports = app => {
    const driver_auth_controller = require('../../controllers/driver/auth.controller.js');
    const router = require('express').Router();
    router.post('/signup',checkDuplicateUsernameOrEmailDriver, driver_auth_controller.signup);
    router.post('/signin', driver_auth_controller.signin);
    router.put('/update', verifyToken, driver_auth_controller.editProfile);
    router.get('/profile', verifyToken, driver_auth_controller.getDriverInfo);
    router.put('/profile', verifyToken, driver_auth_controller.updateDriverAndProfile);
    app.use('/api/driver/auth', router);
}