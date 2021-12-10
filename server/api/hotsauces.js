const router = require("express").Router();
const {
  models: { HotSauce },
} = require("../db");
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

router.post("/", async (req, res, next) => {
  try {
    const hotSauce = await HotSauce.create(req.body);
    res.json(hotSauce);
  } catch (error) {
    next(error);
  }
});

router.put("/:id", async (req, res, next) => {
  try {
    const hotSauce = await HotSauce.findByPk(req.params.id);
    await hotSauce.update(req.body);
    res.json(hotSauce);
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const hotSauce = await HotSauce.findByPk(req.params.id);
    await hotSauce.destroy();
    res.json(hotSauce);
  } catch (error) {
    next(error);
  }
});
