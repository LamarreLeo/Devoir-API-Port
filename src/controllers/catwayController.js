const { validationResult } = require("express-validator");
const catwayService = require("../services/catwayService");

/**
 * Contrôleur pour la création d'un catway.
 * @param {Object} req - La requête Express.
 * @param {Object} res - La réponse Express.
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
 * Contrôleur pour récupérer tous les catways.
 * @param {Object} req - La requête Express.
 * @param {Object} res - La réponse Express.
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
 * Contrôleur pour récupérer un catway par ID.
 * @param {Object} req - La requête Express.
 * @param {Object} res - La réponse Express.
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
 * Contrôleur pour mettre à jour l'état d'un catway.
 * @param {Object} req - La requête Express.
 * @param {Object} res - La réponse Express.
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
 * Contrôleur pour supprimer un catway.
 * @param {Object} req - La requête Express.
 * @param {Object} res - La réponse Express.
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
        return res.status(200).json(deletedCatway);
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
