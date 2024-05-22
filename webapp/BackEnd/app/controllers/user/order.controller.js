const db = require("../../models");
const User = db.user;
const Order = db.Order;
const OrderStatus = db.Orderstatus;
exports.getAllOrderProcessing = async (req, res) => {
  try {
    const processingStatus = await OrderStatus.findOne({ where: { status_value: 'Processing' } });
    if (!processingStatus) {
      throw new Error('Processing status not found');
    }

    const orders = await Order.findAll({
      where: { order_status_id: processingStatus.id },
    });

    if (!orders) {
      return res.status(404).send({
        message: "No orders found.",
      });
    }

    res.send(orders);
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};