/**
 * Modèle de Catway pour l'application.
 * @module models/catwayModel
 * @requires mongoose
 */

const mongoose = require("mongoose");

/**
 * Schéma Mongoose pour l'entité Catway.
 * @class CatwaySchema
 * @type {mongoose.Schema}
 * @property {number} catwayNumber - Le numéro unique du catway.
 * @property {string} catwayType - Le type de catway, peut être 'long' ou 'short'.
 * @property {string} catwayState - L'état actuel du catway.
 * @property {Date} createdAt - Horodatage de la création du document. Géré automatiquement par `timestamps`.
 * @property {Date} updatedAt - Horodatage de la dernière mise à jour du document. Géré automatiquement par `timestamps`.
 */
const CatwaySchema = new mongoose.Schema(
    {
        catwayNumber: {
            type: Number,
            required: true,
            unique: true,
        },
        catwayType: {
            type: String,
            required: true,
            enum: ["long", "short"],
        },
        catwayState: {
            type: String,
            required: true,
            trim: true,
        },
    },
    { timestamps: true }
);

/**
 * Le modèle Mongoose pour un catway, basé sur CatwaySchema.
 * @type {mongoose.Model<mongoose.Document>}
 */
module.exports = mongoose.model("Catway", CatwaySchema);
