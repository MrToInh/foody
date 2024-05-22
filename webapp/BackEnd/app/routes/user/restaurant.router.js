const { verifyToken } = require('../../middleware/authJwt.js');

module.exports=app=>{
    const restaurant_controller=require('../../controllers/user/restaurant.controller.js');
    const router=require('express').Router();
    router.post('/',verifyToken,restaurant_controller.addrestaurant);
    router.get('/item',restaurant_controller.getRestaurant);
    router.get('/',restaurant_controller.getAllRestaurants);
    app.use('/api/restaurants',router);
}