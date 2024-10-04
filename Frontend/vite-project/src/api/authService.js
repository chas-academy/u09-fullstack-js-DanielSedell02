import axios from "axios";

const API_URL =
  import.meta.env.VITE_API_URL ||
  "https://u09-fullstack-js-danielsedell02-1.onrender.com";

const register = (username, email, password) => {
  return axios.post(API_URL + "register", {
    username,
    email,
    password,
  });
};

const login = (username, password) => {
  return axios.post(API_URL + "login", {
    username,
    password,
  });
};

const logout = () => {
  localStorage.removeItem("user");
};

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};

const AuthService = {
  register,
  login,
  logout,
  getCurrentUser,
};

export default AuthService;
