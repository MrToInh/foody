module.exports = (sequelize, Sequelize) => {
    const Restaurant = sequelize.define("Restaurant", {
     
        restaurant_name: {
            type: Sequelize.STRING
        },
        user_id: {
            type: Sequelize.INTEGER
        },
        address_id: {
            type: Sequelize.INTEGER
        },
        restaurant_kind: {
            type: Sequelize.STRING
        },
    });
    return Restaurant;  
};