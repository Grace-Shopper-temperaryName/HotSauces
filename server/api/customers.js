const router = require('express').Router();
const {
  models: { Customer },
} = require('../db');
module.exports = router;

router.get('/', async (req, res, next) => {
  try {
    const customers = await Customer.findAll({
      // explicitly select only the id and username fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ['id', 'email'],
    });
    res.json(customers);
  } catch (err) {
    next(err);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const customers = await Customer.create(req.body);
    res.json(customers);
    // res.status(201).send(await Customer.create(req.body));
  } catch (error) {
    next(error);
  }
});
