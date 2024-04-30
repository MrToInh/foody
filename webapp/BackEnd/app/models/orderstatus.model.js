module.exports = (sequelize, Sequelize) => {
    const OrderStatus = sequelize.define("OrderStatus", {
        status_value: {
            type: Sequelize.BOOLEAN
        }
    });
    return OrderStatus;
};