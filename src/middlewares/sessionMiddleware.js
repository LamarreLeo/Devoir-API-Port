/**
 * Middleware de configuration des sessions Express.
 * @module middlewares/sessionMiddleware
 * @requires express-session
 */

const session = require("express-session");

/**
 * Configure et initialise le middleware de session Express.
 * @function
 * @memberof module:middlewares/sessionMiddleware
 * @param {Object} app - L'application Express.
 * @returns {void}
 * @example
 * // Utilisation dans app.js
 * const express = require('express');
 * const app = express();
 * const sessionMiddleware = require('./middlewares/sessionMiddleware');
 * 
 * // Configuration de la session
 * sessionMiddleware(app);
 * 
 * // Autres middlewares et routes...
 */
module.exports = (app) => {
    app.use(
        session({
            secret: process.env.SESSION_SECRET,
            resave: false,
            saveUninitialized: false,
            cookie: {
                maxAge: 1000 * 60 * 60,
                httpOnly: true,
            },
        })
    );
};
