const router = require("express").Router();
const {
  models: { Order },
} = require("../db");
module.exports = router;

// mounted at /api/orders
router.get("/", async (req, res, next) => {
  try {
    const orders = await Order.findAll();
    res.json(orders);
  } catch (err) {
    next(err);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const order = await Order.findByPk(req.params.id);
    res.json(order);
  } catch (error) {
    next(error);
  }
});