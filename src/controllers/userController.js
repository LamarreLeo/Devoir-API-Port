const { validationResult } = require("express-validator");
const userService = require("../services/userService");

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

module.exports = {
    createUser,
};
