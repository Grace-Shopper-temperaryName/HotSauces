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
      const orders = await customer.getOrders({
        where: {
          isCart: true,
        },
        include: HotSauce,
      });
      const cart = orders[0];
      if (cart) {
        res.send(cart);
      }
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
          hotSauceId: req.body.hotSauceId,
          quantity: req.body.quantity,
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
    if (req.customer.id === Number(req.body.customerId)) {
      const orderItem = await OrderHotSauce.findOne({
        where: {
          orderId: req.params.orderId,
          hotSauceId: req.body.hotSauceId,
        },
      });

      const newQuantity = orderItem.quantity + 1;

      const { dataValues: hotSauce } = await HotSauce.findByPk(
        orderItem.hotSauceId
      );

      await orderItem.update({
        quantity: newQuantity,
      });
      const amount = hotSauce.price;
      res.send({ amount });
    }
  } catch (error) {
    next(error);
  }
});

router.put("/:orderId/subtract", requireTokeninBody, async (req, res, next) => {
  try {
    if (req.customer.id === Number(req.body.customerId)) {
      const orderItem = await OrderHotSauce.findOne({
        where: {
          orderId: req.params.orderId,
          hotSauceId: req.body.hotSauceId,
        },
      });

      const newQuantity = orderItem.quantity - 1;

      if (newQuantity <= 0) {
        res.send(null);
      } else {
        const { dataValues: hotSauce } = await HotSauce.findByPk(
          orderItem.hotSauceId
        );

        await orderItem.update({
          quantity: newQuantity,
        });
        const amount = hotSauce.price;
        res.send({ amount });
      }
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
        const orderItem = await OrderHotSauce.findOne({
          where: {
            orderId: req.params.orderId,
            hotSauceId: req.params.hotSauceId,
          },
        });

        const { dataValues: hotSauce } = await HotSauce.findByPk(
          orderItem.hotSauceId
        );
        const amount = orderItem.quantity * hotSauce.price;

        await orderItem.destroy();
        res.send({ amount });
      }
    } catch (error) {
      next(error);
    }
  }
);
