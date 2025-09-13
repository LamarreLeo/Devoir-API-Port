/**
 * Validateurs pour les opérations utilisateur.
 * @module validators/userValidator
 * @requires express-validator
 */

const { body, param } = require("express-validator");

/**
 * Validateur pour l'enregistrement d'un utilisateur.
 * Vérifie que le nom d'utilisateur, l'email et le mot de passe respectent les règles définies.
 * @type {Array<ValidationChain>}
 * @example
 * // Utilisation dans une route Express
 * const { registerValidator } = require('./validators/userValidator');
 * app.post('/register', registerValidator, (req, res) => {
 *   // Gérer la requête après validation
 * });
 */
const registerValidator = [
    body("username")
        .notEmpty()
        .withMessage("Le nom d'utilisateur est requis")
        .isLength({ min: 3, max: 20 })
        .withMessage(
            "Le nom d'utilisateur doit contenir entre 3 et 20 caractères"
        ),

    body("email")
        .notEmpty()
        .withMessage("L'email est requis")
        .isEmail()
        .withMessage("L'email n'est pas valide")
        .normalizeEmail(),

    body("password")
        .notEmpty()
        .withMessage("Le mot de passe est requis")
        .isLength({ min: 8 })
        .withMessage("Le mot de passe doit contenir au moins 8 caractères")
        .matches(/[0-9]/)
        .withMessage("Le mot de passe doit contenir au moins un chiffre")
        .matches(/[a-z]/)
        .withMessage(
            "Le mot de passe doit contenir au moins une lettre minuscule"
        )
        .matches(/[A-Z]/)
        .withMessage(
            "Le mot de passe doit contenir au moins une lettre majuscule"
        )
        .matches(/[^A-Za-z0-9]/)
        .withMessage(
            "Le mot de passe doit contenir au moins un caractère spécial"
        ),
];

/**
 * Validateur pour la récupération d'un utilisateur par email.
 * Vérifie que l'email fourni est valide.
 * @type {Array<ValidationChain>}
 * @example
 * // Utilisation dans une route Express
 * const { getUserByEmailValidator } = require('./validators/userValidator');
 * app.get('/users/email/:email', getUserByEmailValidator, (req, res) => {
 *   // Gérer la requête après validation
 * });
 */
const getUserByEmailValidator = [
    param("email")
        .notEmpty()
        .withMessage("L'email est requis")
        .isEmail()
        .withMessage("L'email n'est pas valide")
        .normalizeEmail(),
];

/**
 * Validateur pour la mise à jour d'un utilisateur.
 * Tous les champs sont optionnels, mais s'ils sont fournis, ils doivent respecter les règles définies.
 * @type {Array<ValidationChain>}
 * @example
 * // Utilisation dans une route Express
 * const { updateUserValidator } = require('./validators/userValidator');
 * app.put('/users/:id', updateUserValidator, (req, res) => {
 *   // Gérer la requête après validation
 * });
 */
const updateUserValidator = [
    body("username")
        .optional()
        .isLength({ min: 3, max: 20 })
        .withMessage(
            "Le nom d'utilisateur doit contenir entre 3 et 20 caractères"
        ),

    body("email")
        .optional()
        .isEmail()
        .withMessage("L'email n'est pas valide")
        .normalizeEmail(),

    body("password")
        .optional()
        .isLength({ min: 8 })
        .withMessage("Le mot de passe doit contenir au moins 8 caractères")
        .matches(/[0-9]/)
        .withMessage("Le mot de passe doit contenir au moins un chiffre")
        .matches(/[a-z]/)
        .withMessage(
            "Le mot de passe doit contenir au moins une lettre minuscule"
        )
        .matches(/[A-Z]/)
        .withMessage(
            "Le mot de passe doit contenir au moins une lettre majuscule"
        )
        .matches(/[^A-Za-z0-9]/)
        .withMessage(
            "Le mot de passe doit contenir au moins un caractère spécial"
        ),
];

/**
 * Validateur pour la connexion d'un utilisateur.
 * Vérifie que l'email et le mot de passe sont fournis.
 * @type {Array<ValidationChain>}
 * @example
 * // Utilisation dans une route Express
 * const { loginValidator } = require('./validators/userValidator');
 * app.post('/login', loginValidator, (req, res) => {
 *   // Gérer la requête après validation
 * });
 */
const loginValidator = [
    body("email")
        .notEmpty()
        .withMessage("L'email est requis")
        .isEmail()
        .withMessage("L'email n'est pas valide")
        .normalizeEmail(),

    body("password").notEmpty().withMessage("Le mot de passe est requis"),
];

module.exports = {
    registerValidator,
    loginValidator,
    getUserByEmailValidator,
    updateUserValidator,
};
