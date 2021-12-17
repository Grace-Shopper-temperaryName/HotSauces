const router = require("express").Router();
const {
  models: { Customer, Order },
} = require("../db");
const { requireToken, requireTokeninBody } = require("./middleware");
module.exports = router;

// mounted at /api/customers
router.get("/", requireToken, async (req, res, next) => {
  try {
    if (!!req.customer.isAdmin) {
      const customers = await Customer.findAll();
      res.json(customers);
    }
  } catch (err) {
    next(err);
  }
});

router.get("/:id", requireToken, async (req, res, next) => {
  try {
    if (!!req.customer.isAdmin) {
      const customer = await Customer.findByPk(req.params.id, {
        include: Order,
      });
      res.json(customer);
    }
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

router.put("/:id", requireTokeninBody, async (req, res, next) => {
  try {
    if (req.customer.id === Number(req.params.id)) {
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
      } = req.body.body;
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
    }
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", requireToken, async (req, res, next) => {
  try {
    if (req.customer) {
      const customer = await Customer.findByPk(req.params.id);
      await customer.destroy();
      res.json(customer);
    }
  } catch (error) {
    next(error);
  }
});
