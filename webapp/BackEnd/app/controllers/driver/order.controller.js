const admin = require('firebase-admin');
const db = require("../../models");
const User = db.user;
const Driver = db.drivers;
const Order = db.Order;
const Notification = db.Notification;
const menu_item = db.MenuItem;
process.env.GOOGLE_APPLICATION_CREDENTIALS="my-applicationw2-7ab21-firebase-adminsdk-h8edm-f1cfbcc5c9.json";
exports.acceptOrder = async (req, res) => {
  const { orderId, driverId } = req.body;

  try {
    // Update the order status and assign the driver
    const order = await Order.update({ status: 'delivering', driverId: driverId }, { where: { id: orderId } });
    if (!order) {
      return res.status(404).send({ message: 'Order not found.' });
    }

    // Update the driver status
    const driver = await Driver.update({ status: 'busy' }, { where: { id: driverId } });
    if (!driver) {
      return res.status(404).send({ message: 'Driver not found.' });
    }

    // Notify the user
    const user = await User.findByPk(order.userId);
    if (user && user.fcm_token) {
      const payload = {
        notification: {
          title: 'Order Accepted',
          body: `Your order has been accepted by the driver.`,
        },
        token: user.fcm_token,
      };

      const response = await admin.messaging().send(payload);
      console.log('Successfully sent message:', response);
    }

    res.status(200).send({ message: 'Order accepted successfully.' });
  } catch (error) {
    console.log('Error:', error);
    res.status(500).send({ message: 'Error accepting order.' });
  }
};

exports.rejectOrder = async (req, res) => {
  const { orderId, driverId } = req.body;

  try {
    // Notify the user
    const order = await Order.findByPk(orderId);
    if (!order) {
      return res.status(404).send({ message: 'Order not found.' });
    }

    const user = await User.findByPk(order.userId);
    if (user && user.fcm_token) {
      const payload = {
        notification: {
          title: 'Order Rejected',
          body: `Your order has been rejected by the driver.`,
        },
        token: user.fcm_token,
      };

      const response = await admin.messaging().send(payload);
      console.log('Successfully sent message:', response);
    }

    res.status(200).send({ message: 'Order rejected successfully.' });
  } catch (error) {
    console.log('Error:', error);
    res.status(500).send({ message: 'Error rejecting order.' });
  }
};