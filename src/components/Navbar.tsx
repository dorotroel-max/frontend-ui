import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <nav className="bg-gray-800 text-white p-4 flex justify-between items-center">
      <div className="flex gap-6">
        <Link to="/" className="hover:text-gray-300">Dashboard</Link>
        <Link to="/volunteers" className="hover:text-gray-300">Volunteers</Link>
        <Link to="/opportunities" className="hover:text-gray-300">Opportunities</Link>
        <Link to="/settings" className="hover:text-gray-300">Settings</Link>
      </div>
      <div className="flex items-center gap-4">
        <span className="text-sm">{user?.name}</span>
        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded transition"
        >
          Logout
        </button>
      </div>
    </nav>
  );
}

