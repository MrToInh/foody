const config = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(config.DB, config.USER, config.PASSWORD, {
  host: config.HOST,
  dialect: config.dialect,
  pool: {
    max: config.pool.max,
    min: config.pool.min,
    acquire: config.pool.acquire,
    idle: config.pool.idle,
  },
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require("../models/user.model.js")(sequelize, Sequelize);
db.role = require("../models/role.model.js")(sequelize, Sequelize);
db.Address = require("../models/address.model.js")(sequelize, Sequelize);
db.Deliverydriver = require("./deliverydriver.model.js")(sequelize, Sequelize);
db.Orderstatus = require("./orderstatus.model.js")(sequelize, Sequelize);
db.Restaurant = require("../models/restaurant.model.js")(sequelize, Sequelize);
db.Order = require("./Order.model.js")(sequelize, Sequelize);
db.MenuItem = require("./menuitem.model.js")(sequelize, Sequelize);
db.Otp = require("../models/otp.model.js")(sequelize, Sequelize);
db.Orderdetails = require("../models/orderdetail.model.js")(sequelize, Sequelize);
db.UserAddress = require("../models/useraddress.model.js")(sequelize, Sequelize);

//user/role
db.role.belongsToMany(db.user, {
  through: "user_roles",
});
db.user.belongsToMany(db.role, {
  through: "user_roles",
});
//cus/address
db.Address.hasMany(db.UserAddress, {
  foreignKey: "address_id",
  as: "UserAddress",
});
db.UserAddress.belongsTo(db.Address, {
  foreignKey: "address_id",
  as: "Address",
});
db.user.hasMany(db.UserAddress, {
  foreignKey: "user_id",
  as: "UserAddress",
});
db.UserAddress.belongsTo(db.user, {
  foreignKey: "user_id",
  as: "user",
});
//Order/MenuItem
db.Order.hasMany(db.Orderdetails, {
  foreignKey: "orderId",
  as: "Orderdetails",
});
db.Orderdetails.belongsTo(db.Order, {
  foreignKey: "orderId",
  as: "Order",
});
db.MenuItem.hasMany(db.Orderdetails, {
  foreignKey: "menuItemId",
  as: "Orderdetails",
});
db.Orderdetails.belongsTo(db.MenuItem, {
  foreignKey: "menuItemId",
  as: "MenuItem",
});
//cus/Order
db.Order.belongsTo(db.user, {
  foreignKey: "user_id",
  as: "user",
});
db.user.hasMany(db.Order, {
  foreignKey: "user_id",
  as: "Orders",
});
//rest/Order
db.Order.belongsTo(db.Restaurant, {
  foreignKey: "restaurant_id",
  as: "restaurant",
});
db.Restaurant.hasMany(db.Order, {
  foreignKey: "restaurant_id",
  as: "Orders",
});
//del/Order
db.Order.belongsTo(db.Deliverydriver, {
  foreignKey: "delivery_id",
  as: "delivery",
});
db.Deliverydriver.hasMany(db.Order, {
  foreignKey: "delivery_id",
  as: "Orders",
});
//Orderstatus/Order
db.Order.belongsTo(db.Orderstatus, {
  foreignKey: "Orderstatus_id",
  as: "Orderstatus",
});
db.Orderstatus.hasMany(db.Order, {
  foreignKey: "Orderstatus_id",
  as: "Orders",
});
//rest/address
db.Restaurant.belongsTo(db.Address, {
  foreignKey: "address_id",
  as: "address",
});
db.Address.hasMany(db.Restaurant, {
  foreignKey: "address_id",
  as: "Restaurant",
});
//item/rest
db.Restaurant.hasMany(db.MenuItem, {
  foreignKey: "restaurant_id",
  as: "MenuItem",
});
db.MenuItem.belongsTo(db.Restaurant, {
  foreignKey: "restaurant_id",
  as: "Restaurant",
});
db.user.hasMany(db.Restaurant, {
  foreignKey: "user_id",
  as: "Restaurant",
});
db.Restaurant.belongsTo(db.user, {
  foreignKey: "user_id",
  as: "user",
});
db.user.hasMany(db.Otp, { foreignKey: "userId" }); // Mỗi User có nhiều Otp
db.Otp.belongsTo(db.user, { foreignKey: "userId" });
db.ROLES = ["user", "admin", "owner"];

module.exports = db;
