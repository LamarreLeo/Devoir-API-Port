/**
 * Modèle de réservation pour l'application.
 * @module models/reservationModel
 * @requires mongoose
 */

const mongoose = require("mongoose");

/**
 * Schéma Mongoose pour l'entité Réservation.
 * @class ReservationSchema
 * @type {mongoose.Schema}
 * @property {number} catwayNumber - Le numéro du catway associé à la réservation.
 * @property {string} clientName - Le nom du client effectuant la réservation.
 * @property {string} boatName - Le nom du bateau associé à la réservation.
 * @property {Date} startDate - La date de début de la réservation.
 * @property {Date} endDate - La date de fin de la réservation.
 * @property {Date} createdAt - Horodatage de la création du document. Géré automatiquement par `timestamps`.
 * @property {Date} updatedAt - Horodatage de la dernière mise à jour du document. Géré automatiquement par `timestamps`.
 */
const ReservationSchema = new mongoose.Schema(
    {
        catwayNumber: {
            type: Number,
            required: true,
            trim: true,
        },
        clientName: {
            type: String,
            required: true,
            trim: true,
        },
        boatName: {
            type: String,
            required: true,
            trim: true,
        },
        startDate: {
            type: Date,
            required: true,
        },
        endDate: {
            type: Date,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

/**
 * Le modèle Mongoose pour une réservation, basé sur ReservationSchema.
 * @type {mongoose.Model<mongoose.Document>}
 */
module.exports = mongoose.model("Reservation", ReservationSchema);
