const Sequelize = require("sequelize");
const db = require("../db");

const HotSauce = db.define("hotSauce", {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
    validate: {
      notEmpty: true,
    },
  },
  heatLevel: {
    type: Sequelize.INTEGER,
    validate: {
      min: 1,
      max: 10,
    },
    defaultValue: 1,
  },
  imageUrl: {
    type: Sequelize.STRING,
    defaultValue: "",
  },
  price: {
    type: Sequelize.FLOAT,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  sku: {
    type: Sequelize.INTEGER,
    unique: true,
  },
  description: {
    type: Sequelize.TEXT,
  },
});

module.exports = HotSauce;
