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

const getReservationById = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const catwayNumber = Number(req.params.id);
    const reservationId = req.params.idReservation;

    try {
        const reservation = await reservationService.getReservationById(
            catwayNumber,
            reservationId
        );
        return res.status(200).json(reservation);
    } catch (error) {
        if (error.message === "Réservation non trouvée") {
            return res.status(404).json({ message: error.message });
        }
        console.error(error);
        return res.status(500).json({ message: error.message });
    }
};

const updateReservation = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const catwayNumber = Number(req.params.id);
    const reservationId = req.params.idReservation;
    const updatedFields = req.body;

    try {
        const updatedReservation = await reservationService.updateReservation(
            catwayNumber,
            reservationId,
            updatedFields
        );
        return res.status(200).json(updatedReservation);
    } catch (error) {
        if (error.message === "Réservation non trouvée") {
            return res.status(404).json({ message: error.message });
        }
        if (error.message === "Ce catway est déjà réservé sur ces dates") {
            return res.status(409).json({ message: error.message });
        }
        if (
            error.message ===
            "La date de fin doit être supérieure à la date de début"
        ) {
            return res.status(400).json({ message: error.message });
        }
        console.error(error);
        return res.status(500).json({ message: error.message });
    }
};

const deleteReservation = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const catwayNumber = Number(req.params.id);
    const reservationId = req.params.idReservation;

    try {
        const deletedReservation = await reservationService.deleteReservation(
            catwayNumber,
            reservationId
        );
        return res.status(200).json({
            message: "Réservation supprimée avec succès",
            reservation: deletedReservation,
        });
    } catch (error) {
        if (error.message === "Réservation non trouvée") {
            return res.status(404).json({ message: error.message });
        }
        console.error(error);
        return res.status(500).json({ message: error.message });
    }
};

module.exports = {
    createReservation,
    getAllReservations,
    getReservationById,
    updateReservation,
    deleteReservation,
};
