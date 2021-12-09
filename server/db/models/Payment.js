const Sequelize = require("sequelize");
const db = require("../db");

const Payment = db.define("payment", {
  amount: {
    type: Sequelize.FLOAT,
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
    type: Sequelize.BIGINT,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  status: {
    // type: Sequelize.ENUM("pending", "fulfilled", "cancelled"),
    type: Sequelize.BOOLEAN,
  },
});

module.exports = Payment;
