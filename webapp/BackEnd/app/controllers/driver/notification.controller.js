const db = require("../../models");
const Order =db.Order;
const Driver = db.drivers;
const User = db.user;
const admin = require('firebase-admin');
const { notifyRandomDriver } = require('../user/notification.controller');
process.env.GOOGLE_APPLICATION_CREDENTIALS="food-android-c5fb7-firebase-adminsdk-48heu-a75b224a17.json" ;
exports.acceptOrder = async (req, res) => {
    try {
        const { orderId } = req.body;
        const driverId = req.driverId;
        const order = await Order.findByPk(orderId,{
            include: [
              {
                model: User,
                as: 'user',
                attributes: ['fcm_token'],
              }
            ]
          });
        if (!order) {
            return res.status(404).send({ message: 'Order not found.' });
        }
        const driver = await Driver.findByPk(driverId);
        if (!driver) {
            return res.status(404).send({ message: 'Driver not found.' });
        }
        // Update driver status to "busy"
        driver.status = "busy";
        await driver.save();

        // Update order status to 3
        order.order_status_id = 3;
        await order.save();

        // Get the user
        const user = await User.findByPk(order.user_id);
        if (!user) {
            return res.status(404).send({ message: 'User not found.' });
        }

        // Send notification to user
        const payload = {
            notification: {
                title: 'Order Accepted',
                body: `Your order has been accepted by the driver. Details: Customer Address - ${order.from_address}, Restaurant Address - ${order.to_address}, Price - ${order.price}`,
            },
            token: order.user.fcm_token,
        };

        const response = await admin.messaging().send(payload);
        console.log('Successfully sent message:', response);

        res.status(200).send({ message: 'Order accepted successfully.' });
    } catch (error) {
        console.log('Error:', error);
        res.status(500).send({ message: 'Error accepting order.' });
    }
};
exports.rejectOrder = async (req, res) => {
    try {
        const { orderId } = req.body;
        const driverId = req.driverId;
        
        const order = await Order.findByPk(orderId, {
            include: [
              {
                model: User,
                as: 'user',
                attributes: ['fcm_token'],
              }
            ]
          });
        if (!order) {
            return res.status(404).send({ message: 'Order not found.' });
        }
        req.body.order = orderId;
        const driver = await Driver.findByPk(driverId);
        if (!driver) {
            return res.status(404).send({ message: 'Driver not found.' });
        }

        // Send notification to user
        const payload = {
            notification: {
                title: 'Order Rejected',
                body: `Your order has been rejected by the driver. Details: Customer Address - ${order.from_address}, Restaurant Address - ${order.to_address}, Price - ${order.price}`,
            },
            token: order.user.fcm_token,
        };
        
        driver.status = "busy";
        await driver.save();
        order.delivery_id = null;
        await order.save();
        // Remove delivery_id from the order
        

        const response = await admin.messaging().send(payload);
        console.log('Successfully sent message:', response);

        // Notify another driver
        await notifyRandomDriver(req, res);

        if (!res.headersSent) {
            res.status(200).send({ message: 'Order rejected successfully.' });
        }
    } catch (error) {
        console.log('Error:', error);
        res.status(500).send({ message: 'Error rejecting order.' });
    }
};
