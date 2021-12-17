const router = require("express").Router();
module.exports = router;

router.use("/customers", require("./customers"));
router.use("/hotsauces", require("./hotsauces"));
router.use("/cart", require("./cart"));
router.use("/guests", require("./guests"));
router.use("/orders", require("./orders"));

router.use((req, res, next) => {
  const error = new Error("Not Found");
  error.status = 404;
  next(error);
});
