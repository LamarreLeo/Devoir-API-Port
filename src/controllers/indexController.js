const renderHomePage = (req, res) => {
    res.render("index", { title: "Accueil - API Port" });
};

module.exports = {
    renderHomePage,
};
