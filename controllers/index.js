const routes = require("express").Router();
const api = require("./api");
const homeRoutes = require("./home-Routes")

router.use("/", home-Routes);
router.use("/api", apiRoutes);

module.exports = router;