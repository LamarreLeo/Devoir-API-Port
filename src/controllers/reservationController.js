const { validationResult } = require("express-validator");
const reservationService = require("../services/reservationService");

const createReservation = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const catwayNumber = Number(req.params.id);

    try {
        const reservation = await reservationService.createReservation(
            req.body,
            catwayNumber
        );
        return res.status(201).json(reservation);
    } catch (error) {
        if (error.message === "Catway non trouvé") {
            return res.status(404).json({ message: error.message });
        }
        if (error.message === "Ce catway est déjà réservé sur ces dates") {
            return res.status(409).json({ message: error.message });
        }
        return res.status(500).json({ message: error.message });
    }
};

const getAllReservations = async (req, res) => {
    try {
        const reservations = await reservationService.getAllReservations();
        return res.status(200).json(reservations);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: error.message });
    }
};

module.exports = {
    createReservation,
    getAllReservations,
};
