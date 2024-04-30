module.exports = (sequelize, Sequelize) => {
  const OrderDetails = sequelize.define('OrderDetails', {
    orderId: {
      type: Sequelize.INTEGER,
      references: {
        model: 'Orders', // name of your model
        key: 'id',
      }
    },
    menuItemId: {
      type: Sequelize.INTEGER,
      references: {
        model: 'MenuItems', // name of your model
        key: 'id',
      }
    },
    // Other fields...
  });
  return OrderDetails;
};