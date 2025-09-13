/**
 * Routes pour la gestion des utilisateurs.
 * @module routes/userRoutes
 * @requires express
 * @requires express.Router
 * @requires ../controllers/userController
 * @requires ../validators/userValidator
 * @requires ../middlewares/authMiddleware
 */

const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const userValidator = require("../validators/userValidator");
const authMiddleware = require("../middlewares/authMiddleware");

/**
 * Route pour se connecter
 * @name POST /login
 * @function
 * @memberof module:routes/userRoutes
 * @param {string} path - Chemin de la route
 * @param {Function[]} middlewares - Middlewares de validation et de contrôleur
 * @param {Function} userValidator.loginValidator - Valide les données de connexion
 * @param {Function} userController.userLogin - Gère la connexion de l'utilisateur
 */
router.post("/login", userValidator.loginValidator, userController.userLogin);

/**
 * Route pour se déconnecter
 * @name GET /logout
 * @function
 * @memberof module:routes/userRoutes
 * @param {string} path - Chemin de la route
 * @param {Function} userController.userLogout - Gère la déconnexion de l'utilisateur
 */
router.get("/logout", userController.userLogout);

// Middleware d'authentification pour les routes suivantes
router.use(authMiddleware);

/**
 * Route pour créer un nouvel utilisateur (réservée aux utilisateurs authentifiés)
 * @name POST /
 * @function
 * @memberof module:routes/userRoutes
 * @param {string} path - Chemin de la route
 * @param {Function[]} middlewares - Middlewares de validation et de contrôleur
 * @param {Function} userValidator.registerValidator - Valide les données d'inscription
 * @param {Function} userController.createUser - Gère la création d'un utilisateur
 */
router.post("/", userValidator.registerValidator, userController.createUser);

/**
 * Route pour récupérer tous les utilisateurs (réservée aux utilisateurs authentifiés)
 * @name GET /
 * @function
 * @memberof module:routes/userRoutes
 * @param {string} path - Chemin de la route
 * @param {Function} userController.getAllUsers - Récupère tous les utilisateurs
 */
router.get("/", userController.getAllUsers);

/**
 * Route pour récupérer un utilisateur par son email (réservée aux utilisateurs authentifiés)
 * @name GET /:email
 * @function
 * @memberof module:routes/userRoutes
 * @param {string} path - Chemin de la route avec paramètre email
 * @param {Function[]} middlewares - Middlewares de validation et de contrôleur
 * @param {Function} userValidator.getUserByEmailValidator - Valide l'email fourni
 * @param {Function} userController.getUserByEmail - Récupère un utilisateur par son email
 */
router.get(
    "/:email",
    userValidator.getUserByEmailValidator,
    userController.getUserByEmail
);

/**
 * Route pour mettre à jour un utilisateur par son email (réservée aux utilisateurs authentifiés)
 * @name PUT /:email
 * @function
 * @memberof module:routes/userRoutes
 * @param {string} path - Chemin de la route avec paramètre email
 * @param {Function[]} middlewares - Middlewares de validation et de contrôleur
 * @param {Function} userValidator.updateUserValidator - Valide les données de mise à jour
 * @param {Function} userController.updateUser - Met à jour un utilisateur
 */
router.put(
    "/:email",
    userValidator.updateUserValidator,
    userController.updateUser
);

/**
 * Route pour supprimer un utilisateur par son email (réservée aux utilisateurs authentifiés)
 * @name DELETE /:email
 * @function
 * @memberof module:routes/userRoutes
 * @param {string} path - Chemin de la route avec paramètre email
 * @param {Function[]} middlewares - Middlewares de validation et de contrôleur
 * @param {Function} userValidator.getUserByEmailValidator - Valide l'email fourni
 * @param {Function} userController.deleteUser - Supprime un utilisateur
 */
router.delete(
    "/:email",
    userValidator.getUserByEmailValidator,
    userController.deleteUser
);

/**
 * Module exportant le routeur configuré
 * @type {Router}
 */
module.exports = router;
