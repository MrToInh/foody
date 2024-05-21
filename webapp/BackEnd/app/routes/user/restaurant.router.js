const { verifyToken } = require('../../middleware/authJwt.js');

module.exports=app=>{
    const restaurant_controller=require('../../controllers/user/restaurant.controller.js');
    const router=require('express').Router();
    router.post('/addrestaurant',verifyToken,restaurant_controller.addrestaurant);
    app.use('/api/restaurants',router);
}