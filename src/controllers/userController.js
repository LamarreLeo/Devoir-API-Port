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

const userLogin = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    try {
        const user = await userService.userLogin(email, password);
        req.session.user = user;
        return res.status(200).json({
            message: "Connexion réussie",
            user,
        });
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

module.exports = {
    createUser,
    getAllUsers,
    getUserByEmail,
    updateUser,
    deleteUser,
    userLogin,
};
