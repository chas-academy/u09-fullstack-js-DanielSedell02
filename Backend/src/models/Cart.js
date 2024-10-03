const mongoose = require("mongoose");

const CartSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  items: [
    {
      id: String,
      fragranceName: String,
      price: Number,
      imageUrl: String,
      quantity: Number,
    },
  ],
});

module.exports = mongoose.model("Cart", CartSchema);
