const db = require("../models");
const MenuItem = db.MenuItem;
const orderController = require("../controllers/order.controller");
const OrderDetails = db.Orderdetails;
const Order = db.Order;
const User = db.user;
const jwt = require("jsonwebtoken");
const config = require("../config/auth.config");
const UserAddress = db.UserAddress;
exports.createAndAddToOrder = async (req, res) => {
    try {
        // Create the order
        const order = await orderController.createOrder(req, res);
        const orderId = await req.session.orderId;

        // If the order was created successfully
        if (order) {
            // Get the menu item ID and quantity from the request
            const menuItemId = req.body.menuItemId;
            const quantity = req.body.quantity;

            // Check if the menu item is already in the order
            let orderDetail = await OrderDetails.findOne({ where: { orderId: orderId, menuItemId: menuItemId } });

            if (orderDetail) {
                // If the menu item is already in the order, update the quantity
                orderDetail.quantity += quantity;
                await orderDetail.save();
            } else {
                // If the menu item is not in the order, add it
                orderDetail = await addToOrder(orderId, menuItemId, quantity);
            }

            if (orderDetail) {
                res.send({
                    message: "Order created and item added successfully!",
                    orderDetail: orderDetail
                });
            }
        } else {
            res.status(500).send({
                message: "Order creation failed."
            });
        }
    } catch (err) {
        res.status(500).send({
            message: err.message
        });
    }
};
  
  const addToOrder = async (orderId, menuItemId, quantity) => {
    // Find the menu item
    const menuItem = await MenuItem.findByPk(menuItemId);
    if (!menuItem) {
      throw new Error("Menu item not found.");
    }
  
    // Create the order detail
    const orderDetail = await OrderDetails.create({
      orderId: orderId,
      menuItemId: menuItemId,
      quantity: quantity,
      price: menuItem.price*quantity // Assuming the MenuItem model has a price field
    });
  
    return orderDetail;
  };

  exports.getAllOrderDetails = async (req, res) => {
    try {
      const token = req.session.token;
      if (!token) {
        return res.status(403).send({ message: "Unauthorized access! Please login first." });
      }
      
      jwt.verify(token, config.secret, async (err, decoded) => {
        if (err) {
          return res.status(401).send({ message: "Invalid token!" });
        } else {
          const userId = decoded.id; // Assuming you have access to the current user's ID
  
          const orderDetails = await OrderDetails.findAll({
            include: [
              {
                model: Order,
                as: 'Order',
                where: { user_id: userId }, // Only include Orders for the current user
                include: [
                  {
                    model: User,
                    as: 'user',
                    attributes: ['id',"fullname"],
                    include: [
                      {
                        model: UserAddress,
                        as: 'UserAddress', // Use the correct alias
                        include: [
                          {
                            model: db.Address,
                            as: 'Address',
                            attributes: ['id',"unit_number","street_number","city","region"]
                          }
                        ]
                      }
                    ]
                  }
                ]
              },
              {
                model: MenuItem,
                as: 'MenuItem',
                attributes: ['item_name', 'image', 'price'],
                include: [
                  {
                    model: db.Restaurant,
                    as: 'Restaurant',
                    attributes: ['restaurant_name']
                  }
                ]
              }
            ]
          });
          for (let orderDetail of orderDetails) {
            if (orderDetail.MenuItem) {
              console.log(`Updating price for OrderDetail ${orderDetail.id} to ${orderDetail.MenuItem.price * orderDetail.quantity}`);
              let updatedPrice =orderDetail.MenuItem.price * orderDetail.quantity;
              await db.Orderdetails.update({ price: updatedPrice }, {
                where: { id: orderDetail.id }
              });
            }
          }
          const results = orderDetails.map(orderDetail => ({
            buyerName: orderDetail.Order.user.fullname,
            buyerAddress: orderDetail.Order.user.UserAddress.map(userAddress => userAddress.Address), // Use the correct alias
            productName: orderDetail.MenuItem.item_name,
            productImage: orderDetail.MenuItem.image,
            purchaseDate: orderDetail.Order.order_date,
            productPrice: orderDetail.price,
            quantity: orderDetail.quantity,
            RestaurantName: orderDetail.MenuItem.Restaurant.restaurant_name,
          }));
  
          res.send(results);
        }
      });
    } catch (err) {
      res.status(500).send({ message: err.message });
    }
  };
  
// Delete an order
exports.deleteOrder = async (req, res) => {
    try {
        const token = req.session.token;
        if (!token) {
            return res.status(403).send({ message: "Unauthorized access! Please login first." });
        }
        jwt.verify(token, config.secret, async (err, decoded) => {
            if (err) {
                return res.status(401).send({ message: "Invalid token!" });
            } else {
                const userId = decoded.id;
                const { orderId } = req.body;
                const order = await Order.findOne({ where: { id: orderId, user_id: userId } });
                if (!order) {
                    return res.status(404).send({ message: "Order not found." });
                }
                await Order.destroy({ where: { id: orderId } });
                return res.send({ message: "Order deleted successfully." });
            }
        });
    } catch (err) {
        return res.status(500).send({ message: err.message || "Some error occurred while deleting the order." });
    }
}

// Edit an order
exports.editOrder = async (req, res) => {
    try {
        const token = req.session.token;
        if (!token) {
            return res.status(403).send({ message: "Unauthorized access! Please login first." });
        }
        jwt.verify(token, config.secret, async (err, decoded) => {
            if (err) {
                return res.status(401).send({ message: "Invalid token!" });
            } else {
                const userId = decoded.id;
                const { orderId, menuItemId, quantity } = req.body;
                const order = await Order.findOne({ where: { id: orderId, user_id: userId } });
                if (!order) {
                    return res.status(404).send({ message: "Order not found." });
                }
                const orderDetail = await OrderDetails.findOne({ where: { orderId: orderId, menuItemId: menuItemId } });
                if (!orderDetail) {
                    return res.status(404).send({ message: "Order detail not found." });
                }
                orderDetail.quantity = quantity;
                await orderDetail.save();
                return res.send({ message: "Order updated successfully." });
            }
        });
    } catch (err) {
        return res.status(500).send({ message: err.message || "Some error occurred while updating the order." });
    }
}