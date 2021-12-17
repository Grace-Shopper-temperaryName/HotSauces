const router = require("express").Router();
const {
  models: { Customer, HotSauce, OrderHotSauce, Order },
} = require("../db");
const { requireToken, requireTokeninBody } = require("./middleware");
module.exports = router;

// mounted on /api/cart
router.get("/:customerId", requireToken, async (req, res, next) => {
  try {
    if (req.customer.id === Number(req.params.customerId)) {
      const customer = await Customer.findByPk(req.params.customerId);
      const order = await customer.getOrders({
        where: {
          isCart: true,
        },
        include: HotSauce,
      });
      res.send(order[0]);
    }
  } catch (err) {
    next(err);
  }
});

router.post(
  "/:customerId/:orderId",
  requireTokeninBody,
  async (req, res, next) => {
    try {
      if (req.customer.id === Number(req.params.customerId)) {
        const orderItem = await OrderHotSauce.create({
          orderId: req.params.orderId,
          hotSauceId: req.body.body.hotSauceId,
          quantity: req.body.body.quantity,
        });
        res.send(orderItem);
      }
    } catch (error) {
      next(error);
    }
  }
);

router.put("/:orderId/add", requireTokeninBody, async (req, res, next) => {
  try {
    if (req.customer.id === Number(req.body.body.customerId)) {
      const orderItem = await OrderHotSauce.findByPk(req.params.orderId, {
        where: {
          hotSauceId: req.body.body.hotSauceId,
        },
      });
      const newQuantity = orderItem.quantity + 1;
      await orderItem.update({
        orderId: req.params.orderId,
        hotSauceId: req.body.body.hotSauceId,
        quantity: newQuantity,
      });
      res.send(orderItem);
    }
  } catch (error) {
    next(error);
  }
});

router.put("/:orderId/subtract", requireTokeninBody, async (req, res, next) => {
  try {
    if (req.customer.id === Number(req.body.body.customerId)) {
      const orderItem = await OrderHotSauce.findByPk(req.params.orderId, {
        where: {
          hotSauceId: req.body.body.hotSauceId,
        },
      });
      const newQuantity = orderItem.quantity - 1;
      await orderItem.update({
        orderId: req.params.orderId,
        hotSauceId: req.body.body.hotSauceId,
        quantity: newQuantity,
      });
      res.send(orderItem);
    }
  } catch (error) {
    next(error);
  }
});

router.delete(
  "/:customerId/:orderId/:hotSauceId",
  requireToken,
  async (req, res, next) => {
    try {
      if (req.customer.id === Number(req.params.customerId)) {
        const orderItem = await OrderHotSauce.findByPk(req.params.orderId, {
          where: {
            hotSauceId: req.params.hotSauceId,
          },
        });
        await orderItem.destroy();
        res.send(orderItem);
      }
    } catch (error) {
      next(error);
    }
  }
);
