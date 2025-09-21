/**
 * Contrôleur pour la gestion des opérations liées aux catways.
 * @module controllers/catwayController
 * @requires express-validator
 * @requires ../services/catwayService
 */

const { validationResult } = require("express-validator");
const catwayService = require("../services/catwayService");

/**
 * Crée un nouveau catway.
 * @async
 * @function createCatway
 * @param {Object} req - La requête Express.
 * @param {Object} req.body - Les données du catway à créer.
 * @param {string} req.body.catwayNumber - Le numéro du catway.
 * @param {string} [req.body.state] - L'état du catway (optionnel).
 * @param {Object} res - La réponse Express.
 * @returns {Promise<Object>} Redirection vers la page des catways ou message d'erreur.
 * @throws {Error} Si le numéro du catway existe déjà ou en cas d'erreur serveur.
 */
const createCatway = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const catwayData = req.body;
        const newCatway = await catwayService.createCatway(catwayData);
        return res.status(201).redirect("/catways");
    } catch (err) {
        if (err.code === 11000) {
            return res
                .status(409)
                .json({ message: "Le numéro du catway existe déjà" });
        }
        return res
            .status(500)
            .json({ message: "Erreur lors de la création du catway" });
    }
};

/**
 * Récupère tous les catways.
 * @async
 * @function getAllCatways
 * @param {Object} req - La requête Express.
 * @param {Object} res - La réponse Express.
 * @returns {Promise<Object>} Liste des catways ou message d'erreur.
 * @throws {Error} Si une erreur survient lors de la récupération des catways.
 */
const getAllCatways = async (req, res) => {
    try {
        const catwaysData = await catwayService.getAllCatways();
        return res.status(200).json(catwaysData);
    } catch (err) {
        return res
            .status(500)
            .json({ message: "Erreur lors de la récupération des catways" });
    }
};

/**
 * Récupère un catway par son ID.
 * @async
 * @function getCatwayById
 * @param {Object} req - La requête Express.
 * @param {Object} req.params - Les paramètres de la requête.
 * @param {string} req.params.id - L'ID du catway à récupérer.
 * @param {Object} res - La réponse Express.
 * @returns {Promise<Object>} Le catway demandé ou message d'erreur.
 * @throws {Error} Si le catway n'est pas trouvé ou en cas d'erreur serveur.
 */
const getCatwayById = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const catwayNumber = Number(req.params.id);
        const catwayData = await catwayService.getCatwayById(catwayNumber);
        if (!catwayData) {
            return res.status(404).json({ message: "Catway non trouvé" });
        }

        return res.status(200).json(catwayData);
    } catch (err) {
        return res
            .status(500)
            .json({ message: "Erreur lors de la récupération du catway" });
    }
};

/**
 * Met à jour l'état d'un catway.
 * @async
 * @function updateCatwayState
 * @param {Object} req - La requête Express.
 * @param {Object} req.params - Les paramètres de la requête.
 * @param {string} req.params.id - L'ID du catway à mettre à jour.
 * @param {Object} req.body - Les données de mise à jour.
 * @param {string} req.body.state - Le nouvel état du catway.
 * @param {Object} res - La réponse Express.
 * @returns {Promise<Object>} Le catway mis à jour ou message d'erreur.
 * @throws {Error} Si le catway n'est pas trouvé ou en cas d'erreur serveur.
 */
const updateCatwayState = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const catwayNumber = Number(req.params.id);
        const newState = req.body.catwayState;

        const updatedCatway = await catwayService.updateCatwayState(
            catwayNumber,
            newState
        );

        if (!updatedCatway) {
            return res.status(404).json({ message: "Catway non trouvé" });
        }

        return res.redirect("/catways"), res.status(200);
    } catch (err) {
        return res
            .status(500)
            .json({ message: "Erreur lors de la mise à jour du catway" });
    }
};

/**
 * Supprime un catway.
 * @async
 * @function deleteCatway
 * @param {Object} req - La requête Express.
 * @param {Object} req.params - Les paramètres de la requête.
 * @param {string} req.params.id - L'ID du catway à supprimer.
 * @param {Object} res - La réponse Express.
 * @returns {Promise<Object>} Message de succès ou d'erreur.
 * @throws {Error} Si le catway n'est pas trouvé ou en cas d'erreur serveur.
 */
const deleteCatway = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ error: errors.array() });
    }

    try {
        const catwayNumber = Number(req.params.id);
        const deletedCatway = await catwayService.deleteCatway(catwayNumber);
        if (!deletedCatway) {
            return res.status(404).json({ message: "Catway non trouvé" });
        }
        return res.status(200).redirect("/catways");
    } catch (err) {
        return res
            .status(500)
            .json({ message: "Erreur lors de la suppression du catway" });
    }
};

module.exports = {
    createCatway,
    getAllCatways,
    getCatwayById,
    updateCatwayState,
    deleteCatway,
};
