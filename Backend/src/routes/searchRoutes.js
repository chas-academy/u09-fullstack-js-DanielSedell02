const express = require("express");
const router = express.Router();
const Ad = require("../models/Ad"); // Adjust the path if necessary

router.get("/search", async (req, res) => {
  try {
    const { q } = req.query;
    if (!q) {
      return res.status(400).json({ message: "Search query is required" });
    }

    const ads = await Ad.find({
      $or: [
        { fragranceName: { $regex: q, $options: "i" } },
        { description: { $regex: q, $options: "i" } },
      ],
    }).limit(10);

    res.json(ads);
  } catch (error) {
    console.error("Search error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
