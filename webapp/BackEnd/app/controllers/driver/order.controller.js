const admin = require('firebase-admin');
const db = require("../../models");
const User = db.user;
const Notification = db.Notification;
const menu_item = db.MenuItem;
const Driver = db.drivers;
const Order = db.Order;

exports.getOrdersByDriver = async (req, res) => {
  // Get driver id from req.userId
  const driverId = req.driverId;

  // Find the driver
  const driver = await Driver.findByPk(driverId);
  if (!driver) {
    return res.status(404).send({
      message: "Driver not found."
    });
  }

  try {
    const orders = await Order.findAll({ where: { delivery_id: driverId } });

    if (!orders.length) {
      return res.status(404).send({ message: 'No orders found for this driver.' });
    }

    res.status(200).send(orders);
  } catch (error) {
    console.log('Error:', error);
    res.status(500).send({ message: 'Error retrieving orders.' });
  }
};