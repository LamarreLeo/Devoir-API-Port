const { validationResult } = require("express-validator");
const catwayService = require("../services/catwayService");

const createCatway = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const catwayData = req.body;
        const newCatway = await catwayService.createCatway(catwayData);
        return res.status(201).json(newCatway);
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

        return res.status(200).json(updatedCatway);
    } catch (err) {
        return res
            .status(500)
            .json({ message: "Erreur lors de la mise à jour du catway" });
    }
};

module.exports = {
    createCatway,
    getAllCatways,
    getCatwayById,
    updateCatwayState,
};
