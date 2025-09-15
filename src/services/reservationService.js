const Reservation = require("../models/reservationModel");
const Catway = require("../models/catwayModel");

const createReservation = async (reservationData) => {
    const catway = await Catway.findOne({
        catwayNumber: reservationData.catwayNumber,
    });
    if (!catway) {
        throw new Error("Catway non trouvé");
    }

    const overlappingReservation = await Reservation.findOne({
        catwayNumber: reservationData.catwayNumber,
        startDate: { $lt: reservationData.endDate },
        endDate: { $gt: reservationData.startDate },
    });

    if (overlappingReservation) {
        throw new Error("Ce catway est déjà réservé sur ces dates");
    }

    const reservation = new Reservation(reservationData);
    return await reservation.save();
};

const getAllReservations = async () => {
    return await Reservation.find();
};

module.exports = {
    createReservation,
    getAllReservations,
};
