//this is the access point for all things database related!

const Sequelize = require("sequelize");
const db = require("./db");

const Customer = require("./models/Customer");
const HotSauce = require("./models/HotSauce");
const Order = require("./models/Order");
const OrderHotSauce = require("./models/OrderHotSauce");

//associations could go here!
Customer.hasMany(Order);
Order.belongsTo(Customer);

Order.belongsToMany(HotSauce, { through: OrderHotSauce });
HotSauce.belongsToMany(Order, { through: OrderHotSauce });

module.exports = {
  db,
  models: {
    Customer,
    HotSauce,
    Order,
    OrderHotSauce,
  },
};
