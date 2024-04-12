module.exports=app=>{
    const address_controller=require('../controllers/address.controller.js');
    const router=require('express').Router();
    router.post('/addAddress',address_controller.addAddress);
    app.use('/api/address',router);
};