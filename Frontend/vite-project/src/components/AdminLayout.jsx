import React, { useState } from "react";
import { Link, Outlet, Navigate } from "react-router-dom";
import { useAuth } from "../AuthContext";
import { Menu, X } from "lucide-react";

const AdminLayout = () => {
  const { user } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Check if the user is an admin
  if (!user || user.role !== "admin") {
    return <Navigate to="/admin" replace />;
  }

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-100">
      {/* Mobile header */}
      <div className="md:hidden bg-gray-800 text-white p-4 flex justify-between items-center">
        <h2 className="text-xl font-bold">Admin Dashboard</h2>
        <button onClick={toggleSidebar} className="text-white">
          {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Sidebar */}
      <nav
        className={`
        ${sidebarOpen ? "block" : "hidden"} 
        md:block 
        w-full md:w-64 
        bg-gray-800 text-white 
        p-4 
        md:min-h-screen
      `}
      >
        <h2 className="text-2xl font-bold mb-4 hidden md:block">
          Admin Dashboard
        </h2>
        <ul>
          <li>
            <Link
              to="/admin"
              className="block py-2 px-4 hover:bg-gray-700 rounded"
              onClick={() => setSidebarOpen(false)}
            >
              Dashboard
            </Link>
          </li>
          <li>
            <Link
              to="/admin/users"
              className="block py-2 px-4 hover:bg-gray-700 rounded"
              onClick={() => setSidebarOpen(false)}
            >
              Hantera användare
            </Link>
          </li>
          <li>
            <Link
              to="/admin/users/create"
              className="block py-2 px-4 hover:bg-gray-700 rounded"
              onClick={() => setSidebarOpen(false)}
            >
              Skapa användare
            </Link>
          </li>
        </ul>
      </nav>

      {/* Main content */}
      <main className="flex-grow p-4 md:p-8">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
