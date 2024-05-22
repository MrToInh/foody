const { verifyToken } = require('../../middleware/authJwt.js');

module.exports = app => {
    const menu_item_controller = require('../../controllers/user/MenuItem.controller.js');
    const router = require('express').Router();    
    router.delete('/delete',verifyToken, menu_item_controller.deleteItem);
    router.put('/update',verifyToken, menu_item_controller.updateItem);
    router.post('/additem',verifyToken, menu_item_controller.createItem);
    router.get('/getall',verifyToken, menu_item_controller.getAllItems);
    router.get('/getbyrestaurant/:restaurantId',verifyToken, menu_item_controller.getItemsByRestaurant);
    app.use('/api/menu_items', router);
}