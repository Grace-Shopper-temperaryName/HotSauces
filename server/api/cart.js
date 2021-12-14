const router = require("express").Router();
const {
  models: { Customer, HotSauce },
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
