const { verifyToken } = require('../../middleware/authJwt.js');

module.exports=app=>{
    const address_controller=require('../../controllers/user/address.controller.js');
    const router=require('express').Router();
    router.post('/addAddress',verifyToken,address_controller.addAddress);
    router.put('/editAddress/:id',verifyToken,address_controller.editAddress);
    router.delete('/deleteAddress',verifyToken,address_controller.deleteAddress);
    router.get('/getAddresses',verifyToken,address_controller.getAllAddresses);
    router.get('/getaddressId/:id',address_controller.getAddressById);
    app.use('/api/address',router);
};