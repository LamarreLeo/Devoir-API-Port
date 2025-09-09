/**
 * Validateurs pour les opérations de création de Catway.
 * @module validators/catwayValidator
 * @requires express-validator
 */

const { body, param } = require("express-validator");

/**
 * Validateur pour la création d'un Catway.
 * Vérifie que le numéro, le type et l'état du catway respectent les règles définies.
 * @type {Array<ValidationChain>}
 * @example
 * // Utilisation dans une route Express
 * const { createCatwayValidator } = require('./validators/catwayValidator');
 * app.post('/catway', createCatwayValidator, (req, res) => {
 *   // Gérer la requête après validation
 * });
 */
const createCatwayValidator = [
    body("catwayNumber")
        .notEmpty()
        .withMessage("Le numéro du catway est requis")
        .isInt({ min: 1 })
        .withMessage("Le numéro du catway doit être un entier positif"),

    body("catwayType")
        .notEmpty()
        .withMessage("Le type du catway est requis")
        .toLowerCase()
        .isIn(["long", "short"])
        .withMessage("Le type du catway doit être 'long' ou 'short'"),

    body("catwayState")
        .notEmpty()
        .withMessage("L'état du catway est requis")
        .isLength({ max: 500 })
        .withMessage("L'état du catway ne peut pas dépasser 500 caractères")
        .trim(),
];

/**
 * Validateur pour la récupération d'un Catway par ID.
 * Vérifie que l'ID est un entier positif.
 * @type {Array<ValidationChain>}
 */
const getCatwayByIdValidator = [
    param("id")
        .notEmpty()
        .withMessage("Le numéro du catway est requis")
        .isInt({ min: 1 })
        .withMessage("Le numéro du catway doit être un entier positif"),
];

/**
 * Validateur pour la mise à jour de l'état d'un Catway.
 * Vérifie que l'ID est un entier positif et que l'état du catway respecte les règles définies.
 * @type {Array<ValidationChain>}
 */
const updateCatwayStateValidator = [
    param("id")
        .notEmpty()
        .withMessage("Le numéro du catway est requis")
        .isInt({ min: 1 })
        .withMessage("Le numéro du catway doit être un entier positif"),

    body("catwayState")
        .notEmpty()
        .withMessage("L'état du catway est requis")
        .isLength({ max: 500 })
        .withMessage("L'état du catway ne peut pas dépasser 500 caractères")
        .trim(),
];

module.exports = {
    createCatwayValidator,
    getCatwayByIdValidator,
    updateCatwayStateValidator,
};
