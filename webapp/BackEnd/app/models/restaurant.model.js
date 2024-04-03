module.exports = (sequelize, Sequelize) => {
    const Restaurant = sequelize.define("restaurant", {
        // id: {
        //     type: Sequelize.INTEGER,
        //     primaryKey: true
        // },
        restauant_name: {
            type: Sequelize.STRING
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