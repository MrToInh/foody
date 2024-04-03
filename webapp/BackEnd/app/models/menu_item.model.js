module.exports = (sequelize, Sequelize) => {
    const MenuItem = sequelize.define("menu_item", {
        // id: {
        //     type: Sequelize.INTEGER,
        //     primaryKey: true
        // },
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