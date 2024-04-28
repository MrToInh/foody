module.exports = app => {
    const menu_item_controller = require('../controllers/MenuItem.controller.js');
    const router = require('express').Router();    
    router.delete('/delete', menu_item_controller.deleteItem);
    router.put('/update', menu_item_controller.updateItem);
    router.post('/additem', menu_item_controller.createItem);
    app.use('/api/menu_items', router);
}
