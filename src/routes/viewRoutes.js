const express = require("express");
const router = express.Router();
const indexController = require("../controllers/viewController");
const authMiddleware = require("../middlewares/authMiddleware");

router.get("/", indexController.renderHomePage);
router.get("/unauthorized", indexController.renderUnauthorizedPage);

router.use(authMiddleware);

router.get("/dashboard", indexController.renderDashboardPage);

module.exports = router;
