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
  price: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  stock: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  imageUrl: {
    type: Sequelize.STRING,
    defaultValue:
      "https://www.seriouseats.com/thmb/zYBegAMss850pXr_oWtXnfQ1wM4=/1500x1125/filters:no_upscale():max_bytes(150000):strip_icc()/__opt__aboutcom__coeus__resources__content_migration__serious_eats__seriouseats.com__2021__02__20210128-fermented-hot-sauce-charred-fresno-tamari-vicky-wasik-ec8e5f05468443f9adc456686fbff1c9.jpg",
  },
  sku: {
    type: Sequelize.STRING,
    unique: true,
    validate: {
      notEmpty: true,
    },
  },
  description: {
    type: Sequelize.STRING(1000),
  },
});

module.exports = HotSauce;
