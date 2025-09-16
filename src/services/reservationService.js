/**
 * Service pour la gestion des réservations de catways.
 * @module services/reservationService
 * @requires ../models/reservationModel
 * @requires ../models/catwayModel
 */

const Reservation = require("../models/reservationModel");
const Catway = require("../models/catwayModel");

/**
 * Crée une nouvelle réservation pour un catway.
 * @async
 * @function createReservation
 * @param {Object} reservationData - Les données de la réservation.
 * @param {string} reservationData.clientName - Le nom du client.
 * @param {string} reservationData.boatName - Le nom du bateau.
 * @param {Date} reservationData.startDate - La date de début de la réservation.
 * @param {Date} reservationData.endDate - La date de fin de la réservation.
 * @param {number} catwayNumber - Le numéro du catway à réserver.
 * @returns {Promise<Object>} La réservation créée.
 * @throws {Error} Si le catway n'existe pas ou s'il est déjà réservé sur cette période.
 */
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

/**
 * Récupère toutes les réservations.
 * @async
 * @function getAllReservations
 * @returns {Promise<Array>} La liste de toutes les réservations.
 */
const getAllReservations = async () => {
    return await Reservation.find();
};

/**
 * Récupère une réservation par son ID et le numéro de catway.
 * @async
 * @function getReservationById
 * @param {number} catwayNumber - Le numéro du catway.
 * @param {string} reservationId - L'ID de la réservation.
 * @returns {Promise<Object>} La réservation trouvée.
 * @throws {Error} Si la réservation n'est pas trouvée.
 */
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

/**
 * Met à jour une réservation existante.
 * @async
 * @function updateReservation
 * @param {number} catwayNumber - Le numéro du catway.
 * @param {string} reservationId - L'ID de la réservation à mettre à jour.
 * @param {Object} updatedFields - Les champs à mettre à jour.
 * @param {string} [updatedFields.clientName] - Le nouveau nom du client (optionnel).
 * @param {string} [updatedFields.boatName] - Le nouveau nom du bateau (optionnel).
 * @param {Date} [updatedFields.startDate] - La nouvelle date de début (optionnel).
 * @param {Date} [updatedFields.endDate] - La nouvelle date de fin (optionnel).
 * @returns {Promise<Object>} La réservation mise à jour.
 * @throws {Error} Si la réservation n'est pas trouvée ou si les dates se chevauchent avec une autre réservation.
 */
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

/**
 * Supprime une réservation.
 * @async
 * @function deleteReservation
 * @param {number} catwayNumber - Le numéro du catway.
 * @param {string} reservationId - L'ID de la réservation à supprimer.
 * @returns {Promise<Object>} La réservation supprimée.
 * @throws {Error} Si la réservation n'est pas trouvée.
 */
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
