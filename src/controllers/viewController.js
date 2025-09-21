/**
 * Contrôleur pour la gestion des vues de l'application web.
 * @module controllers/viewController
 * @requires ../models/reservationModel
 * @requires ../services/catwayService
 * @requires ../services/userService
 */

const Reservation = require("../models/reservationModel");
const catwayService = require("../services/catwayService");
const userService = require("../services/userService");

/**
 * Affiche la page d'accueil.
 * @function renderHomePage
 * @param {Object} req - La requête Express.
 * @param {Object} res - La réponse Express.
 * @returns {void}
 */
const renderHomePage = (req, res) => {
    res.render("index", { title: "Accueil - API Port" });
};

/**
 * Affiche la page d'erreur 401 (Non autorisé).
 * @function renderUnauthorizedPage
 * @param {Object} req - La requête Express.
 * @param {Object} res - La réponse Express.
 * @returns {void}
 */
const renderUnauthorizedPage = (req, res) => {
    res.render("unauthorized", { title: "401 - Unauthorized" });
};

/**
 * Affiche le tableau de bord avec la liste des réservations.
 * @async
 * @function renderDashboardPage
 * @param {Object} req - La requête Express.
 * @param {Object} req.session - La session utilisateur.
 * @param {Object} res - La réponse Express.
 * @returns {Promise<void>}
 * @throws {Error} Si une erreur survient lors de la récupération des réservations.
 */
const renderDashboardPage = async (req, res) => {
    try {
        const reservations = await Reservation.find().sort({ startDate: 1 });
        res.render("dashboard", {
            title: "Dashboard - API Port",
            user: req.session.user,
            formattedDate: new Date().toLocaleDateString("fr-FR"),
            reservations,
        });
    } catch (error) {
        console.error("Error fetching reservations:", error);
        res.status(500).render({
            title: "500 - Internal Server Error",
            error: "Une erreur est survenue lors de la récupération des réservations.",
        });
    }
};

/**
 * Affiche la page des catways disponibles.
 * @async
 * @function renderCatwaysPage
 * @param {Object} req - La requête Express.
 * @param {Object} req.session - La session utilisateur.
 * @param {Object} res - La réponse Express.
 * @returns {Promise<void>}
 * @throws {Error} Si une erreur survient lors de la récupération des catways.
 */
const renderCatwaysPage = async (req, res) => {
    try {
        const catways = await catwayService.getAllCatways();
        res.render("catways", {
            title: "Catways - API Port",
            user: req.session.user,
            catways,
        });
    } catch (error) {
        console.error(error);
        res.status(500).send({
            title: "500 - Internal Server Error",
            error: "Une erreur est survenue lors de la récupération des catways.",
        });
    }
};

/**
 * Affiche la page des réservations.
 * @async
 * @function renderReservationsPage
 * @param {Object} req - La requête Express.
 * @param {Object} req.session - La session utilisateur.
 * @param {Object} res - La réponse Express.
 * @returns {Promise<void>}
 * @throws {Error} Si une erreur survient lors de la récupération des réservations.
 */
const renderReservationsPage = async (req, res) => {
    try {
        const reservations = await Reservation.find().sort({ startDate: 1 });
        res.render("reservations", {
            title: "Reservations - API Port",
            user: req.session.user,
            reservations,
        });
    } catch (error) {
        console.error("Error fetching reservations:", error);
        res.status(500).render({
            title: "500 - Internal Server Error",
            error: "Une erreur est survenue lors de la récupération des réservations.",
        });
    }
};

/**
 * Affiche la page de gestion des utilisateurs (réservée aux administrateurs).
 * @async
 * @function renderUsersPage
 * @param {Object} req - La requête Express.
 * @param {Object} req.session - La session utilisateur.
 * @param {Object} res - La réponse Express.
 * @returns {Promise<void>}
 * @throws {Error} Si une erreur survient lors de la récupération des utilisateurs.
 */
const renderUsersPage = async (req, res) => {
    try {
        const users = await userService.getAllUsers();
        res.render("users", {
            title: "Users - API Port",
            user: req.session.user,
            users,
        });
    } catch (error) {
        console.error(error);
        res.status(500).send({
            title: "500 - Internal Server Error",
            error: "Une erreur est survenue lors de la récupération des utilisateurs.",
        });
    }
};

module.exports = {
    renderHomePage,
    renderUnauthorizedPage,
    renderDashboardPage,
    renderCatwaysPage,
    renderReservationsPage,
    renderUsersPage,
};
