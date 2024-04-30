module.exports = (sequelize, Sequelize) => {
    const DeliveryDriver = sequelize.define("Deliverydriver", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true
        },
        first_name: {
            type: Sequelize.STRING
        },
        phone: {
            type: Sequelize.STRING
        },
        status: {
            type: Sequelize.STRING
        },
    });
    return DeliveryDriver;
};