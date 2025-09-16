/**
 * Routes pour la gestion des réservations de catways.
 * Toutes les routes nécessitent une authentification.
 * @module routes/reservationRoutes
 * @requires express
 * @requires express.Router
 * @requires ../controllers/reservationController
 * @requires ../validators/reservationValidator
 * @requires ../middlewares/authMiddleware
 */

const express = require("express");
const router = express.Router({ mergeParams: true });
const reservationController = require("../controllers/reservationController");
const reservationValidator = require("../validators/reservationValidator");
const authMiddleware = require("../middlewares/authMiddleware");

// Middleware d'authentification pour toutes les routes
router.use(authMiddleware);

/**
 * Route pour créer une nouvelle réservation
 * @name POST /reservations
 * @function
 * @memberof module:routes/reservationRoutes
 * @param {string} path - Chemin de la route
 * @param {Function[]} middlewares - Middlewares de validation et contrôleur
 * @param {Function} reservationValidator.createReservationValidator - Valide les données de la réservation
 * @param {Function} reservationController.createReservation - Crée une nouvelle réservation
 */
router.post(
    "/reservations",
    reservationValidator.createReservationValidator,
    reservationController.createReservation
);

/**
 * Route pour récupérer toutes les réservations
 * @name GET /reservations
 * @function
 * @memberof module:routes/reservationRoutes
 * @param {string} path - Chemin de la route
 * @param {Function} reservationController.getAllReservations - Récupère toutes les réservations
 */
router.get("/reservations", reservationController.getAllReservations);

/**
 * Route pour récupérer une réservation par son ID
 * @name GET /reservations/:idReservation
 * @function
 * @memberof module:routes/reservationRoutes
 * @param {string} path - Chemin de la route avec paramètre d'ID
 * @param {Function[]} middlewares - Middlewares de validation et contrôleur
 * @param {Function} reservationValidator.getReservationByIdValidator - Valide l'ID de la réservation
 * @param {Function} reservationController.getReservationById - Récupère une réservation par son ID
 */
router.get(
    "/reservations/:idReservation",
    reservationValidator.getReservationByIdValidator,
    reservationController.getReservationById
);

/**
 * Route pour mettre à jour une réservation existante
 * @name PUT /reservations/:idReservation
 * @function
 * @memberof module:routes/reservationRoutes
 * @param {string} path - Chemin de la route avec paramètre d'ID
 * @param {Function[]} middlewares - Middlewares de validation et contrôleur
 * @param {Function} reservationValidator.updateReservationValidator - Valide les données de mise à jour
 * @param {Function} reservationController.updateReservation - Met à jour une réservation
 */
router.put(
    "/reservations/:idReservation",
    reservationValidator.updateReservationValidator,
    reservationController.updateReservation
);

/**
 * Route pour supprimer une réservation
 * @name DELETE /reservations/:idReservation
 * @function
 * @memberof module:routes/reservationRoutes
 * @param {string} path - Chemin de la route avec paramètre d'ID
 * @param {Function[]} middlewares - Middlewares de validation et contrôleur
 * @param {Function} reservationValidator.deleteReservationValidator - Valide l'ID de la réservation
 * @param {Function} reservationController.deleteReservation - Supprime une réservation
 */
router.delete(
    "/reservations/:idReservation",
    reservationValidator.deleteReservationValidator,
    reservationController.deleteReservation
);

/**
 * Module exportant le routeur configuré
 * @type {Router}
 */
module.exports = router;
