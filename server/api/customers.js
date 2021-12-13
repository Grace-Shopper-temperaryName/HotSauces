const router = require("express").Router();
const {
  models: { Customer, Order },
} = require("../db");
module.exports = router;

// mounted at /api/customers
router.get("/", async (req, res, next) => {
  try {
    const customers = await Customer.findAll();
    res.json(customers);
  } catch (err) {
    next(err);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const customer = await Customer.findByPk(req.params.id, { include: Order });
    res.json(customer);
  } catch (error) {
    next(error);
  }
});

router.put("/:id", async (req, res, next) => {
  try {
    const customer = await Customer.findByPk(req.params.id);
    await customer.update(req.body);
    res.json(customer);
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const customer = await Customer.findByPk(req.params.id);
    await customer.destroy();
    res.json(customer);
  } catch (error) {
    next(error);
  }
});
