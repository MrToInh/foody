module.exports=app=>{
    const address_controller=require('../controllers/address.controller.js');
    const router=require('express').Router();
    router.post('/addAddress',address_controller.addAddress);
    router.put('/editAddress',address_controller.editAddress);
    router.delete('/deleteAddress',address_controller.deleteAddress);
    router.get('/getAddresses',address_controller.getAllAddresses);
    
    app.use('/api/address',router);
};