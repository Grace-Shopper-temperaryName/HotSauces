const Sequelize = require("sequelize");
const db = require("../db");

const OrderHotSauce = db.define("orderHotSauce", {
  quantity: {
    type: Sequelize.INTEGER,
    validate: {
      min: 1,
      notEmpty: true,
    },
    allowNull: false,
  },
});

module.exports = OrderHotSauce;
