import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState("");
  const { login, loading } = useAuth();
  const navigate = useNavigate();

  // Load saved email if "Remember Me" was previously checked
  useEffect(() => {
    const savedEmail = localStorage.getItem("rememberEmail");
    const savedRemember = localStorage.getItem("rememberMe") === "true";
    if (savedEmail && savedRemember) {
      setEmail(savedEmail);
      setRememberMe(true);
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      await login(email, password);

      // Save email if "Remember Me" is checked
      if (rememberMe) {
        localStorage.setItem("rememberEmail", email);
        localStorage.setItem("rememberMe", "true");
      } else {
        localStorage.removeItem("rememberEmail");
        localStorage.setItem("rememberMe", "false");
      }

      navigate("/");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md w-full max-w-96">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2 text-center">
          🤝 Volunteer Manager
        </h1>
        <p className="text-center text-gray-600 dark:text-gray-400 mb-8">
          Manage volunteers with ease
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="you@example.com"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="••••••••"
              required
            />
          </div>

          {/* Remember Me Checkbox */}
          <div className="flex items-center">
            <input
              type="checkbox"
              id="rememberMe"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="w-4 h-4 text-blue-500 rounded cursor-pointer"
            />
            <label
              htmlFor="rememberMe"
              className="ml-2 text-sm text-gray-700 dark:text-gray-300 cursor-pointer hover:text-gray-900 dark:hover:text-white"
            >
              Remember me
            </label>
          </div>

          {error && (
            <div className="bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-200 p-3 rounded-lg text-sm">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-500 hover:bg-blue-600 disabled:bg-gray-400 text-white font-bold py-2 rounded-lg transition"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900 rounded-lg text-sm">
          <p className="font-semibold text-gray-900 dark:text-white mb-2">
            📝 Demo Credentials:
          </p>
          <p className="text-gray-700 dark:text-gray-300">
            Email: <span className="font-mono">test@example.com</span>
          </p>
          <p className="text-gray-700 dark:text-gray-300">
            Password: <span className="font-mono">password123</span>
          </p>
        </div>

        {/* Additional Info */}
        <div className="mt-4 p-4 bg-green-50 dark:bg-green-900 rounded-lg text-xs text-gray-700 dark:text-gray-300">
          <p className="font-semibold mb-2">💡 About "Remember Me":</p>
          <ul className="space-y-1 list-disc list-inside">
            <li>Your email will be saved on this device</li>
            <li>You won't need to re-enter your email next time</li>
            <li>Password is never saved</li>
            <li>Only use on your personal devices</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
