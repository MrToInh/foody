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

// exports.getAllOrderDetails = async (req, res) => {
//   try {
    
//         const userId = req.userId; // Assuming you have access to the current user's ID

//         let orderDetails = await OrderDetails.findAll({
//           include: [
//             {
//               model: Order,
//               as: "Order",
//               where: { user_id: userId }, // Only include Orders for the current user
//               include: [
//                 {
//                   model: User,
//                   as: "user",
//                   attributes: ["id", "fullname"],
//                   include: [
//                     {
//                       model: UserAddress,
//                       as: "UserAddress", // Use the correct alias
//                       include: [
//                         {
//                           model: db.Address,
//                           as: "Address",
//                           attributes: [
//                             "id",
//                             "unit_number",
//                             "street_number",
//                             "city",
//                             "region",
//                           ],
//                         },
//                       ],
//                     },
//                   ],
//                 },
//               ],
//             },
//             {
//               model: MenuItem,
//               as: "MenuItem",
//               attributes: ["item_name", "image", "price"],
//               include: [
//                 {
//                   model: db.Restaurant,
//                   as: "Restaurant",
//                   attributes: ["restaurant_name"],
//                 },
//               ],
//             },
//           ],
//         });
//         for (let orderDetail of orderDetails) {
//           if (orderDetail.MenuItem) {
//             console.log(
//               `Updating price for OrderDetail ${orderDetail.id} to ${
//                 orderDetail.MenuItem.price * orderDetail.quantity
//               }`
//             );
//             let updatedPrice =
//               orderDetail.MenuItem.price * orderDetail.quantity;
//             await db.Orderdetails.update(
//               { price: updatedPrice },
//               {
//                 where: { id: orderDetail.id },
//               }
//             );
//           }
//         }
//         let groupedOrderDetails = {};
//         for (let orderDetail of orderDetails) {
//           let key = `${
//             orderDetail.Order.user.fullname
//           }-${orderDetail.Order.user.UserAddress.map(
//             (userAddress) => userAddress.Address
//           ).join(",")}-${orderDetail.MenuItem.item_name}-${
//             orderDetail.MenuItem.image
//           }-${orderDetail.price}-${
//             orderDetail.MenuItem.Restaurant.restaurant_name
//           }`;
//           if (groupedOrderDetails[key]) {
//             groupedOrderDetails[key].quantity += parseInt(orderDetail.quantity);
//             groupedOrderDetails[key].price += parseFloat(orderDetail.price);
//             await OrderDetails.destroy({ where: { id: orderDetail.id } }); // Delete the current order detail
//           } else {
//             groupedOrderDetails[key] = orderDetail;
//             groupedOrderDetails[key].quantity = parseInt(orderDetail.quantity);
//             groupedOrderDetails[key].price = parseFloat(orderDetail.price);
//           }
//         }

//         // Convert the grouped order details object back to an array
//         orderDetails = Object.values(groupedOrderDetails);

//         for (let orderDetail of orderDetails) {
//           await OrderDetails.update(
//             { quantity: orderDetail.quantity, price: orderDetail.price },
//             { where: { id: orderDetail.id } }
//           );
//         }
//         const results = orderDetails.map((orderDetail) => ({
//           buyerName: orderDetail.Order.user.fullname,
//           buyerAddress: orderDetail.Order.user.UserAddress.map(
//             (userAddress) => userAddress.Address
//           ), // Use the correct alias
//           productName: orderDetail.MenuItem.item_name,
//           productImage: orderDetail.MenuItem.image,
//           purchaseDate: orderDetail.Order.order_date,
//           productPrice: orderDetail.price,
//           quantity: orderDetail.quantity,
//           RestaurantName: orderDetail.MenuItem.Restaurant.restaurant_name,
//         }));

//         res.send(results);
//   } catch (err) {
//     res.status(500).send({ message: err.message });
//   }
// };
