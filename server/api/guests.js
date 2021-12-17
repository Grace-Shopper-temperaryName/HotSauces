const router = require("express").Router();
const {
  models: { Guest, Order },
} = require("../db");
module.exports = router;

// mounted at /api/guests
router.get("/", async (req, res, next) => {
  try {
    const guests = await Guest.findAll();
    res.send(guests);
  } catch (err) {
    console.error(err);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const guest = await Guest.create();
    res.json(guest);
  } catch (error) {
    next(error);
  }
});
