/**
 * Routes pour les vues de l'application web.
 * Gère le routage vers les différentes pages de l'interface utilisateur.
 * Certaines routes sont protégées par authentification.
 * @module routes/viewRoutes
 * @requires express
 * @requires express.Router
 * @requires ../controllers/viewController
 * @requires ../middlewares/viewAuthMiddleware
 */

const express = require("express");
const router = express.Router();
const indexController = require("../controllers/viewController");
const viewAuthMiddleware = require("../middlewares/viewAuthMiddleware");

// Routes accessibles sans authentification

/**
 * Route pour la page d'accueil
 * @name GET /
 * @function
 * @memberof module:routes/viewRoutes
 */
router.get("/", indexController.renderHomePage);

/**
 * Route pour la page d'erreur 401 (Non autorisé)
 * @name GET /unauthorized
 * @function
 * @memberof module:routes/viewRoutes
 */
router.get("/unauthorized", indexController.renderUnauthorizedPage);

// Middleware d'authentification pour les routes suivantes
router.use(viewAuthMiddleware);

// Routes protégées par authentification

/**
 * Route pour le tableau de bord
 * @name GET /dashboard
 * @function
 * @memberof module:routes/viewRoutes
 * @requires viewAuthMiddleware
 */
router.get("/dashboard", indexController.renderDashboardPage);

/**
 * Route pour la liste des catways
 * @name GET /catways
 * @function
 * @memberof module:routes/viewRoutes
 * @requires viewAuthMiddleware
 */
router.get("/catways", indexController.renderCatwaysPage);

/**
 * Route pour la liste des réservations
 * @name GET /reservations
 * @function
 * @memberof module:routes/viewRoutes
 * @requires viewAuthMiddleware
 */
router.get("/reservations", indexController.renderReservationsPage);

/**
 * Route pour la gestion des utilisateurs (admin)
 * @name GET /users
 * @function
 * @memberof module:routes/viewRoutes
 * @requires viewAuthMiddleware
 */
router.get("/users", indexController.renderUsersPage);

/**
 * Module exportant le routeur configuré
 * @type {Router}
 */
module.exports = router;
