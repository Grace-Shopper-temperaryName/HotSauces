//this is the access point for all things database related!

const db = require("./db");

const User = require("./models/User");
const HotSauce = require("./models/HotSauce");

//associations could go here!
User.belongsToMany(HotSauce, { through: "userHotSauce" });
HotSauce.belongsToMany(User, { through: "userHotSauce" });

module.exports = {
  db,
  models: {
    User,
    HotSauce,
  },
};
