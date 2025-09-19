const renderHomePage = (req, res) => {
    res.render("index", { title: "Accueil - API Port" });
};

const renderUnauthorizedPage = (req, res) => {
    res.render("unauthorized", { title: "401 - Unauthorized" });
};

const renderDashboardPage = async (req, res) => {
    const formattedDate = new Date().toLocaleDateString("fr-FR");

    try {
        const reservations = await Reservation.find().sort({ startDate: 1 });

        res.render("dashboard", {
            title: "Dashboard - API Port",
            user: req.session.user,
            formattedDate,
            reservations,
        });
    } catch (error) {
        console.error("Error fetching reservations:", error);
        res.status(500).render("error", {
            title: "500 - Internal Server Error",
            error: "Une erreur est survenue lors de la récupération des réservations.",
        });
    }
};

module.exports = {
    renderHomePage,
    renderUnauthorizedPage,
    renderDashboardPage,
};
