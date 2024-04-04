module.exports = app => {
    const menu_item_controller = require('../controllers/menu_item.controller.js');
    const router = require('express').Router();    
    router.delete('/delete', menu_item_controller.deleteItem);
    router.put('/update', menu_item_controller.updateItem);
    router.post('/additem', menu_item_controller.additem);
    router.get('/getallitems', menu_item_controller.getAllItems);
    router.get('/getitems', menu_item_controller.getItemById);
    app.use('/api/menu_items', router);
}
