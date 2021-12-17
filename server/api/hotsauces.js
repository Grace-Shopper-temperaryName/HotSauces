const router = require("express").Router();
const {
  models: { HotSauce },
} = require("../db");
const { requireToken, requireTokeninBody } = require("./middleware");
module.exports = router;

// mounted at /api/hotsauces
router.get("/", async (req, res, next) => {
  try {
    const hotSauces = await HotSauce.findAll();
    res.json(hotSauces);
  } catch (err) {
    next(err);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const hotSauce = await HotSauce.findByPk(req.params.id);
    res.json(hotSauce);
  } catch (error) {
    next(error);
  }
});

router.post("/", requireTokeninBody, async (req, res, next) => {
  try {
    if (!!req.customer.isAdmin) {
      const hotSauce = await HotSauce.create(req.body.body);
      res.json(hotSauce);
    }
  } catch (error) {
    next(error);
  }
});

router.put("/:id", requireTokeninBody, async (req, res, next) => {
  try {
    if (!!req.customer.isAdmin) {
      const hotSauce = await HotSauce.findByPk(req.params.id);
      await hotSauce.update(req.body.body);
      res.json(hotSauce);
    }
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", requireToken, async (req, res, next) => {
  try {
    if (!!req.customer.isAdmin) {
      const hotSauce = await HotSauce.findByPk(req.params.id);
      await hotSauce.destroy();
      res.json(hotSauce);
    }
  } catch (error) {
    next(error);
  }
});
