module.exports=app=>{
    const restaurant_controller=require('../controllers/restaurant.controller.js');
    const router=require('express').Router();
    router.post('/addrestaurant',restaurant_controller.addrestaurant);
    app.use('/api/restaurants',router);
}