const express = require("express");
const router = express.Router();
const indexController = require("../controllers/viewController");
const viewAuthMiddleware = require("../middlewares/viewAuthMiddleware");

router.get("/", indexController.renderHomePage);
router.get("/unauthorized", indexController.renderUnauthorizedPage);

router.use(viewAuthMiddleware);

router.get("/dashboard", indexController.renderDashboardPage);
router.get("/catways", indexController.renderCatwaysPage);
router.get("/reservations", indexController.renderReservationsPage);
router.get("/users", indexController.renderUsersPage);

module.exports = router;
