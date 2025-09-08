const { body } = require("express-validator");

const createReservationValidator = [
    body("catwayNumber")
        .notEmpty()
        .withMessage("Le numéro du catway est requis")
        .isInt({ min: 1 })
        .withMessage("Le numéro du catway doit être un entier positif"),

    body("clientName")
        .notEmpty()
        .withMessage("Le nom du client est requis")
        .isLength({ max: 100 })
        .withMessage("Le nom du client ne peut pas dépasser 100 caractères")
        .isString()
        .withMessage("Le nom du client doit être une chaîne de caractères")
        .trim(),

    body("boatName")
        .notEmpty()
        .withMessage("Le nom du bateau est requis")
        .isLength({ max: 100 })
        .withMessage("Le nom du bateau ne peut pas dépasser 100 caractères")
        .isString()
        .withMessage("Le nom du bateau doit être une chaîne de caractères")
        .trim(),

    body("startDate")
        .notEmpty()
        .withMessage("La date de début est requise")
        .isISO8601()
        .withMessage("La date de début doit être une date valide")
        .toDate(),

    body("endDate")
        .notEmpty()
        .withMessage("La date de fin est requise")
        .isISO8601()
        .withMessage("La date de fin doit être une date valide")
        .custom((value, { req }) => {
            if (new Date(value) < new Date(req.body.startDate)) {
                throw new Error(
                    "La date de fin doit être supérieure à la date de début"
                );
            }
            return true;
        })
        .toDate(),
];

module.exports = { createReservationValidator };
