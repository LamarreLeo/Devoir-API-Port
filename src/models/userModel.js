/**
 * Modèle d'utilisateur pour l'application.
 * @module models/userModel
 * @requires mongoose
 */
const mongoose = require("mongoose");

/**
 * Schéma Mongoose pour l'entité Utilisateur.
 * @class UserSchema
 * @type {mongoose.Schema}
 * @property {string} username - Le nom d'utilisateur. Requis et les espaces superflus sont retirés.
 * @property {string} email - L'adresse email de l'utilisateur. Requis, unique, et stocké en minuscules.
 * @property {string} password - Le mot de passe de l'utilisateur. Requis, mais n'est pas retourné par défaut dans les requêtes.
 * @property {Date} createdAt - Horodatage de la création du document. Géré automatiquement par `timestamps`.
 * @property {Date} updatedAt - Horodatage de la dernière mise à jour du document. Géré automatiquement par `timestamps`.
 */
const UserSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            lowercase: true,
        },
        password: {
            type: String,
            required: true,
            select: false,
        },
    },
    {
        timestamps: true,
    }
);

/**
 * Le modèle Mongoose pour un utilisateur, basé sur UserSchema.
 * @type {mongoose.Model<mongoose.Document>}
 */
module.exports = mongoose.model("User", UserSchema);
