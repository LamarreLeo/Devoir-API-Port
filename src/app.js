const express = require("express");
const connectDB = require("./config/db");
const sessionMiddleware = require("./middlewares/sessionMiddleware");
const userRoutes = require("./routes/userRoutes");
const catwayRoutes = require("./routes/catwayRoutes");
const reservationRoutes = require("./routes/reservationRoutes");
const dotenv = require("dotenv");
dotenv.config();

const app = express();

connectDB();

app.use(express.json());

sessionMiddleware(app);

app.use("/api/users", userRoutes);
app.use("/api/catways", catwayRoutes);
app.use("/api/catways/:id", reservationRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
