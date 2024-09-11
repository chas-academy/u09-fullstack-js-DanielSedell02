import React, { useState } from "react";
import { Link } from "react-router-dom";
import { UserCircle, Plus, List, Menu, X, Info } from "lucide-react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-white border-b border-gray-200 p-4">
      <div className="container mx-auto">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center group">
            <div className="bg-gray-100 p-2 rounded-full mr-2 transition-all duration-300 group-hover:bg-gray-200 group-hover:shadow-lg group-hover:scale-110">
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
            className="md:hidden text-gray-600 hover:text-gray-800 transition-colors duration-300"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* Desktop menu */}
          <div className="hidden md:flex items-center space-x-4">
            <NavButton to="/add-ad" icon={<Plus size={16} />} text="Add Ad" />
            <NavButton
              to="/annonser"
              icon={<List size={16} />}
              text="annonser"
            />
            <NavButton to="/about" icon={<Info size={16} />} text="About" />
            <NavButton
              to="/Logga-in"
              icon={<UserCircle size={16} />}
              text="Logga in"
            />
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 space-y-2">
            <NavButton
              to="/add-ad"
              icon={<Plus size={16} />}
              text="Add Ad"
              mobile
            />
            <NavButton
              to="/view-ads"
              icon={<List size={16} />}
              text="View Ads"
              mobile
            />
            <NavButton
              to="/about"
              icon={<Info size={16} />}
              text="About"
              mobile
            />
            <NavButton
              to="/Logga-in"
              icon={<UserCircle size={16} />}
              text="Logga in"
              mobile
            />
          </div>
        )}
      </div>
    </nav>
  );
};

const NavButton = ({ to, icon, text, mobile = false }) => (
  <Link
    to={to}
    className={`bg-gray-100 text-gray-700 hover:bg-gray-200 hover:text-purple-600 hover:shadow-lg
                px-4 py-2 rounded-full flex items-center text-sm transition-all duration-300
                hover:scale-105 ${mobile ? "w-full justify-center" : ""}`}
  >
    {icon && (
      <span className="mr-2 transition-transform duration-300 group-hover:scale-110">
        {icon}
      </span>
    )}
    {text}
  </Link>
);

export default Navbar;
