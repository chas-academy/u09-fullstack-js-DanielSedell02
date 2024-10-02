import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  UserCircle,
  Plus,
  List,
  Menu,
  X,
  Info,
  LogOut,
  Settings,
  Moon,
  Sun,
} from "lucide-react";
import { useAuth } from "../AuthContext";
import { useDarkMode } from "../DarkModeContext";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/Logga-in");
  };

  return (
    <nav
      className={`${isDarkMode ? "bg-gray-800" : "bg-white"} border-b ${
        isDarkMode ? "border-gray-700" : "border-gray-200"
      } p-4 shadow-sm`}
    >
      <div className="container mx-auto">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center group">
            <div
              className={`${
                isDarkMode ? "bg-gray-700" : "bg-gray-50"
              } p-2 rounded-full mr-2 transition-all duration-300 ${
                isDarkMode
                  ? "group-hover:bg-gray-600"
                  : "group-hover:bg-gray-100"
              } group-hover:shadow-md`}
            >
              <img
                src="/logo.png"
                alt="ScentSaving Logo"
                className="h-20 w-auto object-contain transition-transform duration-300 group-hover:scale-105 rounded-full"
              />
            </div>
          </Link>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className={`md:hidden ${
              isDarkMode ? "text-gray-200" : "text-gray-600"
            } ${
              isDarkMode ? "hover:text-gray-100" : "hover:text-gray-800"
            } transition-colors duration-300`}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* Desktop menu */}
          <div className="hidden md:flex items-center space-x-4">
            <NavButton
              to="/add-ad"
              icon={<Plus size={16} />}
              text="Posta en annons"
            />
            <NavButton
              to="/annonser"
              icon={<List size={16} />}
              text="annonser"
            />
            <NavButton to="/about" icon={<Info size={16} />} text="Om oss" />
            {user ? (
              <>
                <span
                  className={`${
                    isDarkMode ? "text-gray-300" : "text-gray-700"
                  } mr-4 font-medium`}
                >
                  Välkommen, {user.username}!
                </span>
                {user.role === "admin" && (
                  <NavButton
                    to="/admin"
                    icon={<Settings size={16} />}
                    text="Admin"
                  />
                )}
                <button
                  onClick={handleLogout}
                  className={`${
                    isDarkMode
                      ? "bg-gray-700 text-gray-200"
                      : "bg-gray-100 text-gray-700"
                  } ${
                    isDarkMode
                      ? "hover:bg-gray-600 hover:text-white"
                      : "hover:bg-gray-200 hover:text-gray-900"
                  } hover:shadow-md
                             px-4 py-2 rounded-full flex items-center text-sm transition-all duration-300`}
                >
                  <LogOut size={16} className="mr-2" />
                  Logga ut
                </button>
              </>
            ) : (
              <NavButton
                to="/Logga-in"
                icon={<UserCircle size={16} />}
                text="Logga in"
              />
            )}
            <button
              onClick={toggleDarkMode}
              className={`${
                isDarkMode
                  ? "bg-gray-700 text-yellow-300"
                  : "bg-gray-100 text-gray-700"
              } ${
                isDarkMode ? "hover:bg-gray-600" : "hover:bg-gray-200"
              } hover:shadow-md
                         p-2 rounded-full transition-all duration-300`}
            >
              {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div
            className={`md:hidden mt-4 space-y-2 ${
              isDarkMode ? "bg-gray-700" : "bg-gray-50"
            } p-4 rounded-lg`}
          >
            <NavButton
              to="/add-ad"
              icon={<Plus size={16} />}
              text="Posta en annons"
              mobile
            />
            <NavButton
              to="/annonser"
              icon={<List size={16} />}
              text="annonser"
              mobile
            />
            <NavButton
              to="/about"
              icon={<Info size={16} />}
              text="Om oss"
              mobile
            />
            {user ? (
              <>
                <span
                  className={`${
                    isDarkMode ? "text-gray-300" : "text-gray-700"
                  } block mb-2 font-medium`}
                >
                  Välkommen, {user.username}!
                </span>
                {user.role === "admin" && (
                  <NavButton
                    to="/admin"
                    icon={<Settings size={16} />}
                    text="Admin"
                    mobile
                  />
                )}
                <button
                  onClick={handleLogout}
                  className={`${
                    isDarkMode
                      ? "bg-gray-600 text-gray-200"
                      : "bg-gray-100 text-gray-700"
                  } ${
                    isDarkMode
                      ? "hover:bg-gray-500 hover:text-white"
                      : "hover:bg-gray-200 hover:text-gray-900"
                  } hover:shadow-md
                             px-4 py-2 rounded-full flex items-center text-sm transition-all duration-300
                             w-full justify-center`}
                >
                  <LogOut size={16} className="mr-2" />
                  Logga ut
                </button>
              </>
            ) : (
              <NavButton
                to="/Logga-in"
                icon={<UserCircle size={16} />}
                text="Logga in"
                mobile
              />
            )}
            <button
              onClick={toggleDarkMode}
              className={`${
                isDarkMode
                  ? "bg-gray-600 text-yellow-300"
                  : "bg-gray-200 text-gray-700"
              } ${
                isDarkMode ? "hover:bg-gray-500" : "hover:bg-gray-300"
              } hover:shadow-md
                         p-2 rounded-full transition-all duration-300 w-full flex justify-center items-center`}
            >
              {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
              <span className="ml-2">
                {isDarkMode ? "Light Mode" : "Dark Mode"}
              </span>
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

const NavButton = ({ to, icon, text, mobile = false }) => {
  const { isDarkMode } = useDarkMode();
  return (
    <Link
      to={to}
      className={`${
        isDarkMode ? "bg-gray-700 text-gray-200" : "bg-gray-50 text-gray-700"
      } ${
        isDarkMode
          ? "hover:bg-gray-600 hover:text-white"
          : "hover:bg-gray-100 hover:text-gray-900"
      } hover:shadow-md
                  px-4 py-2 rounded-full flex items-center text-sm transition-all duration-300
                  ${mobile ? "w-full justify-center" : ""}`}
    >
      {icon && (
        <span className="mr-2 transition-transform duration-300 group-hover:scale-110">
          {icon}
        </span>
      )}
      {text}
    </Link>
  );
};

export default Navbar;
