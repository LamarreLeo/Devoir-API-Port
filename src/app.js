const express = require("express");
const path = require("path");
const connectDB = require("./config/db");
const sessionMiddleware = require("./middlewares/sessionMiddleware");
const userRoutes = require("./routes/userRoutes");
const catwayRoutes = require("./routes/catwayRoutes");
const reservationRoutes = require("./routes/reservationRoutes");
const indexRoutes = require("./routes/indexRoutes");
const dotenv = require("dotenv");
dotenv.config();

const app = express();

connectDB();

app.use(express.json());

sessionMiddleware(app);

app.use("/api/users", userRoutes);
app.use("/api/catways", catwayRoutes);
app.use("/api/catways/:id", reservationRoutes);

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static("public"));

app.use("/", indexRoutes);

const HOST = process.env.HOST || "localhost";
const PORT = process.env.PORT || 3000;
app.listen(PORT, HOST, () =>
    console.log(`🚀 Server running on http://${HOST}:${PORT}`)
);
