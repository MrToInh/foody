const admin = require('firebase-admin');
const db = require("../../models");
const User = db.user;
const Driver = db.drivers;
const Order = db.Order;
const Notification = db.Notification;
const menu_item = db.MenuItem;
process.env.GOOGLE_APPLICATION_CREDENTIALS="food-android-c5fb7-firebase-adminsdk-48heu-a75b224a17.json" ;
exports.notifyDriver = async (req, res) => {
  const { order: orderId, driverId } = req.body;

  try {
    const order = await Order.findByPk(orderId);
    if (!order) {
      return res.status(404).send({ message: 'Order not found.' });
    }

    const driver = await Driver.findByPk(driverId);
    if (!driver || !driver.fcm_token) {
      return res.status(404).send({ message: 'Driver not found or has no FCM token.' });
    }

    const payload = {
      notification: {
        title: 'New Order',
        body: `You have a new order. Details: Customer Address - ${order.from_address}, Restaurant Address - ${order.to_address}, Price - ${order.price}`,
      },
      token: driver.fcm_token,
    };

    const response = await admin.messaging().send(payload);
    console.log('Successfully sent message:', response);

    await Notification.create({
      driverId: driverId,
      orderId: orderId,
      title: payload.notification.title,
      body: payload.notification.body,
      status: 'sent'
    });

    res.status(200).send({ message: 'Notification sent successfully.' });
  } catch (error) {
    console.log('Error:', error);

    await Notification.create({
      driverId: driverId,
      orderId: orderId,
      title: 'New Order',
      body: `Failed to send order: ${JSON.stringify(order)}`,
      status: 'failed'
    });

    res.status(500).send({ message: 'Error sending notification.' });
  }
};
exports.notifyRandomDriver = async (req, res) => {
  try {
    const drivers = await Driver.findAll({ where: { status: null } });
    const order = await Order.findByPk(req.body.order);
    if (!drivers.length) {
      if (order) {
        order.order_status_id = 1;
        await order.save();
      }
      return res.status(404).send({ message: 'No available driver to take the order.' });
    }

    // Select a random driver from the list of drivers with status null
    const driver = drivers[Math.floor(Math.random() * drivers.length)];

    // Add the driverId to the request body
    req.body.driverId = driver.id;

    // Call the notifyDriver function
    await exports.notifyDriver(req, res);

    // Update the order's delivery_id with the selected driver's id
    if (order) {
      order.delivery_id = driver.id;
      await order.save();
    }
  } catch (error) {
    console.log('Error:', error);
    res.status(500).send({ message: 'Error selecting driver.' });
  }
};