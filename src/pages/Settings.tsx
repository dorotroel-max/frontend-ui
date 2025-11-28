import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";

interface SettingsData {
  organizationName: string;
  email: string;
  theme: "light" | "dark" | "auto";
  notifications: {
    emailNotifications: boolean;
    newVolunteerAlerts: boolean;
    opportunityReminders: boolean;
    weeklyDigest: boolean;
  };
  privacy: {
    profileVisibility: "public" | "private" | "friends";
    dataCollection: boolean;
  };
}

export default function Settings() {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState<
    "account" | "notifications" | "privacy" | "about"
  >("account");
  const [settings, setSettings] = useState<SettingsData>({
    organizationName: "Volunteer Management System",
    email: user?.email || "",
    theme: "auto",
    notifications: {
      emailNotifications: true,
      newVolunteerAlerts: true,
      opportunityReminders: true,
      weeklyDigest: false,
    },
    privacy: {
      profileVisibility: "private",
      dataCollection: true,
    },
  });

  const [saveMessage, setSaveMessage] = useState("");
  const [editMode, setEditMode] = useState(false);

  const handleSettingChange = (key: string, value: any) => {
    setSettings((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleNotificationChange = (key: string, value: boolean) => {
    setSettings((prev) => ({
      ...prev,
      notifications: {
        ...prev.notifications,
        [key]: value,
      },
    }));
  };

  const handlePrivacyChange = (key: string, value: any) => {
    setSettings((prev) => ({
      ...prev,
      privacy: {
        ...prev.privacy,
        [key]: value,
      },
    }));
  };

  const handleSaveSettings = () => {
    localStorage.setItem("volunteerSettings", JSON.stringify(settings));
    setSaveMessage("✅ Settings saved successfully!");
    setTimeout(() => setSaveMessage(""), 3000);
  };

  // Load settings from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("volunteerSettings");
    if (saved) {
      try {
        setSettings(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to load settings", e);
      }
    }
  }, []);

  return (
    <div>
      <h1 className="text-4xl font-bold mb-2 text-gray-900 dark:text-white">
        ⚙️ Settings
      </h1>
      <p className="text-gray-600 dark:text-gray-400 mb-8">
        Manage your account and preferences
      </p>

      {/* Tabs */}
      <div className="flex gap-4 mb-6 border-b border-gray-200 dark:border-gray-700 overflow-x-auto">
        <button
          onClick={() => setActiveTab("account")}
          className={`px-4 py-2 font-medium border-b-2 transition whitespace-nowrap ${
            activeTab === "account"
              ? "border-blue-500 text-blue-600 dark:text-blue-400"
              : "border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
          }`}
        >
          👤 Account
        </button>
        <button
          onClick={() => setActiveTab("notifications")}
          className={`px-4 py-2 font-medium border-b-2 transition whitespace-nowrap ${
            activeTab === "notifications"
              ? "border-blue-500 text-blue-600 dark:text-blue-400"
              : "border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
          }`}
        >
          🔔 Notifications
        </button>
        <button
          onClick={() => setActiveTab("privacy")}
          className={`px-4 py-2 font-medium border-b-2 transition whitespace-nowrap ${
            activeTab === "privacy"
              ? "border-blue-500 text-blue-600 dark:text-blue-400"
              : "border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
          }`}
        >
          🔒 Privacy
        </button>
        <button
          onClick={() => setActiveTab("about")}
          className={`px-4 py-2 font-medium border-b-2 transition whitespace-nowrap ${
            activeTab === "about"
              ? "border-blue-500 text-blue-600 dark:text-blue-400"
              : "border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
          }`}
        >
          ℹ️ About
        </button>
      </div>

      {saveMessage && (
        <div className="mb-4 p-4 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded-lg">
          {saveMessage}
        </div>
      )}

      {/* Account Settings */}
      {activeTab === "account" && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Account Info */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Account Information
            </h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Name
                </label>
                <input
                  type="text"
                  value={user?.name || ""}
                  disabled
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white bg-gray-100 cursor-not-allowed"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  value={user?.email || ""}
                  disabled
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white bg-gray-100 cursor-not-allowed"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Organization Name
                </label>
                <input
                  type="text"
                  value={settings.organizationName}
                  onChange={(e) =>
                    handleSettingChange("organizationName", e.target.value)
                  }
                  disabled={!editMode}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100 dark:disabled:bg-gray-700"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Theme Preference
                </label>
                <select
                  value={settings.theme}
                  onChange={(e) =>
                    handleSettingChange("theme", e.target.value)
                  }
                  disabled={!editMode}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100 dark:disabled:bg-gray-700"
                >
                  <option value="auto">Auto (System)</option>
                  <option value="light">Light</option>
                  <option value="dark">Dark</option>
                </select>
              </div>
            </div>
          </div>

          {/* Danger Zone */}
          <div className="bg-red-50 dark:bg-red-900 p-6 rounded-lg shadow-md border border-red-200 dark:border-red-700">
            <h2 className="text-2xl font-bold text-red-900 dark:text-red-100 mb-6">
              ⚠️ Danger Zone
            </h2>

            <div className="space-y-4">
              <button className="w-full bg-orange-500 hover:bg-orange-600 text-white font-medium py-3 rounded-lg transition">
                🔄 Change Password
              </button>
              <button className="w-full bg-red-500 hover:bg-red-600 text-white font-medium py-3 rounded-lg transition">
                🗑️ Delete Account
              </button>
              <button
                onClick={() => {
                  logout();
                  window.location.href = "/login";
                }}
                className="w-full bg-gray-500 hover:bg-gray-600 text-white font-medium py-3 rounded-lg transition"
              >
                🚪 Logout
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Notification Settings */}
      {activeTab === "notifications" && (
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md max-w-2xl">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Notification Preferences
          </h2>

          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition">
              <div>
                <p className="font-medium text-gray-900 dark:text-white">
                  📧 Email Notifications
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Receive email updates about your account
                </p>
              </div>
              <input
                type="checkbox"
                checked={settings.notifications.emailNotifications}
                onChange={(e) =>
                  handleNotificationChange("emailNotifications", e.target.checked)
                }
                className="w-5 h-5 cursor-pointer"
              />
            </div>

            <div className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition">
              <div>
                <p className="font-medium text-gray-900 dark:text-white">
                  👥 New Volunteer Alerts
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Get notified when new volunteers join
                </p>
              </div>
              <input
                type="checkbox"
                checked={settings.notifications.newVolunteerAlerts}
                onChange={(e) =>
                  handleNotificationChange("newVolunteerAlerts", e.target.checked)
                }
                className="w-5 h-5 cursor-pointer"
              />
            </div>

            <div className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition">
              <div>
                <p className="font-medium text-gray-900 dark:text-white">
                  🎯 Opportunity Reminders
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Receive reminders for upcoming opportunities
                </p>
              </div>
              <input
                type="checkbox"
                checked={settings.notifications.opportunityReminders}
                onChange={(e) =>
                  handleNotificationChange("opportunityReminders", e.target.checked)
                }
                className="w-5 h-5 cursor-pointer"
              />
            </div>

            <div className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition">
              <div>
                <p className="font-medium text-gray-900 dark:text-white">
                  📬 Weekly Digest
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Receive a weekly summary of your volunteer activity
                </p>
              </div>
              <input
                type="checkbox"
                checked={settings.notifications.weeklyDigest}
                onChange={(e) =>
                  handleNotificationChange("weeklyDigest", e.target.checked)
                }
                className="w-5 h-5 cursor-pointer"
              />
            </div>
          </div>
        </div>
      )}

      {/* Privacy Settings */}
      {activeTab === "privacy" && (
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md max-w-2xl">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Privacy & Security
          </h2>

          <div className="space-y-6">
            <div>
              <h3 className="font-medium text-gray-900 dark:text-white mb-4">
                👀 Profile Visibility
              </h3>
              <div className="space-y-3">
                <label className="flex items-center p-3 border border-gray-200 dark:border-gray-700 rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 transition">
                  <input
                    type="radio"
                    name="visibility"
                    value="public"
                    checked={settings.privacy.profileVisibility === "public"}
                    onChange={(e) =>
                      handlePrivacyChange("profileVisibility", e.target.value)
                    }
                    className="w-4 h-4 cursor-pointer"
                  />
                  <div className="ml-3">
                    <p className="font-medium text-gray-900 dark:text-white">
                      Public
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Anyone can view your profile
                    </p>
                  </div>
                </label>

                <label className="flex items-center p-3 border border-gray-200 dark:border-gray-700 rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 transition">
                  <input
                    type="radio"
                    name="visibility"
                    value="friends"
                    checked={settings.privacy.profileVisibility === "friends"}
                    onChange={(e) =>
                      handlePrivacyChange("profileVisibility", e.target.value)
                    }
                    className="w-4 h-4 cursor-pointer"
                  />
                  <div className="ml-3">
                    <p className="font-medium text-gray-900 dark:text-white">
                      Friends Only
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Only your connections can see your profile
                    </p>
                  </div>
                </label>

                <label className="flex items-center p-3 border border-gray-200 dark:border-gray-700 rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 transition">
                  <input
                    type="radio"
                    name="visibility"
                    value="private"
                    checked={settings.privacy.profileVisibility === "private"}
                    onChange={(e) =>
                      handlePrivacyChange("profileVisibility", e.target.value)
                    }
                    className="w-4 h-4 cursor-pointer"
                  />
                  <div className="ml-3">
                    <p className="font-medium text-gray-900 dark:text-white">
                      Private
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Only you can view your profile
                    </p>
                  </div>
                </label>
              </div>
            </div>

            <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">
                    📊 Data Collection
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Allow us to collect usage analytics to improve the app
                  </p>
                </div>
                <input
                  type="checkbox"
                  checked={settings.privacy.dataCollection}
                  onChange={(e) =>
                    handlePrivacyChange("dataCollection", e.target.checked)
                  }
                  className="w-5 h-5 cursor-pointer"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* About */}
      {activeTab === "about" && (
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md max-w-2xl">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            About This App
          </h2>

          <div className="space-y-6">
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                📱 Volunteer Management System
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                A comprehensive platform for managing volunteers, opportunities, and
                tracking volunteer hours and skills.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                Version
              </h3>
              <p className="text-gray-600 dark:text-gray-400">1.0.0</p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                🔗 Quick Links
              </h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-blue-500 hover:text-blue-600">
                    📖 Documentation
                  </a>
                </li>
                <li>
                  <a href="#" className="text-blue-500 hover:text-blue-600">
                    🐛 Report a Bug
                  </a>
                </li>
                <li>
                  <a href="#" className="text-blue-500 hover:text-blue-600">
                    💬 Send Feedback
                  </a>
                </li>
                <li>
                  <a href="#" className="text-blue-500 hover:text-blue-600">
                    📋 Terms of Service
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                ❤️ Credits
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Built with React, TypeScript, and Tailwind CSS
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Save Button */}
      {activeTab !== "about" && (
        <div className="mt-8 flex gap-4">
          <button
            onClick={() => setEditMode(!editMode)}
            className={`px-6 py-2 rounded-lg font-medium transition ${
              editMode
                ? "bg-gray-500 hover:bg-gray-600 text-white"
                : "bg-blue-500 hover:bg-blue-600 text-white"
            }`}
          >
            {editMode ? "❌ Cancel" : "✏️ Edit"}
          </button>
          {editMode && (
            <button
              onClick={handleSaveSettings}
              className="px-6 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg font-medium transition"
            >
              💾 Save Changes
            </button>
          )}
        </div>
      )}
    </div>
  );
}

