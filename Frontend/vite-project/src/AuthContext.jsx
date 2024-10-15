import React, { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";
import { API_URL } from "./config/api";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Håller koll på användaren
  const [loading, setLoading] = useState(false); // Laddningstillstånd
  const [error, setError] = useState(null); // Felmeddelande-tillstånd

  useEffect(() => {
    try {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        setUser(JSON.parse(storedUser)); // Sätter användare från localStorage
      }
    } catch (error) {
      console.error("Error loading user from localStorage", error); // Felhantering vid laddning av användare
    }
  }, []);

  const login = async (username, password) => {
    setLoading(true); // Startar laddning
    setError(null); // Rensar tidigare fel
    try {
      const response = await axios.post(`${API_URL}/api/auth/login`, {
        username,
        password,
      });
      const { token, user } = response.data;

      if (!user.role) {
        throw new Error("User role not specified"); // Säkerställer att användaren har en roll
      }

      localStorage.setItem("token", token); // Sparar token och användare
      localStorage.setItem("user", JSON.stringify(user));
      setUser(user); // Sätter inloggad användare i tillståndet
      return user;
    } catch (error) {
      setError(error.message); // Sätter felmeddelandet
      console.error("Login error:", error);
      throw error;
    } finally {
      setLoading(false); // Oavsett om det lyckas eller misslyckas, stoppar laddningen
    }
  };

  const logout = () => {
    localStorage.removeItem("token"); // Tar bort token
    localStorage.removeItem("user"); // Tar bort användardata
    setUser(null); // Sätter användaren till null
  };

  return (
    <AuthContext.Provider
      value={{ user, login, logout, loading, error, setUser }}
    >
      {children} {/* Exponerar värden till barnkomponenter */}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext); // Hook för att använda autentisering
