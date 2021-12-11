const Sequelize = require("sequelize");
const db = require("../db");

const Order = db.define("order", {
  orderStatus: {
    type: Sequelize.ENUM("open", "pending payment", "completed", "cancelled"),
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  orderDate: {
    type: Sequelize.DATE,
    validate: {
      notEmpty: true,
    },
  },
  isCart: {
    // true = orderStatus: open, paymentStatus: null
    // false = orderStatus: completed, cancelled, pending payment, paymentStatus: fulfuilled, cancelled, pending
    type: Sequelize.BOOLEAN,
    validate: {
      notEmpty: true,
    },
  },
  amount: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  provider: {
    type: Sequelize.ENUM("visa", "mastercard", "americanexpress"),
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  cardNumber: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  paymentStatus: {
    type: Sequelize.ENUM("none", "pending", "fulfilled", "cancelled"),
    validate: {
      notEmpty: true,
    },
  },
});

module.exports = Order;
