const router = require("express").Router();
const {
  models: { Customer, HotSauce, Order, OrderHotSauce },
} = require("../db");
const requireToken = require("./middleware");
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
    res.send(order[0]);
    // }
  } catch (err) {
    next(err);
  }
});

router.post("/:orderId", async (req, res, next) => {
  try {
    const orderItem = await OrderHotSauce.create({
      orderId: req.params.orderId,
      hotSauceId: req.body.hotSauceId,
      quantity: req.body.quantity,
    });
    res.send(orderItem);
  } catch (error) {
    next(error);
  }
});

router.put("/:orderId/add", async (req, res, next) => {
  try {
    const orderItem = await OrderHotSauce.findByPk(req.params.orderId, {
      where: {
        hotSauceId: req.body.hotSauceId,
      },
    });
    const newQuantity = orderItem.quantity + 1;
    await orderItem.update({
      orderId: req.params.orderId,
      hotSauceId: req.body.hotSauceId,
      quantity: newQuantity,
    });
    res.send(orderItem);
  } catch (error) {
    next(error);
  }
});

router.put("/:orderId/subtract", async (req, res, next) => {
  try {
    const orderItem = await OrderHotSauce.findByPk(req.params.orderId, {
      where: {
        hotSauceId: req.body.hotSauceId,
      },
    });
    const newQuantity = orderItem.quantity - 1;
    await orderItem.update({
      orderId: req.params.orderId,
      hotSauceId: req.body.hotSauceId,
      quantity: newQuantity,
    });
    res.send(orderItem);
  } catch (error) {
    next(error);
  }
});

router.delete("/:orderId/:hotSauceId", async (req, res, next) => {
  try {
    const orderItem = await OrderHotSauce.findByPk(req.params.orderId, {
      where: {
        hotSauceId: req.params.hotSauceId,
      },
    });
    await orderItem.destroy();
    res.send(orderItem);
  } catch (error) {
    next(error);
  }
});
