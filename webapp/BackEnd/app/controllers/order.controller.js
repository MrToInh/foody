const db = require("../models");
const jwt = require("jsonwebtoken");
const config = require("../config/auth.config");
const { where } = require("sequelize");
const User = db.user;
const Order = db.Order;
const MenuItem = db.MenuItem;
const Op = db.Sequelize.Op;
const OrderStatus = db.Orderstatus;
const util = require('util');
const jwtVerify = util.promisify(jwt.verify);
const OrderDetails = db.Orderdetails;
exports.createOrder = async (req, res) => {
  try {
    const token = req.session.token;
    if (!token) {
      return res.status(403).send({
        message: "Unauthorized access! Please login first."
      });
    }
    const decoded = await jwtVerify(token, config.secret);
    const userId = decoded.id;
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).send({
        message: "User not found."
      });
    }

    // Find the 'Pending' status ID
    const pendingStatus = await OrderStatus.findOne({ where: { status_value: 'Pending' } });

    if (!pendingStatus) {
      throw new Error('Pending status not found');
    }

    // Create the order
    const order = await Order.create({
      user_id: userId,
      user_address_id: user.address_id, // Assuming the user has an address_id field
      order_status_id: pendingStatus.id,
      price: null,
      order_date: new Date(),
      delivery_fee: null,
      request_delivery_date: null,
      user_driver_rating: null,
      user_restaurant_rating: null
    });
    req.session.orderId = order.id;
    // Return the order
    return order;
  } catch (err) {
    res.status(500).send({
      message: err.message
    });
  }
};