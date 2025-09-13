const session = require("express-session");

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
