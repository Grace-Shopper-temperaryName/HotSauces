const Sequelize = require("sequelize");
const db = require("../db");

const Order = db.define("order", {
  orderStatus: {
    // type: Sequelize.ENUM('cancelled', 'opened' , 'completed')
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
    // true = orderStatus: opened , false = orderStatus: completed or cancelled
    type: Sequelize.BOOLEAN,
  },
  amount: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  provider: {
    // type: Sequelize.ENUM("Visa", "Mastercard", "American Express", "Discover"),
    type: Sequelize.STRING,
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
    // type: Sequelize.ENUM("cancelled", "pending", "fulfilled" )
    type: Sequelize.BOOLEAN,
  },
});

module.exports = Order;
