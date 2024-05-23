module.exports = (sequelize, Sequelize) => {
  const OrderDetails = sequelize.define('OrderDetails', {
    orderId: {
      type: Sequelize.INTEGER,
    },
    menuItemId: {
      type: Sequelize.INTEGER,
    }
  });
  return OrderDetails;
};