const renderHomePage = (req, res) => {
    res.render("index", { title: "Accueil - API Port" });
};

const renderDashboardPage = (req, res) => {
    res.render("dashboard", { title: "Dashboard - API Port" });
};

module.exports = {
    renderHomePage,
    renderDashboardPage,
};
