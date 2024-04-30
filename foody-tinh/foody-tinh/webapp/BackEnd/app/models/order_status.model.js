module.exports = (sequelize, Sequelize) => {
    const OrderStatus = sequelize.define("order_status", {
        status_value: {
            type: Sequelize.BOOLEAN
        }
    });
    return OrderStatus;
};