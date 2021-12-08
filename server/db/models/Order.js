const Sequelize = require("sequelize");
const db = require("../db");

const Order = db.define("order", {
  orderStatus: {
    // type: Sequelize.ENUM()
    type: Sequelize.BOOLEAN,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  orderDate: {
    type: Sequelize.DATE,
  },
  isCart: {
    type: Sequelize.BOOLEAN,
  },
});

module.exports = Order;
