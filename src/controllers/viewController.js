const Reservation = require("../models/reservationModel");
const catwayService = require("../services/catwayService");
const userService = require("../services/userService");

const renderHomePage = (req, res) => {
    res.render("index", { title: "Accueil - API Port" });
};

const renderUnauthorizedPage = (req, res) => {
    res.render("unauthorized", { title: "401 - Unauthorized" });
};

const renderDashboardPage = async (req, res) => {
    try {
        const reservations = await Reservation.find().sort({ startDate: 1 });
        res.render("dashboard", {
            title: "Dashboard - API Port",
            user: req.session.user,
            formattedDate: new Date().toLocaleDateString("fr-FR"),
            reservations,
        });
    } catch (error) {
        console.error("Error fetching reservations:", error);
        res.status(500).render({
            title: "500 - Internal Server Error",
            error: "Une erreur est survenue lors de la récupération des réservations.",
        });
    }
};

const renderCatwaysPage = async (req, res) => {
    try {
        const catways = await catwayService.getAllCatways();
        res.render("catways", {
            title: "Catways - API Port",
            user: req.session.user,
            catways,
        });
    } catch (error) {
        console.error(error);
        res.status(500).send({
            title: "500 - Internal Server Error",
            error: "Une erreur est survenue lors de la récupération des catways.",
        });
    }
};

const renderReservationsPage = async (req, res) => {
    try {
        const reservations = await Reservation.find().sort({ startDate: 1 });
        res.render("reservations", {
            title: "Reservations - API Port",
            user: req.session.user,
            reservations,
        });
    } catch (error) {
        console.error("Error fetching reservations:", error);
        res.status(500).render({
            title: "500 - Internal Server Error",
            error: "Une erreur est survenue lors de la récupération des réservations.",
        });
    }
};

const renderUsersPage = async (req, res) => {
    try {
        const users = await userService.getAllUsers();
        res.render("users", {
            title: "Users - API Port",
            user: req.session.user,
            users,
        });
    } catch (error) {
        console.error(error);
        res.status(500).send({
            title: "500 - Internal Server Error",
            error: "Une erreur est survenue lors de la récupération des utilisateurs.",
        });
    }
};

module.exports = {
    renderHomePage,
    renderUnauthorizedPage,
    renderDashboardPage,
    renderCatwaysPage,
    renderReservationsPage,
    renderUsersPage,
};
