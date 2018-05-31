const router = require("express-promise-router")();

router.use(require("./auth"));
router.use(require("./admin"));
router.use(require("./device"));
router.use(require("./oauth"));

module.exports = router;
