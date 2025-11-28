import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

interface DashboardStats {
  totalVolunteers: number;
  totalHours: number;
  activeOpportunities: number;
  skillsInDemand: string[];
}

export default function Dashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [stats, setStats] = useState<DashboardStats>({
    totalVolunteers: 0,
    totalHours: 0,
    activeOpportunities: 0,
    skillsInDemand: [],
  });

  // Simulate fetching dashboard data
  useEffect(() => {
    setStats({
      totalVolunteers: 12,
      totalHours: 248,
      activeOpportunities: 8,
      skillsInDemand: [
        "Leadership",
        "Communication",
        "Teaching",
        "Organization",
      ],
    });
  }, []);

  const handleAddVolunteer = () => {
    navigate("/volunteers", { state: { scrollToForm: true } });
  };

  const handleCreateOpportunity = () => {
    navigate("/opportunities", { state: { scrollToForm: true } });
  };

  const handleViewReports = () => {
    navigate("/reports");
  };

  return (
    <div>
      <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-2 text-gray-900 dark:text-white">
        Welcome, {user?.name}! 👋
      </h1>
      <p className="text-gray-600 dark:text-gray-400 mb-8">
        Here's an overview of your volunteer management system
      </p>

      {/* Statistics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {/* Total Volunteers Card */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-lg transition">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 dark:text-gray-400 text-sm font-medium">
                Total Volunteers
              </p>
              <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">
                {stats.totalVolunteers}
              </p>
            </div>
            <div className="text-4xl">👥</div>
          </div>
        </div>

        {/* Total Hours Card */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-lg transition">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 dark:text-gray-400 text-sm font-medium">
                Total Hours
              </p>
              <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">
                {stats.totalHours}h
              </p>
            </div>
            <div className="text-4xl">⏱️</div>
          </div>
        </div>

        {/* Active Opportunities Card */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-lg transition">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 dark:text-gray-400 text-sm font-medium">
                Active Opportunities
              </p>
              <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">
                {stats.activeOpportunities}
              </p>
            </div>
            <div className="text-4xl">🎯</div>
          </div>
        </div>

        {/* Impact Score Card */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-lg transition">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 dark:text-gray-400 text-sm font-medium">
                Impact Score
              </p>
              <p className="text-3xl font-bold text-green-600 dark:text-green-400 mt-2">
                {Math.round((stats.totalHours / 10) * (stats.totalVolunteers / 2))}
              </p>
            </div>
            <div className="text-4xl">⭐</div>
          </div>
        </div>
      </div>

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Skills in Demand */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
            🔥 Skills in Demand
          </h2>
          <div className="space-y-3">
            {stats.skillsInDemand.map((skill, index) => (
              <div key={index} className="flex items-center justify-between">
                <span className="text-gray-700 dark:text-gray-300">{skill}</span>
                <div className="w-32 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div
                    className="bg-blue-500 h-2 rounded-full"
                    style={{ width: `${Math.random() * 40 + 60}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
            ⚡ Quick Actions
          </h2>
          <div className="space-y-3">
            <button
              onClick={handleAddVolunteer}
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-3 rounded-lg transition flex items-center justify-center gap-2"
            >
              <span>➕</span> Add New Volunteer
            </button>
            <button
              onClick={handleCreateOpportunity}
              className="w-full bg-green-500 hover:bg-green-600 text-white font-medium py-3 rounded-lg transition flex items-center justify-center gap-2"
            >
              <span>🎯</span> Create Opportunity
            </button>
            <button
              onClick={handleViewReports}
              className="w-full bg-purple-500 hover:bg-purple-600 text-white font-medium py-3 rounded-lg transition flex items-center justify-center gap-2"
            >
              <span>📊</span> View Reports
            </button>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
          📋 Recent Activity
        </h2>
        <div className="space-y-4">
          <div className="flex items-start gap-4 pb-4 border-b border-gray-200 dark:border-gray-700">
            <div className="text-2xl">✅</div>
            <div>
              <p className="font-medium text-gray-900 dark:text-white">
                John Doe completed Community Cleanup
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                2 hours ago
              </p>
            </div>
          </div>
          <div className="flex items-start gap-4 pb-4 border-b border-gray-200 dark:border-gray-700">
            <div className="text-2xl">🆕</div>
            <div>
              <p className="font-medium text-gray-900 dark:text-white">
                New volunteer Jane Smith joined
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                5 hours ago
              </p>
            </div>
          </div>
          <div className="flex items-start gap-4 pb-4">
            <div className="text-2xl">🎯</div>
            <div>
              <p className="font-medium text-gray-900 dark:text-white">
                Food Bank opportunity created
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                1 day ago
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Tips Section */}
      <div className="mt-8 bg-blue-50 dark:bg-blue-900 p-6 rounded-lg border-l-4 border-blue-500">
        <h3 className="text-lg font-bold text-blue-900 dark:text-blue-100 mb-2">
          💡 Pro Tips
        </h3>
        <ul className="text-blue-800 dark:text-blue-200 space-y-2">
          <li>
            ✨ Match volunteers with opportunities based on their skills for
            better outcomes
          </li>
          <li>
            📈 Track volunteer hours to measure impact and recognize top
            contributors
          </li>
          <li>
            🤝 Encourage skill-sharing sessions between experienced and new
            volunteers
          </li>
          <li>
            🏆 Create recognition programs for volunteers who reach milestones
          </li>
        </ul>
      </div>
    </div>
  );
}

