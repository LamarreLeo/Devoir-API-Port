/**
 * Middleware d'authentification pour les vues de l'application.
 * Vérifie si un utilisateur est connecté en vérifiant la présence d'une session utilisateur valide.
 * Redirige vers la page d'erreur 401 si l'utilisateur n'est pas authentifié.
 * @module middlewares/viewAuthMiddleware
 * @param {Object} req - L'objet requête Express.
 * @param {Object} req.session - La session de l'utilisateur.
 * @param {Object} req.session.user - Les informations de l'utilisateur connecté.
 * @param {Object} res - L'objet réponse Express.
 * @param {Function} next - La fonction pour passer au middleware suivant.
 * @returns {void|Response} Redirige vers /unauthorized si non authentifié, sinon passe au middleware suivant.
 */
module.exports = (req, res, next) => {
    if (!req.session || !req.session.user) {
        return res.redirect("/unauthorized");
    }
    next();
};
