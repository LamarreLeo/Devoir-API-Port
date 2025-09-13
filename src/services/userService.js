/**
 * Service pour la gestion des utilisateurs.
 * @module services/userService
 * @requires ../models/userModel
 * @requires ../utils/password
 */

const User = require("../models/userModel");
const { hashPassword, comparePassword } = require("../utils/password");

/**
 * Crée un nouvel utilisateur avec les données fournies.
 * @async
 * @function createUser
 * @param {Object} userData - Les données du nouvel utilisateur.
 * @param {string} userData.username - Le nom d'utilisateur.
 * @param {string} userData.email - L'email de l'utilisateur.
 * @param {string} userData.password - Le mot de passe en clair.
 * @returns {Promise<Object>} L'utilisateur créé sans le mot de passe.
 * @throws {Error} Si l'email est déjà utilisé.
 */
const createUser = async (userData) => {
    const existingUser = await User.findOne({ email: userData.email });
    if (existingUser) {
        const error = new Error("Email déjà utilisé");
        error.statusCode = 409;
        throw error;
    }

    const hashedPassword = await hashPassword(userData.password);

    const newUser = await User.create({
        username: userData.username,
        email: userData.email,
        password: hashedPassword,
    });

    const userOBJ = newUser.toObject();
    delete userOBJ.password;

    return userOBJ;
};

/**
 * Récupère tous les utilisateurs.
 * @async
 * @function getAllUsers
 * @returns {Promise<Array<Object>>} Une liste de tous les utilisateurs sans leurs mots de passe.
 */
const getAllUsers = async () => {
    return await User.find().select("-password");
};

/**
 * Récupère un utilisateur par son email.
 * @async
 * @function getUserByEmail
 * @param {string} email - L'email de l'utilisateur à récupérer.
 * @returns {Promise<Object|null>} L'utilisateur trouvé ou null si non trouvé.
 */
const getUserByEmail = async (email) => {
    return await User.findOne({ email }).select("-password");
};

/**
 * Met à jour un utilisateur existant.
 * @async
 * @function updateUser
 * @param {string} email - L'email de l'utilisateur à mettre à jour.
 * @param {Object} updateData - Les données à mettre à jour.
 * @param {string} [updateData.username] - Le nouveau nom d'utilisateur (optionnel).
 * @param {string} [updateData.email] - Le nouvel email (optionnel).
 * @param {string} [updateData.password] - Le nouveau mot de passe (optionnel).
 * @returns {Promise<Object>} L'utilisateur mis à jour sans le mot de passe.
 * @throws {Error} Si l'utilisateur n'est pas trouvé ou si le nouvel email est déjà utilisé.
 */
const updateUser = async (email, updateData) => {
    const user = await User.findOne({ email });
    if (!user) {
        const error = new Error("Utilisateur non trouvé");
        error.statusCode = 404;
        throw error;
    }

    if (updateData.username) {
        user.username = updateData.username;
    }

    if (updateData.email) {
        const existingUser = await User.findOne({ email: updateData.email });
        if (
            existingUser &&
            existingUser._id.toString() !== user._id.toString()
        ) {
            const error = new Error("Email déjà utilisé");
            error.statusCode = 409;
            throw error;
        }
        user.email = updateData.email;
    }

    if (updateData.password) {
        const hashedPassword = await hashPassword(updateData.password);
        user.password = hashedPassword;
    }

    if (!updateData.username && !updateData.email && !updateData.password) {
        return user.toObject({
            transform: (__, ret) => {
                delete ret.password;
                return ret;
            },
        });
    }

    const updatedUser = await user.save();

    const userOBJ = updatedUser.toObject();
    delete userOBJ.password;

    return userOBJ;
};

/**
 * Supprime un utilisateur par son email.
 * @async
 * @function deleteUser
 * @param {string} email - L'email de l'utilisateur à supprimer.
 * @returns {Promise<Object|null>} L'utilisateur supprimé ou null si non trouvé.
 */
const deleteUser = async (email) => {
    const deletedUser = await User.findOneAndDelete({ email }).lean();
    if (!deletedUser) return null;

    delete deletedUser.password;
    return deletedUser;
};

/**
 * Authentifie un utilisateur avec son email et son mot de passe.
 * @async
 * @function userLogin
 * @param {string} email - L'email de l'utilisateur.
 * @param {string} password - Le mot de passe en clair.
 * @returns {Promise<Object>} L'utilisateur authentifié sans le mot de passe.
 * @throws {Error} Si l'email ou le mot de passe est incorrect.
 */
const userLogin = async (email, password) => {
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
        throw new Error("Email ou mot de passe incorrect");
    }
    const isPasswordValid = await comparePassword(password, user.password);
    if (!isPasswordValid) {
        throw new Error("Email ou mot de passe incorrect");
    }

    const userOBJ = user.toObject();
    delete userOBJ.password;
    return userOBJ;
};

module.exports = {
    createUser,
    getAllUsers,
    getUserByEmail,
    updateUser,
    deleteUser,
    userLogin,
};
