const {
  models: { Customer },
} = require("../db");

const requireToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    console.log("REQ", req.headers);
    const customer = await Customer.findByToken(token);
    req.customer = customer;
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = requireToken;
