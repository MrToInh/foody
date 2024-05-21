const db = require("../../models");
const MenuItem = db.MenuItem;
const OrderStatus = db.Orderstatus;
const OrderDetails = db.Orderdetails;
const Order = db.Order;
exports.OrderInProcess = async (req, res) => {
  try {
    // Get the menu item ID, quantity, phone number, receiver's name, from_address, to_address from the request
    const { menuItemId, quantity, phoneNumber, receiverName, from_address, to_address, price } = req.body;

    // Find the menu item
    const menuItem = await MenuItem.findByPk(menuItemId);
    if (!menuItem) {
      return res.status(404).send({
        message: "Menu item not found.",
      });
    }
    const pendingStatus = await OrderStatus.findOne({ where: { status_value: 'Processing' } });

    if (!pendingStatus) {
      throw new Error('Pending status not found');
    }
    // Create the order
    const order = await Order.create({
      user_id: req.userId,
      receiver_name: receiverName,
      from_address: from_address,
      to_address: to_address,
      item: menuItem, // Use the item from the menu item
      order_status_id: pendingStatus.id,
      delivery_id: null,
      price: price,
      order_date: new Date(),
      delivery_fee: null,
      request_delivery_date: null,
      user_driver_rating: null,
      user_restaurant_rating: null
    });

    if (!order) {
      return res.status(500).send({
        message: "Order creation failed.",
      });
    }

    req.session.orderId = order.id;

    // Add the menu item to the order
    const orderDetail = await addToOrder(order.id, menuItemId, quantity, phoneNumber, receiverName);

    if (!orderDetail) {
      return res.status(500).send({
        message: "Failed to add item to order.",
      });
    }

    res.send({
      message: "Order created and item added successfully!",
      orderDetail: Order,
    });
  } catch (err) {
    res.status(500).send({
      message: err.message,
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
    price: menuItem.price * quantity, // Assuming the MenuItem model has a price field
  });

  return orderDetail;
};

