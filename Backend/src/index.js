require("dotenv").config();
const express = require("express");
const fs = require("fs");
const path = require("path");
const cors = require("cors");
const connectDB = require("./db/db");
const authRoutes = require("./routes/authRoutes");
const adRoutes = require("./routes/adRoutes");
const adminRoutes = require("./routes/adminRoutes");
const searchRoutes = require("./routes/searchRoutes");
const cartRoutes = require("./routes/cartRoutes");

const app = express();

// Create uploads directory if it doesn't exist
const uploadsDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
  console.log("Uploads directory created successfully");
}

// Set directory permissions
fs.chmodSync(uploadsDir, 0o775);
console.log("Uploads directory permissions set");

// Connect to Database
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Serve static files from the uploads directory
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/ads", adRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api", searchRoutes);
app.use("/api/cart", cartRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
