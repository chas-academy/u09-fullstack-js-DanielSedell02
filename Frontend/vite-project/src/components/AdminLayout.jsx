import React from "react";
import { Link, Outlet, Navigate } from "react-router-dom";
import { useAuth } from "../AuthContext"; // Assume you have an AuthContext

const AdminLayout = () => {
  const { user } = useAuth();

  // Check if the user is an admin
  if (!user || user.role !== "admin") {
    return <Navigate to="/admin" replace />;
  }

  return (
    <div className="flex">
      <nav className="w-64 min-h-screen bg-gray-800 text-white p-4">
        <h2 className="text-2xl font-bold mb-4">Admin Dashboard</h2>
        <ul>
          <li>
            <Link to="/admin" className="block py-2">
              Dashboard
            </Link>
          </li>
          <li>
            <Link to="/admin/users" className="block py-2">
              Hantera användare
            </Link>
          </li>
          <li>
            <Link to="/admin/users/create" className="block py-2">
              Skapa användare
            </Link>
          </li>
        </ul>
      </nav>
      <main className="flex-grow p-8">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
