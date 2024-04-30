module.exports = (sequelize, Sequelize) => {
    const MenuItem = sequelize.define("MenuItem", {
        
        restaurant_id: {
            type: Sequelize.INTEGER
        },
        item_name: {
            type: Sequelize.STRING
        },
        description: {
            type: Sequelize.STRING
        },
        price: {
            type: Sequelize.DECIMAL
        },
        category: {
            type: Sequelize.STRING
        },
        image: {
            type: Sequelize.STRING
        }
    });

    return MenuItem;
};
exports.getItemDetailsById= async (itemId) => {
    try {
        const menuItem = await MenuItem.findByPk(itemId);
        return menuItem;
    } catch (err) {
        return null;
    }
}
