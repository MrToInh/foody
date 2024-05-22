const db = require("../../models");
const Order =db.Order;
const Driver = db.drivers;
const User = db.user;
const admin = require('firebase-admin');
process.env.GOOGLE_APPLICATION_CREDENTIALS="my-applicationw2-7ab21-firebase-adminsdk-h8edm-f1cfbcc5c9.json" ;
exports.acceptOrder = async (req, res) => {
    try {
        const { orderId } = req.body;
        const driverId = req.userId;
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
        const driverId = req.userId;

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

        // Remove delivery_id from the order
        order.delivery_id = null;
        await order.save();

        const response = await admin.messaging().send(payload);
        console.log('Successfully sent message:', response);

        res.status(200).send({ message: 'Order rejected successfully.' });
    } catch (error) {
        console.log('Error:', error);
        res.status(500).send({ message: 'Error rejecting order.' });
    }
};