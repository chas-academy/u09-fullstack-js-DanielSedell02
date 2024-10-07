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

const corsOptions = {
  origin: [
    process.env.FRONTEND_URL || "https://scentsaving.netlify.app/",
    // Add any additional allowed origins here
    "http://localhost:3000", // For local development
  ],
  credentials: true,
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));
// Middleware
app.use(express.json());

// Serve static files from the uploads directory
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/ads", adRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api", searchRoutes);
app.use("/api/cart", cartRoutes);

// Connect to Database
connectDB();

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});
