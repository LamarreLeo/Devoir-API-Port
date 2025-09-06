/**
 * Utilitaires pour le hachage et la comparaison des mots de passe.
 * @module utils/password
 * @requires bcrypt
 */

const bcrypt = require("bcrypt");

/**
 * Nombre de tours de salage pour le hachage du mot de passe, défini par la variable d'environnement SALT_ROUNDS ou par défaut à 10.
 * @constant {number}
 */
const SALT_ROUNDS = Number(process.env.SALT_ROUNDS) || 10;

/**
 * Hache un mot de passe donné.
 * @async
 * @function hashPassword
 * @param {string} password - Le mot de passe à hacher.
 * @returns {Promise<string>} Le mot de passe haché.
 */
async function hashPassword(password) {
    return await bcrypt.hash(password, SALT_ROUNDS);
}

/**
 * Compare un mot de passe en clair avec un mot de passe haché.
 * @async
 * @function comparePassword
 * @param {string} password - Le mot de passe en clair à comparer.
 * @param {string} hashedPassword - Le mot de passe haché à comparer.
 * @returns {Promise<boolean>} True si les mots de passe correspondent, sinon false.
 */
async function comparePassword(password, hashedPassword) {
    return await bcrypt.compare(password, hashedPassword);
}

module.exports = { hashPassword, comparePassword };
