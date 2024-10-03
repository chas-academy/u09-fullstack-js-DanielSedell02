const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const Cart = require("../models/Cart");

// Get user's cart
router.get("/", auth, async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.user.id });
    res.json(cart ? cart.items : []);
  } catch (error) {
    res.status(500).send("Server Error");
  }
});

// Add item to cart
router.post("/add", auth, async (req, res) => {
  try {
    let cart = await Cart.findOne({ userId: req.user.id });
    if (!cart) {
      cart = new Cart({ userId: req.user.id, items: [] });
    }

    const newItem = req.body;
    const existingItem = cart.items.find((item) => item.id === newItem.id);

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.items.push({ ...newItem, quantity: 1 });
    }

    await cart.save();
    res.json(cart.items);
  } catch (error) {
    res.status(500).send("Server Error");
  }
});

// Remove item from cart
router.delete("/remove/:itemId", auth, async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.user.id });
    if (!cart) return res.status(404).json({ msg: "Cart not found" });

    cart.items = cart.items.filter((item) => item.id !== req.params.itemId);
    await cart.save();
    res.json(cart.items);
  } catch (error) {
    res.status(500).send("Server Error");
  }
});

// Update item quantity
router.put("/update/:itemId", auth, async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.user.id });
    if (!cart) return res.status(404).json({ msg: "Cart not found" });

    const item = cart.items.find((item) => item.id === req.params.itemId);
    if (!item) return res.status(404).json({ msg: "Item not found in cart" });

    item.quantity = req.body.quantity;
    await cart.save();
    res.json(cart.items);
  } catch (error) {
    res.status(500).send("Server Error");
  }
});

// Clear cart
router.delete("/clear", auth, async (req, res) => {
  try {
    await Cart.findOneAndUpdate({ userId: req.user.id }, { items: [] });
    res.json({ msg: "Cart cleared" });
  } catch (error) {
    res.status(500).send("Server Error");
  }
});

module.exports = router;
