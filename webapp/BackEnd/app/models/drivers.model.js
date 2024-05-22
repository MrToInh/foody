module.exports = (sequelize, Sequelize) => {
    const DeliveryDriver = sequelize.define("drivers", {
        avatar: {
            type: Sequelize.STRING
        },
        name: {
            type: Sequelize.STRING
        },
        username: {
            type: Sequelize.STRING
        },
        email: {
            type: Sequelize.STRING
        },
        password: {
            type: Sequelize.STRING
        },
        phone: {
            type: Sequelize.STRING
        },
        status: {
            type: Sequelize.STRING
        },
        fcm_token: {
            type: Sequelize.STRING
        },
        remember_token: {
            type: Sequelize.STRING
        },
        drivering_order_id: {
            type: Sequelize.INTEGER
        }
    });
    return DeliveryDriver;
};