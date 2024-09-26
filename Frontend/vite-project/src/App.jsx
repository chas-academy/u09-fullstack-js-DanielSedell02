import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { AuthProvider, useAuth } from "./AuthContext";
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

function AppRoutes() {
  return (
    <Router>
      <div className="App flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/add-ad" element={<AddAd />} />
            <Route path="/annonser" element={<AdsList />} />
            <Route path="/Logga-in" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/about" element={<About />} />
            <Route path="/ad/:id" element={<SingleAdPage />} />
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
        <footer className="bg-gray-100 text-center py-4 mt-8">
          <p>&copy; 2024 ScentSaving. All rights reserved.</p>
        </footer>
      </div>
    </Router>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  );
}

export default App;
