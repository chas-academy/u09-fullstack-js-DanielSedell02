import React, { useState } from "react";
import { Link } from "react-router-dom";
import { UserCircle, Plus, List, Menu, X, Info } from "lucide-react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-white border-b border-gray-200 p-4">
      <div className="container mx-auto">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <img src="" alt="Logo" className="h-8 w-8 mr-2" />
            <span className="text-gray-800 text-xl font-bold">ScentSaving</span>
          </div>

          {/* Mobil meny */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-gray-600 hover:text-gray-800"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* Desktop meny */}
          <div className="hidden md:flex items-center space-x-4">
            <NavButton
              to="/+ Annons"
              icon={<Plus size={16} />}
              text=" Annons"
            />
            <NavButton
              to="/view-ads"
              icon={<List size={16} />}
              text="View Ads"
            />
            <NavButton to="/about" icon={<Info size={16} />} text="About" />
            <NavButton
              to="/login"
              icon={<UserCircle size={16} />}
              text="Log In"
            />
          </div>
        </div>

        {/* Mobil meny */}
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
              to="/login"
              icon={<UserCircle size={16} />}
              text="Log In"
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
    className={`bg-gray-100 text-gray-700 hover:bg-gray-200 px-4 py-2 rounded-full flex items-center text-sm
                ${mobile ? "w-full justify-center" : ""}`}
  >
    {icon && <span className="mr-2">{icon}</span>}
    {text}
  </Link>
);

export default Navbar;
