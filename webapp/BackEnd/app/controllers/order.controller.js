const db = require("../models");
const jwt = require("jsonwebtoken");
const config = require("../config/auth.config");
const { where } = require("sequelize");
const User = db.user;
const Order = db.bill;
const MenuItem = db.menu_item;
const Op = db.Sequelize.Op;
async function getRestaurantIdFromMenuItemId(menuItemId) {
  const menuItem = await db.menu_item.findOne({
    where: { id: menuItemId },
    include: [
      {
        model: db.restaurants,
        as: "restaurants",
        attributes: ["id"],
      },
    ],
  });

  if (!menuItem || !menuItem.restaurants) {
    return null;
  }

  return menuItem.restaurants.id;
}
exports.addOrder = async (req, res) => {
  try {
    const token = req.session.token;
    if (!token) {
      return res
        .status(403)
        .send({ message: "Unauthorized access! Please login first." });
    }
    jwt.verify(token, config.secret, async (err, decoded) => {
      if (err) {
        return res.status(401).send({ message: "Invalid token!" });
      } else {
        const userId = decoded.id;
        let user = await User.findByPk(userId);
        if (!user) {
          return res.status(404).send({ message: "User not found." });
        }
        const order = await Order.create({
          user_id: userId,
        });
        if (order) {
          const menuItems = req.body.menu_item; // This should be an array of menu item ids
          for (let i = 0; i < menuItems.length; i++) {
            await order.addMenuItem(menuItems[i]); // This will create a new entry in the OrderDetails table
          }
          res.send({ message: "Order added successfully!" });
        }
      }
    });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};
