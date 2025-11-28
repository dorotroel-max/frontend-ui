import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-gray-800 text-white p-4 flex gap-4">
      <Link to="/">Dashboard</Link>
      <Link to="/items">Items</Link>
      <Link to="/users">Users</Link>
      <Link to="/settings">Settings</Link>
    </nav>
  );
}
