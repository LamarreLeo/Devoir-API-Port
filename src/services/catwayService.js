/**
 * Service pour les opérations sur les catways.
 * @module services/catwayService
 * @requires models/catwayModel
 */

const Catway = require("../models/catwayModel");

/**
 * Crée un nouveau catway.
 * @param {Object} catwayData - Les données du catway à créer.
 * @returns {Promise<Object>} Le catway créé.
 */
const createCatway = async (catwayData) => {
    return await Catway.create(catwayData);
};

/**
 * Récupère tous les catways.
 * @returns {Promise<Array>} La liste des catways.
 */
const getAllCatways = async () => {
    return await Catway.find();
};

/**
 * Récupère un catway par son numéro.
 * @param {number} catwayNumber - Le numéro du catway à récupérer.
 * @returns {Promise<Object|null>} Le catway trouvé ou null.
 */
const getCatwayById = async (catwayNumber) => {
    return await Catway.findOne({ catwayNumber });
};

/**
 * Met à jour l'état d'un catway.
 * @param {number} catwayNumber - Le numéro du catway à mettre à jour.
 * @param {string} newState - Le nouvel état du catway.
 * @returns {Promise<Object>} Le catway mis à jour.
 */
const updateCatwayState = async (catwayNumber, newState) => {
    return await Catway.findOneAndUpdate(
        { catwayNumber },
        { catwayState: newState },
        { new: true }
    );
};

/**
 * Supprime un catway.
 * @param {number} catwayNumber - Le numéro du catway à supprimer.
 * @returns {Promise<Object>} Le catway supprimé.
 */
const deleteCatway = async (catwayNumber) => {
    return await Catway.findOneAndDelete({ catwayNumber });
};

module.exports = {
    createCatway,
    getAllCatways,
    getCatwayById,
    updateCatwayState,
    deleteCatway,
};
