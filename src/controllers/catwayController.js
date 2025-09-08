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

module.exports = { createCatway };
