//this is the access point for all things database related!

const Sequelize = require("sequelize");
const db = require("./db");

const Customer = require("./models/Customer");
const HotSauce = require("./models/HotSauce");
const Order = require("./models/Order");
const Payment = require("./models/Payment");

//associations could go here!
Customer.hasMany(Order);
Order.belongsTo(Customer);

const OrderHotSauce = db.define("orderHotSauce", {
  quantity: {
    type: Sequelize.INTEGER,
    validate: {
      min: 1,
      notEmpty: true,
    },
    allowNull: false,
  },
  orderId: {
    type: Seq
    unique: false,
  },
});

Order.belongsToMany(HotSauce, { through: OrderHotSauce });
HotSauce.belongsToMany(Order, { through: OrderHotSauce });

Order.hasOne(Payment);
Payment.belongsTo(Order);

module.exports = {
  db,
  models: {
    Customer,
    HotSauce,
    Order,
    Payment,
    OrderHotSauce,
  },
};
