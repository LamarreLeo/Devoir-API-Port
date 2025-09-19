/**
 * Contrôleur pour la gestion des utilisateurs.
 * @module controllers/userController
 * @requires express-validator
 * @requires ../services/userService
 */

const { validationResult } = require("express-validator");
const userService = require("../services/userService");

/**
 * Crée un nouvel utilisateur.
 * @async
 * @function createUser
 * @param {Object} req - La requête Express.
 * @param {Object} req.body - Le corps de la requête.
 * @param {string} req.body.username - Le nom d'utilisateur.
 * @param {string} req.body.email - L'email de l'utilisateur.
 * @param {string} req.body.password - Le mot de passe en clair.
 * @param {Object} res - La réponse Express.
 * @returns {Promise<Object>} Réponse JSON avec l'utilisateur créé ou un message d'erreur.
 */
const createUser = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const userData = req.body;
        const newUser = await userService.createUser(userData);
        return res.status(201).json(newUser);
    } catch (err) {
        console.error(err);
        if (err.statusCode === 409) {
            return res.status(409).json({ message: err.message });
        }
        return res
            .status(500)
            .json({ message: "Erreur lors de la création de l'utilisateur" });
    }
};

/**
 * Récupère tous les utilisateurs.
 * @async
 * @function getAllUsers
 * @param {Object} req - La requête Express.
 * @param {Object} res - La réponse Express.
 * @returns {Promise<Object>} Réponse JSON avec la liste des utilisateurs ou un message d'erreur.
 */
const getAllUsers = async (req, res) => {
    try {
        const userData = await userService.getAllUsers();
        return res.status(200).json(userData);
    } catch (err) {
        console.error(err);
        return res.status(500).json({
            message: "Erreur lors de la récupération des utilisateurs",
        });
    }
};

/**
 * Récupère un utilisateur par son email.
 * @async
 * @function getUserByEmail
 * @param {Object} req - La requête Express.
 * @param {Object} req.params - Les paramètres de la requête.
 * @param {string} req.params.email - L'email de l'utilisateur à récupérer.
 * @param {Object} res - La réponse Express.
 * @returns {Promise<Object>} Réponse JSON avec l'utilisateur ou un message d'erreur.
 */
const getUserByEmail = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const email = req.params.email;
        const userData = await userService.getUserByEmail(email);
        if (!userData) {
            return res.status(404).json({ message: "Utilisateur non trouvé" });
        }

        return res.status(200).json(userData);
    } catch (err) {
        console.error(err);
        return res.status(500).json({
            message: "Erreur lors de la récupération de l'utilisateur",
        });
    }
};

/**
 * Met à jour un utilisateur existant.
 * @async
 * @function updateUser
 * @param {Object} req - La requête Express.
 * @param {Object} req.params - Les paramètres de la requête.
 * @param {string} req.params.email - L'email de l'utilisateur à mettre à jour.
 * @param {Object} req.body - Les données à mettre à jour.
 * @param {string} [req.body.username] - Le nouveau nom d'utilisateur (optionnel).
 * @param {string} [req.body.email] - Le nouvel email (optionnel).
 * @param {string} [req.body.password] - Le nouveau mot de passe (optionnel).
 * @param {Object} res - La réponse Express.
 * @returns {Promise<Object>} Réponse JSON avec l'utilisateur mis à jour ou un message d'erreur.
 */
const updateUser = async (req, res) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
        return res.status(400).json({ errors: error.array() });
    }

    try {
        const email = req.params.email;
        const updateData = req.body;
        const updatedUser = await userService.updateUser(email, updateData);
        return res.status(200).json(updatedUser);
    } catch (err) {
        if (err.statusCode === 404) {
            return res.status(404).json({ message: err.message });
        } else if (err.statusCode === 409) {
            return res.status(409).json({ message: err.message });
        }
        return res.status(500).json({
            message: "Erreur lors de la mise à jour de l'utilisateur",
        });
    }
};

/**
 * Supprime un utilisateur par son email.
 * @async
 * @function deleteUser
 * @param {Object} req - La requête Express.
 * @param {Object} req.params - Les paramètres de la requête.
 * @param {string} req.params.email - L'email de l'utilisateur à supprimer.
 * @param {Object} res - La réponse Express.
 * @returns {Promise<Object>} Réponse JSON avec l'utilisateur supprimé ou un message d'erreur.
 */
const deleteUser = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const email = req.params.email;
        const deletedUser = await userService.deleteUser(email);
        if (!deletedUser) {
            return res.status(404).json({ message: "Utilisateur non trouvé" });
        }

        return res.status(200).json(deletedUser);
    } catch (err) {
        console.error(err);
        return res.status(500).json({
            message: "Erreur lors de la suppression de l'utilisateur",
        });
    }
};

/**
 * Authentifie un utilisateur.
 * @async
 * @function userLogin
 * @param {Object} req - La requête Express.
 * @param {Object} req.body - Le corps de la requête.
 * @param {string} req.body.email - L'email de l'utilisateur.
 * @param {string} req.body.password - Le mot de passe en clair.
 * @param {Object} res - La réponse Express.
 * @returns {Promise<Object>} Réponse JSON avec l'utilisateur authentifié ou un message d'erreur.
 */
const userLogin = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    try {
        const user = await userService.userLogin(email, password);
        req.session.user = user;

        return res.status(200), res.redirect("/dashboard");
    } catch (err) {
        if (err.message === "Email ou mot de passe incorrect") {
            return res.status(401).json({ message: err.message });
        }
        console.error(err);
        return res.status(500).json({
            message: "Erreur lors de la connexion",
        });
    }
};

/**
 * Déconnecte un utilisateur.
 * @async
 * @function userLogout
 * @param {Object} req - La requête Express.
 * @param {Object} res - La réponse Express.
 * @returns {Promise<Object>} Réponse JSON avec un message de succès ou d'erreur.
 */
const userLogout = async (req, res) => {
    try {
        if (req.session.user) {
            req.session.destroy((err) => {
                if (err) {
                    console.error(err);
                    return res.status(500).json({
                        message: "Erreur lors de la déconnexion",
                    });
                }
                res.clearCookie("connect.sid");
                return res.status(200), res.redirect("/");
            });
        } else {
            return res
                .status(400)
                .json({ message: "Utilisateur non connecté" });
        }
    } catch (err) {
        console.error(err);
        return res.status(500).json({
            message: "Erreur lors de la déconnexion",
        });
    }
};

module.exports = {
    createUser,
    getAllUsers,
    getUserByEmail,
    updateUser,
    deleteUser,
    userLogin,
    userLogout,
};
