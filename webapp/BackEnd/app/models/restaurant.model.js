module.exports = (sequelize, Sequelize) => {
    const Restaurant = sequelize.define("restaurant", {
     
        restauant_name: {
            type: Sequelize.STRING
        },
        user_id: {
            type: Sequelize.INTEGER
        },
        address_id: {
            type: Sequelize.INTEGER
        },
        restauant_kind: {
            type: Sequelize.STRING
        },
    });
    return Restaurant;  
};