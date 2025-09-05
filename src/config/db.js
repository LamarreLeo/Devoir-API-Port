/**
 * Module de configuration et de connexion à la base de données MongoDB
 * @module config/db
 * @requires mongoose - Bibliothèque ODM pour MongoDB
 * @requires dotenv - Gestion des variables d'environnement
 *
 * @example
 * // Configuration requise dans le fichier .env
 * MONGO_URI=mongodb://[username:password@]host[:port][/database][?options]
 * // Exemple :
 * MONGO_URI=mongodb://localhost:27017/monportfolio
 */

const mongoose = require("mongoose");
const dotenv = require("dotenv");

// Charge les variables d'environnement du fichier .env
dotenv.config();

/**
 * Établit une connexion à la base de données MongoDB
 * @async
 * @function connectDB
 * @returns {Promise<void>} Une promesse qui se résout lorsque la connexion est établie
 * @throws {Error} Si la connexion à la base de données échoue
 *
 * @example
 * // Utilisation dans app.js
 * const connectDB = require('./config/db');
 * connectDB();
 */
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("✅ MongoDB connected");
    } catch (error) {
        console.error(`❌ MongoDB connection error: ${error.message}`);
        // Arrête le processus Node.js avec un échec
        process.exit(1);
    }
};

module.exports = connectDB;
