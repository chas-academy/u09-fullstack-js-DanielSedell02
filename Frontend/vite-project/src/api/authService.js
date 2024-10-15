import axios from "axios";

const API_URL =
  import.meta.env.VITE_API_URL ||
  "https://u09-fullstack-js-danielsedell02.onrender.com";

const register = (username, email, password) => {
  return axios.post(
    `${API_URL}/api/auth/register`,
    {
      username,
      email,
      password,
    },
    { withCredentials: true }
  );
};

const login = (username, password) => {
  return axios.post(
    `${API_URL}/api/auth/login`,
    {
      username,
      password,
    },
    { withCredentials: true } // Skickar med cookies för autentisering
  );
};
const logout = () => {
  localStorage.removeItem("user"); // Tar bort användardata från localStorage
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
