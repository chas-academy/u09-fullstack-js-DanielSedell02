const mongoose = require("mongoose");

const adSchema = new mongoose.Schema({
  fragranceName: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String, required: true },
  quality: { type: String, required: true },
  imageUrls: [{ type: String }],
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Ad", adSchema);
