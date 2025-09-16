const express = require("express");
const router = express.Router({ mergeParams: true });
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

router.get(
    "/reservations/:idReservation",
    reservationValidator.getReservationByIdValidator,
    reservationController.getReservationById
);

module.exports = router;
