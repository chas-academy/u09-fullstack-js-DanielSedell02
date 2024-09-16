require("dotenv").config();
const express = require("express");
const connectDB = require("./db/db");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");

const app = express();

connectDB();

// Middleware
// app.use(cors());
// app.use(express.json());

//Routes
app.use("api/auth", authRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
