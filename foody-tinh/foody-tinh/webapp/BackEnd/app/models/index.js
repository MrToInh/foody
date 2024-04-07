const config = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(
  config.DB,
  config.USER,
  config.PASSWORD,
  {
    host: config.HOST,
    dialect: config.dialect,
    pool: {
      max: config.pool.max,
      min: config.pool.min,
      acquire: config.pool.acquire,
      idle: config.pool.idle
    }
  }
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require("../models/user.model.js")(sequelize, Sequelize);
db.role = require("../models/role.model.js")(sequelize, Sequelize);
db.address = require("../models/address.model.js")(sequelize, Sequelize);
db.delivery_driver = require("../models/delivery_driver.model.js")(sequelize, Sequelize);
db.order_status = require("../models/order_status.model.js")(sequelize, Sequelize);
db.restaurant = require("../models/restaurant.model.js")(sequelize, Sequelize);
db.bill = require("../models/bill.model.js")(sequelize, Sequelize);
db.menu_item = require("../models/menu_item.model.js")(sequelize, Sequelize);

//user/role
db.role.belongsToMany(db.user, {
  through: "user_roles"
});
db.user.belongsToMany(db.role, {
  through: "user_roles"
});
//cus/address
db.address.belongsToMany(db.user, {
  through: "user_address"
});
db.user.belongsToMany(db.address, {
  through: "user_address"
});
//bill/menu_item
db.menu_item.belongsToMany(db.bill, {
  through: "order_menu_item"
});
db.bill.belongsToMany(db.menu_item, {
  through: "order_menu_item"
});
//cus/bill
db.bill.belongsTo(db.user, {
  foreignKey: 'user_id',
  as:'user'
});
db.user.hasMany(db.bill, {
  foreignKey: 'user_id',
  as:'bills'
});
//rest/bill
db.bill.belongsTo(db.restaurant, {
  foreignKey: 'restaurant_id',
  as:'restaurant'
});
db.restaurant.hasMany(db.bill, {
  foreignKey: 'restaurant_id',
  as:'bills'
});
//del/bill
db.bill.belongsTo(db.delivery_driver, {
  foreignKey: 'delivery_id',
  as:'delivery'
});
db.delivery_driver.hasMany(db.bill, {
  foreignKey: 'delivery_id',
  as:'bills'
});
//order_status/bill
db.bill.belongsTo(db.order_status, {
  foreignKey: 'order_status_id',
  as:'order_status'
});
db.order_status.hasMany(db.bill, {
  foreignKey: 'order_status_id',
  as:'bills'
});
//rest/address
db.restaurant.belongsTo(db.address, {
  foreignKey: 'address_id',
  as:'address'
});
db.address.hasMany(db.restaurant, {
  foreignKey: 'address_id',
  as:'restaurants'
});
//item/rest
db.restaurant.hasMany(db.menu_item, {
  foreignKey: 'restaurant_id',
  as:'menu_item'
});
db.menu_item.belongsTo(db.restaurant, {
  foreignKey: 'restaurant_id',
  as:'restaurants'
});
db.ROLES = ["user", "admin", "owner"];

module.exports = db;
