/**
 * Middleware d'authentification.
 * Vérifie si l'utilisateur est connecté en vérifiant la session.
 * @function
 * @memberof module:middlewares/authMiddleware
 * @param {Object} req - L'objet requête Express.
 * @param {Object} req.session - L'objet session de la requête.
 * @param {Object} [req.session.user] - Les données de l'utilisateur connecté.
 * @param {Object} res - L'objet réponse Express.
 * @param {Function} next - La fonction pour passer au middleware suivant.
 * @returns {void|Object} Passe au middleware suivant si authentifié, sinon renvoie une erreur 401.
 * @example
 * // Utilisation dans une route Express
 * const authMiddleware = require('./middlewares/authMiddleware');
 * app.get('/protected-route', authMiddleware, (req, res) => {
 *   // Seuls les utilisateurs authentifiés peuvent accéder à cette route
 *   res.json({ message: 'Accès autorisé' });
 * });
 */
module.exports = (req, res, next) => {
    if (!req.session || !req.session.user) {
        return res.redirect("/unauthorized");
    }
    next();
};
