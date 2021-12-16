const router = require("express").Router();
const { createDispatchHook } = require("react-redux");
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
    // const cart = await Order.findByPk(req.params.orderId);
    // const hotSauce = await HotSauce.findByPk(req.body.hotSauceId);
    const orderItem = await OrderHotSauce.create({
      orderId: req.params.orderId,
      hotSauceId: req.body.hotSauceId,
      quantity: req.body.quantity,
    });
    // newItem.quantity = req.body.quantity;
    res.send(orderItem);
  } catch (error) {
    next(error);
  }
});

router.put("/total/:orderId", async (req, res, next) => {
  try {
    const cart = await Order.findByPk(req.params.orderId);

    const updatedCart = await cart.update(req.body);
    res.send(updatedCart);
  } catch (error) {
    next(error);
  }
});

// router.put("/:customerId", async (req, res, next) => {
//   try {
//     // if (req.params.customerId === req.customer.id) {
//     const customer = await Customer.findByPk(req.params.customerId);
//     const cart = await customer.getOrders({
//       where: {
//         isCart: true,
//       },
//       include: HotSauce,
//     });
//     const hotSauce = await HotSauce.findByPk(req.body.hotSauceId);
//     console.log(Object.keys(Order.prototype));
//     await cart.addHotSauce(hotSauce);
//     // newItem.quantity = req.body.quantity;
//     res.send(cart);
//     // }
//   } catch (err) {
//     next(err);
//   }
// });
