import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { AuthProvider, useAuth } from "./AuthContext";
import { DarkModeProvider, useDarkMode } from "./DarkModeContext";
import { FaInstagram, FaFacebook, FaTwitter } from "react-icons/fa";

// Import components
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import AddAd from "./pages/AddAd";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AdminDashboard from "./pages/AdminDashboard";
import About from "./pages/About";
import AdsList from "./components/AdsList";
import AdminLayout from "./components/AdminLayout";
import AdminUserList from "./pages/AdminUserList";
import AdminUserCreate from "./pages/AdminUserCreate";
import AdminUserEdit from "./pages/AdminUserEdit";
import SingleAdPage from "./components/SingleAdPage";
import { CartProvider } from "./CartContext";
import CartCheckout from "./components/CartCheckout";

// Protected Route component
const ProtectedAdminRoute = ({ children, adminOnly = false }) => {
  const { user } = useAuth();
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  if (adminOnly && user.role !== "admin") {
    return <Navigate to="/" replace />;
  }
  return children;
};

function Footer({ isDarkMode }) {
  return (
    <footer
      className={`${
        isDarkMode ? "bg-gray-800 text-gray-200" : "bg-gray-100 text-gray-800"
      } py-6 mt-8`}
    >
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <img
              src="/logo.png"
              alt="ScentSaving Logo"
              className="h-8 w-auto"
            />
          </div>
          <div className="flex space-x-4 mb-4 md:mb-0">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-purple-500"
            >
              <FaInstagram size={24} />
            </a>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-500"
            >
              <FaFacebook size={24} />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-400"
            >
              <FaTwitter size={24} />
            </a>
          </div>
          <div>
            <p>&copy; 2024 ScentSaving. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}

function AppRoutes() {
  const { isDarkMode } = useDarkMode();

  return (
    <Router>
      <div
        className={`App flex flex-col min-h-screen ${
          isDarkMode ? "dark bg-gray-900 text-white" : "bg-white text-black"
        }`}
      >
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/add-ad" element={<AddAd />} />
            <Route path="/annonser" element={<AdsList />} />
            <Route path="/logga-in" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/about" element={<About />} />
            <Route path="/ad/:id" element={<SingleAdPage />} />
            <Route path="/cart" element={<CartCheckout />} />
            <Route
              path="/admin"
              element={
                <ProtectedAdminRoute>
                  <AdminLayout />
                </ProtectedAdminRoute>
              }
            >
              <Route index element={<AdminDashboard />} />
              <Route path="users" element={<AdminUserList />} />
              <Route path="users/create" element={<AdminUserCreate />} />
              <Route path="users/edit/:id" element={<AdminUserEdit />} />
            </Route>
          </Routes>
        </main>
        <Footer isDarkMode={isDarkMode} />
      </div>
    </Router>
  );
}

function App() {
  return (
    <AuthProvider>
      <DarkModeProvider>
        <CartProvider>
          <AppRoutes />
        </CartProvider>
      </DarkModeProvider>
    </AuthProvider>
  );
}

export default App;
