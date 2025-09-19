const renderHomePage = (req, res) => {
    res.render("index", { title: "Accueil - API Port" });
};

const renderUnauthorizedPage = (req, res) => {
    res.render("unauthorized", { title: "401 - Unauthorized" });
};

const renderDashboardPage = (req, res) => {
    const formattedDate = new Date().toLocaleDateString("fr-FR");

    res.render("dashboard", {
        title: "Dashboard - API Port",
        user: req.session.user,
        formattedDate,
    });
};

module.exports = {
    renderHomePage,
    renderUnauthorizedPage,
    renderDashboardPage,
};
