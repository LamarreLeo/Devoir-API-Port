const express = require("express");
const router = express.Router();
const indexController = require("../controllers/viewController");
const viewAuthMiddleware = require("../middlewares/viewAuthMiddleware");

router.get("/", indexController.renderHomePage);
router.get("/unauthorized", indexController.renderUnauthorizedPage);

router.use(viewAuthMiddleware);

router.get("/dashboard", indexController.renderDashboardPage);

module.exports = router;
