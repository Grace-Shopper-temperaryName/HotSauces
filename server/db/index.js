//this is the access point for all things database related!
const db = require("./db");
const Customer = require("./models/Customer");
const HotSauce = require("./models/HotSauce");
const Order = require("./models/Order");
const OrderHotSauce = require("./models/OrderHotSauce");
const Guest = require("./models/Guest");

//associations could go here!
Customer.hasMany(Order);
Order.belongsTo(Customer);

Order.belongsToMany(HotSauce, { through: OrderHotSauce });
HotSauce.belongsToMany(Order, { through: OrderHotSauce });

Guest.hasOne(Order);
Order.belongsTo(Guest);

module.exports = {
  db,
  models: {
    Customer,
    HotSauce,
    Order,
    OrderHotSauce,
    Guest,
  },
};
