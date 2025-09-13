/**
 * Routes pour les opérations sur les catways.
 * @module routes/catwayRoutes
 * @requires express
 * @requires controllers/catwayController
 * @requires validators/catwayValidator
 * @requires middlewares/authMiddleware
 */

const express = require("express");
const router = express.Router();
const catwayController = require("../controllers/catwayController");
const catwayValidator = require("../validators/catwayValidator");
const authMiddleware = require("../middlewares/authMiddleware");

router.use(authMiddleware);

/**
 * Crée un nouveau catway.
 * @name POST /
 * @function
 * @memberof module:routes/catwayRoutes
 * @inner
 * @param {string} path - Chemin de la requête.
 * @param {function} catwayValidator.createCatwayValidator - Middleware de validation pour la création d'un catway.
 * @param {function} catwayController.createCatway - Contrôleur pour la création d'un catway.
 */
router.post(
    "/",
    catwayValidator.createCatwayValidator,
    catwayController.createCatway
);

/**
 * Récupère tous les catways.
 * @name GET /
 * @function
 * @memberof module:routes/catwayRoutes
 * @inner
 * @param {string} path - Chemin de la requête.
 * @param {function} catwayController.getAllCatways - Contrôleur pour la récupération de tous les catways.
 */
router.get("/", catwayController.getAllCatways);

/**
 * Récupère un catway par son ID.
 * @name GET /:id
 * @function
 * @memberof module:routes/catwayRoutes
 * @inner
 * @param {string} path - Chemin de la requête.
 * @param {function} catwayValidator.getCatwayByIdValidator - Middleware de validation pour la récupération d'un catway par son ID.
 * @param {function} catwayController.getCatwayById - Contrôleur pour la récupération d'un catway par son ID.
 */
router.get(
    "/:id",
    catwayValidator.getCatwayByIdValidator,
    catwayController.getCatwayById
);

/**
 * Met à jour l'état d'un catway.
 * @name PUT /:id
 * @function
 * @memberof module:routes/catwayRoutes
 * @inner
 * @param {string} path - Chemin de la requête.
 * @param {function} catwayValidator.updateCatwayStateValidator - Middleware de validation pour la mise à jour de l'état d'un catway.
 * @param {function} catwayController.updateCatwayState - Contrôleur pour la mise à jour de l'état d'un catway.
 */
router.put(
    "/:id",
    catwayValidator.updateCatwayStateValidator,
    catwayController.updateCatwayState
);

/**
 * Supprime un catway par son ID.
 * @name DELETE /:id
 * @function
 * @memberof module:routes/catwayRoutes
 * @inner
 * @param {string} path - Chemin de la requête.
 * @param {function} catwayValidator.getCatwayByIdValidator - Middleware de validation pour la suppression d'un catway par son ID.
 * @param {function} catwayController.deleteCatway - Contrôleur pour la suppression d'un catway.
 */
router.delete(
    "/:id",
    catwayValidator.getCatwayByIdValidator,
    catwayController.deleteCatway
);

module.exports = router;
