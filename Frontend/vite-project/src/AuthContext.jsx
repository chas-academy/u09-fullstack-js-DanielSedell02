import React, { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";
import { API_URL } from "./config/api";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Tracks the current user
  const [loading, setLoading] = useState(false); // Tracks loading state
  const [error, setError] = useState(null); // Tracks error state

  useEffect(() => {
    try {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        setUser(JSON.parse(storedUser)); // Set user from localStorage if exists
      }
    } catch (error) {
      console.error("Error loading user from localStorage", error);
    }
  }, []);

  const login = async (username, password) => {
    setLoading(true); // Start loading
    setError(null); // Clear previous errors
    try {
      const response = await axios.post(`${API_URL}/api/auth/login`, {
        username,
        password,
      });
      const { token, user } = response.data;

      if (!user.role) {
        throw new Error("User role not specified"); // Ensure user role is present
      }

      localStorage.setItem("token", token); // Save token to localStorage
      localStorage.setItem("user", JSON.stringify(user));
      setUser(user); // Set logged-in user
      return user;
    } catch (error) {
      setError("Fel användaruppgifter"); // Set error message on failure
      console.error("Login error:", error);
      throw error;
    } finally {
      setLoading(false); // Stop loading whether success or failure
    }
  };

  const logout = () => {
    localStorage.removeItem("token"); // Remove token from localStorage
    localStorage.removeItem("user"); // Remove user data
    setUser(null); // Reset user to null
  };

  return (
    <AuthContext.Provider
      value={{ user, login, logout, loading, error, setError, setUser }} // Expose setError
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
