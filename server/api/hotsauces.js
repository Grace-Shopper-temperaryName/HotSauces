const router = require('express').Router();
const {
  models: { HotSauce },
} = require('../db');
module.exports = router;

// mounted at /api/hotsauces
router.get('/', async (req, res, next) => {
  try {
    const hotSauces = await HotSauce.findAll();
    res.json(hotSauces);
  } catch (err) {
    next(err);
  }
});
