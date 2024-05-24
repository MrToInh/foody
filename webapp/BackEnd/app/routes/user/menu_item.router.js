const { verifyToken } = require('../../middleware/authJwt.js');

module.exports = app => {
    const menu_item_controller = require('../../controllers/user/MenuItem.controller.js');
    const router = require('express').Router();    
    router.delete('/delete',verifyToken, menu_item_controller.deleteItem);
    router.put('/update',verifyToken, menu_item_controller.updateItem);
    router.post('/additem',verifyToken, menu_item_controller.createItem);
    router.get('/getall', menu_item_controller.getAllItems);
    router.get('/getbyrestaurant/:restaurantId', menu_item_controller.getItemsByRestaurant);
    router.get('/getbyid/:itemId', menu_item_controller.getItemById);
    router.get('/getItembyName/:searchKeyword', menu_item_controller.getbyName);
    app.use('/api/menu_items', router);
}
