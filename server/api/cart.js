const router = require("express").Router();
const {
  models: { Customer, HotSauce, Order, OrderHotSauce },
} = require("../db");
// const requireToken = require("./middleware");
module.exports = router;

// mounted on /api/cart
router.get("/:customerId", async (req, res, next) => {
  try {
    // if (req.params.customerId === req.customer.id) {
    const customer = await Customer.findByPk(req.params.customerId);
    const order = await customer.getOrders({
      where: {
        isCart: true,
      },
      include: HotSauce,
    });
    const cart = order[0];
    res.send(cart);
    // }
  } catch (err) {
    next(err);
  }
});

router.post("/:orderId", async (req, res, next) => {
  try {
    const cart = await Order.findByPk(req.params.orderId);
    const orderItem = await OrderHotSauce.create({
      orderId: req.params.orderId,
      hotSauceId: req.body.hotSauceId,
      quantity: req.body.quantity,
    });
    const amount = cart.amount + req.body.price * req.body.quantity;
    await cart.update({ ...cart, amount });
    res.send(orderItem);
  } catch (error) {
    next(error);
  }
});

router.put("/checkout/:orderId", async (req, res, next) => {
  try {
    const cart = await Order.findByPk(req.params.orderId);

    const updatedCart = await cart.update(req.body);
    res.send(updatedCart);
  } catch (error) {
    next(error);
  }
});
