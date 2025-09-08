const { body } = require("express-validator");

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
