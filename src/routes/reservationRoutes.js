const express = require("express");
const router = express.Router();
const reservationController = require("../controllers/reservationController");
const reservationValidator = require("../validators/reservationValidator");
const authMiddleware = require("../middlewares/authMiddleware");

router.use(authMiddleware);

router.post(
    "/reservations",
    reservationValidator.createReservationValidator,
    reservationController.createReservation
);

router.get("/reservations", reservationController.getAllReservations);

module.exports = router;
