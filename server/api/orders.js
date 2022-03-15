const router = require("express").Router();
const {
  models: { Customer, Guest, Order },
} = require("../db");
const { requireTokeninBody } = require("./middleware");
module.exports = router;

// mounted at /api/orders
router.get("/", async (req, res, next) => {
  try {
    const orders = await Guest.findAll();
    res.send(orders);
  } catch (err) {
    console.error(err);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const order = await Guest.findByPk(req.params.id);
    res.send(order);
  } catch (err) {
    console.error(err);
  }
});

router.post("/", requireTokeninBody, async (req, res, next) => {
  try {
    const orderStatus = "open";
    const orderDate = new Date();
    const isCart = true;
    const amount = 0;
    const paymentStatus = "none";
    const order = await Order.create({
      orderStatus,
      orderDate,
      isCart,
      amount,
      paymentStatus,
    });

    await req.customer.addOrder(order);

    res.json(order);
  } catch (error) {
    next(error);
  }
});
