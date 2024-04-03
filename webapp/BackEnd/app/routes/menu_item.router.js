module.exports = app => {
    const menu_item_controller = require('../controllers/menu_item.controller.js');
    const router = require('express').Router();

    router.get('/', menu_item_controller.findAll);
    router.get('/:id', menu_item_controller.findOne);
    router.put('/:id', menu_item_controller.update);
    router.delete('/:id', menu_item_controller.delete);
    router.delete('/', menu_item_controller.deleteAll);

    // Thêm hàm additem vào đây
    router.post('/additem', menu_item_controller.additem);

    app.use('/api/menu_items', router);
}
