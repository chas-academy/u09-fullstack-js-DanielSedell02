const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const Ad = require("../models/Ad");
const authMiddleware = require("../middleware/auth");

// Configure multer for file upload
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../uploads/")); // Use absolute path
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

// Add a pre-processing middleware to log incoming requests
router.use((req, res, next) => {
  console.log("Incoming request body:", req.body);
  console.log("Incoming request files:", req.files);
  next();
});

router.post(
  "/",
  authMiddleware,
  upload.array("images", 3),
  async (req, res) => {
    try {
      console.log("Request body after multer:", req.body);
      console.log("Request files after multer:", req.files);

      const { fragranceName, price, description, quality } = req.body;
      const imageUrls = req.files
        ? req.files.map((file) => `/uploads/${file.filename}`)
        : [];

      const newAd = new Ad({
        fragranceName,
        price: parseFloat(price),
        description,
        quality,
        imageUrls,
        userId: req.user.id,
      });

      await newAd.save();
      res.status(201).json(newAd);
    } catch (error) {
      console.error("Error creating ad:", error);
      res
        .status(500)
        .json({ message: "Internal server error", error: error.message });
    }
  }
);

module.exports = router;
