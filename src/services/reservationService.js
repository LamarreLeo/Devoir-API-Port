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

module.exports = {
    createReservation,
    getAllReservations,
    getReservationById,
};
