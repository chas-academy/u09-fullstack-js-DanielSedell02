import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "./AuthContext";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      fetchCart();
    } else {
      setCart([]);
    }
  }, [user]);

  const fetchCart = async () => {
    try {
      const response = await axios.get("/api/cart", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setCart(response.data);
    } catch (error) {
      console.error("Error fetching cart:", error);
    }
  };

  const addToCart = async (item) => {
    try {
      await axios.post("/api/cart/add", item, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      fetchCart();
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };

  const removeFromCart = async (itemId) => {
    try {
      await axios.delete(`/api/cart/remove/${itemId}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      fetchCart();
    } catch (error) {
      console.error("Error removing from cart:", error);
    }
  };

  const updateQuantity = async (itemId, quantity) => {
    try {
      await axios.put(
        `/api/cart/update/${itemId}`,
        { quantity },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      fetchCart();
    } catch (error) {
      console.error("Error updating cart:", error);
    }
  };

  const clearCart = async () => {
    try {
      await axios.delete("/api/cart/clear", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setCart([]);
    } catch (error) {
      console.error("Error clearing cart:", error);
    }
  };

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, updateQuantity, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
