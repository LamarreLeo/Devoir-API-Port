const Reservation = require("../models/reservationModel");
const Catway = require("../models/catwayModel");

const createReservation = async (reservationData, catwayNumber) => {
    const catway = await Catway.findOne({ catwayNumber });
    if (!catway) {
        throw new Error("Catway non trouvé");
    }

    const overlappingReservation = await Reservation.findOne({
        catwayNumber,
        startDate: { $lt: reservationData.endDate },
        endDate: { $gt: reservationData.startDate },
    });

    if (overlappingReservation) {
        throw new Error("Ce catway est déjà réservé sur ces dates");
    }

    const reservation = new Reservation({ ...reservationData, catwayNumber });
    return await reservation.save();
};

const getAllReservations = async () => {
    return await Reservation.find();
};

const getReservationById = async (catwayNumber, reservationId) => {
    const reservation = await Reservation.findOne({
        _id: reservationId,
        catwayNumber: catwayNumber,
    });

    if (!reservation) {
        throw new Error("Réservation non trouvée");
    }

    return reservation;
};

const updateReservation = async (
    catwayNumber,
    reservationId,
    updatedFields
) => {
    const reservation = await Reservation.findOne({
        _id: reservationId,
        catwayNumber: catwayNumber,
    });

    if (!reservation) {
        throw new Error("Réservation non trouvée");
    }

    const newStartDate = updatedFields.startDate || reservation.startDate;
    const newEndDate = updatedFields.endDate || reservation.endDate;

    if (newEndDate < newStartDate) {
        throw new Error(
            "La date de fin doit être supérieure à la date de début"
        );
    }

    const overlappingReservation = await Reservation.findOne({
        _id: { $ne: reservationId },
        catwayNumber,
        startDate: { $lt: newEndDate },
        endDate: { $gt: newStartDate },
    });

    if (overlappingReservation) {
        throw new Error("Ce catway est déjà réservé sur ces dates");
    }

    reservation.set(updatedFields);
    return await reservation.save();
};

const deleteReservation = async (catwayNumber, reservationId) => {
    const reservation = await Reservation.findOneAndDelete({
        _id: reservationId,
        catwayNumber: catwayNumber,
    });

    if (!reservation) {
        throw new Error("Réservation non trouvée");
    }

    return reservation;
};

module.exports = {
    createReservation,
    getAllReservations,
    getReservationById,
    updateReservation,
    deleteReservation,
};
