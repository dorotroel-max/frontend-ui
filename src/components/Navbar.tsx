import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";

export default function Navbar() {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="flex justify-between items-center">
        <Link to="/" className="font-bold text-lg hover:text-gray-300">
          🤝 Volunteer Manager
        </Link>

        {/* Hamburger Menu Button - Mobile */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden flex flex-col gap-1"
          aria-label="Toggle menu"
        >
          <span className="w-6 h-0.5 bg-white block"></span>
          <span className="w-6 h-0.5 bg-white block"></span>
          <span className="w-6 h-0.5 bg-white block"></span>
        </button>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-6 items-center">
          <Link to="/" className="hover:text-gray-300 transition">
            Dashboard
          </Link>
          <Link to="/volunteers" className="hover:text-gray-300 transition">
            Volunteers
          </Link>
          <Link to="/opportunities" className="hover:text-gray-300 transition">
            Opportunities
          </Link>
          <Link to="/settings" className="hover:text-gray-300 transition">
            Settings
          </Link>
          <span className="text-sm">{user?.name}</span>
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded transition text-sm"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Mobile Menu - Dropdown */}
      {menuOpen && (
        <div className="md:hidden mt-4 space-y-3 pb-4 border-t border-gray-700 pt-4">
          <Link
            to="/"
            onClick={() => setMenuOpen(false)}
            className="block hover:text-gray-300 transition"
          >
            Dashboard
          </Link>
          <Link
            to="/volunteers"
            onClick={() => setMenuOpen(false)}
            className="block hover:text-gray-300 transition"
          >
            Volunteers
          </Link>
          <Link
            to="/opportunities"
            onClick={() => setMenuOpen(false)}
            className="block hover:text-gray-300 transition"
          >
            Opportunities
          </Link>
          <Link
            to="/settings"
            onClick={() => setMenuOpen(false)}
            className="block hover:text-gray-300 transition"
          >
            Settings
          </Link>
          <div className="pt-4 border-t border-gray-700">
            <p className="text-sm mb-3">Logged in as: {user?.name}</p>
            <button
              onClick={() => {
                handleLogout();
                setMenuOpen(false);
              }}
              className="w-full bg-red-500 hover:bg-red-600 px-4 py-2 rounded transition text-sm"
            >
              Logout
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}

