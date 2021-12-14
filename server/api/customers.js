const router = require("express").Router();
const {
  models: { Customer, Order },
} = require("../db");
module.exports = router;

const requireToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    console.log("REQ", req.headers);
    const customer = await Customer.findByToken(token);
    req.customer = customer;
    next();
  } catch (error) {
    next(error);
  }
};

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
    const customers = await Customer.create(req.body);
    res.json(customers);
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
