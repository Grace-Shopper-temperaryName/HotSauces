const router = require("express").Router();
const {
  models: { Customer, Order },
} = require("../db");
const requireToken = require("./middleware");
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

router.post("/", async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const customer = await Customer.create({ email, password });
    res.json(customer);
  } catch (error) {
    next(error);
  }
});

router.put("/:id", async (req, res, next) => {
  try {
    const {
      firstname,
      lastName,
      phone,
      email,
      password,
      streetAddress,
      city,
      state,
      zip,
    } = req.body;
    const customer = await Customer.findByPk(req.params.id);
    await customer.update({
      firstname,
      lastName,
      phone,
      email,
      password,
      streetAddress,
      city,
      state,
      zip,
    });
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
