const express = require("express");
const connectDB = require("./config/db");
const catwayRoutes = require("./routes/catwayRoutes");
const dotenv = require("dotenv");
dotenv.config();

const app = express();

connectDB();

app.use(express.json());
app.use("/api/catways", catwayRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
