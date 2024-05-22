module.exports = (sequelize, Sequelize) => {
    const OrderStatus = sequelize.define("order_status", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true
          },
        status_value: {
            type: Sequelize.STRING
        }
    });
    return OrderStatus;
};
