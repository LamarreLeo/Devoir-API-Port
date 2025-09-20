/**
 * Contrôleur pour la gestion des réservations de catways.
 * @module controllers/reservationController
 * @requires express-validator
 * @requires ../services/reservationService
 */

const { validationResult } = require("express-validator");
const reservationService = require("../services/reservationService");

/**
 * Crée une nouvelle réservation pour un catway.
 * @async
 * @function createReservation
 * @param {Object} req - La requête Express.
 * @param {Object} req.params - Les paramètres de la requête.
 * @param {string} req.params.id - L'ID du catway.
 * @param {Object} req.body - Le corps de la requête contenant les données de la réservation.
 * @param {string} req.body.clientName - Le nom du client.
 * @param {string} req.body.boatName - Le nom du bateau.
 * @param {string} req.body.startDate - La date de début de la réservation (format ISO).
 * @param {string} req.body.endDate - La date de fin de la réservation (format ISO).
 * @param {Object} res - La réponse Express.
 * @returns {Promise<Object>} Réponse JSON avec la réservation créée ou un message d'erreur.
 */
const createReservation = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const catwayNumber = Number(req.params.id);

    try {
        await reservationService.createReservation(req.body, catwayNumber);
        return res.status(201).redirect("/reservations");
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

/**
 * Récupère toutes les réservations.
 * @async
 * @function getAllReservations
 * @param {Object} req - La requête Express.
 * @param {Object} res - La réponse Express.
 * @returns {Promise<Object>} Réponse JSON avec la liste des réservations ou un message d'erreur.
 */
const getAllReservations = async (req, res) => {
    try {
        const reservations = await reservationService.getAllReservations();
        return res.status(200).json(reservations);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: error.message });
    }
};

/**
 * Récupère une réservation par son ID et le numéro de catway.
 * @async
 * @function getReservationById
 * @param {Object} req - La requête Express.
 * @param {Object} req.params - Les paramètres de la requête.
 * @param {string} req.params.id - Le numéro du catway.
 * @param {string} req.params.idReservation - L'ID de la réservation.
 * @param {Object} res - La réponse Express.
 * @returns {Promise<Object>} Réponse JSON avec la réservation ou un message d'erreur.
 */
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

/**
 * Met à jour une réservation existante.
 * @async
 * @function updateReservation
 * @param {Object} req - La requête Express.
 * @param {Object} req.params - Les paramètres de la requête.
 * @param {string} req.params.id - Le numéro du catway.
 * @param {string} req.params.idReservation - L'ID de la réservation à mettre à jour.
 * @param {Object} req.body - Les champs à mettre à jour.
 * @param {string} [req.body.clientName] - Le nouveau nom du client (optionnel).
 * @param {string} [req.body.boatName] - Le nouveau nom du bateau (optionnel).
 * @param {string} [req.body.startDate] - La nouvelle date de début (optionnel, format ISO).
 * @param {string} [req.body.endDate] - La nouvelle date de fin (optionnel, format ISO).
 * @param {Object} res - La réponse Express.
 * @returns {Promise<Object>} Réponse JSON avec la réservation mise à jour ou un message d'erreur.
 */
const updateReservation = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const catwayNumber = Number(req.params.id);
    const reservationId = req.params.idReservation;
    const updatedFields = req.body;

    try {
        await reservationService.updateReservation(
            catwayNumber,
            reservationId,
            updatedFields
        );
        return res.status(200).redirect("/reservations");
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

/**
 * Supprime une réservation.
 * @async
 * @function deleteReservation
 * @param {Object} req - La requête Express.
 * @param {Object} req.params - Les paramètres de la requête.
 * @param {string} req.params.id - Le numéro du catway.
 * @param {string} req.params.idReservation - L'ID de la réservation à supprimer.
 * @param {Object} res - La réponse Express.
 * @returns {Promise<Object>} Réponse JSON avec un message de succès ou d'erreur.
 */
const deleteReservation = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const catwayNumber = Number(req.params.id);
    const reservationId = req.params.idReservation;

    try {
        await reservationService.deleteReservation(catwayNumber, reservationId);
        return res.status(200).redirect("/reservations");
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
