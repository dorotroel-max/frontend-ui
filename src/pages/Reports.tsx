import { useState } from "react";

interface ReportData {
  volunteerName: string;
  hoursWorked: number;
  opportunitiesCompleted: number;
  skillsUsed: string[];
  lastActivity: string;
}

interface OpportunityReport {
  title: string;
  volunteersAssigned: number;
  hoursAllocated: number;
  status: "Active" | "Completed" | "Pending";
  skillsRequired: string[];
}

export default function Reports() {
  const [reportType, setReportType] = useState<"volunteers" | "opportunities" | "skills">(
    "volunteers"
  );

  const volunteerReports: ReportData[] = [
    {
      volunteerName: "John Ace",
      hoursWorked: 40,
      opportunitiesCompleted: 3,
      skillsUsed: ["Leadership", "Communication"],
      lastActivity: "2024-01-15",
    },
    {
      volunteerName: "Jane Yap",
      hoursWorked: 32,
      opportunitiesCompleted: 2,
      skillsUsed: ["Organization", "Teamwork"],
      lastActivity: "2024-01-14",
    },
    {
      volunteerName: "Bob Johnson",
      hoursWorked: 16,
      opportunitiesCompleted: 1,
      skillsUsed: ["Enthusiasm"],
      lastActivity: "2024-01-13",
    },
  ];

  const opportunityReports: OpportunityReport[] = [
    {
      title: "Community Cleanup",
      volunteersAssigned: 5,
      hoursAllocated: 20,
      status: "Completed",
      skillsRequired: ["Physical tasks", "Teamwork"],
    },
    {
      title: "Food Bank",
      volunteersAssigned: 8,
      hoursAllocated: 32,
      status: "Active",
      skillsRequired: ["Organization", "Problem-solving"],
    },
    {
      title: "Tutoring Program",
      volunteersAssigned: 3,
      hoursAllocated: 12,
      status: "Pending",
      skillsRequired: ["Communication", "Teaching"],
    },
  ];

  const skillsData = [
    { skill: "Leadership", demand: 8, volunteers: 3 },
    { skill: "Communication", demand: 9, volunteers: 5 },
    { skill: "Problem-solving", demand: 7, volunteers: 4 },
    { skill: "Teamwork", demand: 10, volunteers: 6 },
    { skill: "Teaching", demand: 6, volunteers: 2 },
    { skill: "Organization", demand: 8, volunteers: 4 },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Completed":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
      case "Active":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200";
      case "Pending":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200";
    }
  };

  const totalHours = volunteerReports.reduce((sum, v) => sum + v.hoursWorked, 0);
  const totalOpportunities = opportunityReports.length;
  const totalVolunteers = volunteerReports.length;

  return (
    <div>
      <h1 className="text-4xl font-bold mb-2 text-gray-900 dark:text-white">
        📊 Reports & Analytics
      </h1>
      <p className="text-gray-600 dark:text-gray-400 mb-8">
        View detailed analytics about volunteers and opportunities
      </p>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-lg transition">
          <p className="text-gray-600 dark:text-gray-400 text-sm font-medium">
            Total Volunteers
          </p>
          <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">
            {totalVolunteers}
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
            Active contributors
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-lg transition">
          <p className="text-gray-600 dark:text-gray-400 text-sm font-medium">
            Total Hours
          </p>
          <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">
            {totalHours}h
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
            Time contributed
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-lg transition">
          <p className="text-gray-600 dark:text-gray-400 text-sm font-medium">
            Opportunities
          </p>
          <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">
            {totalOpportunities}
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
            Total initiatives
          </p>
        </div>
      </div>

      {/* Report Type Selector */}
      <div className="mb-6 flex gap-4 flex-wrap">
        <button
          onClick={() => setReportType("volunteers")}
          className={`px-4 py-2 rounded-lg font-medium transition ${
            reportType === "volunteers"
              ? "bg-blue-500 text-white"
              : "bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-600"
          }`}
        >
          👥 Volunteer Reports
        </button>
        <button
          onClick={() => setReportType("opportunities")}
          className={`px-4 py-2 rounded-lg font-medium transition ${
            reportType === "opportunities"
              ? "bg-blue-500 text-white"
              : "bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-600"
          }`}
        >
          🎯 Opportunity Reports
        </button>
        <button
          onClick={() => setReportType("skills")}
          className={`px-4 py-2 rounded-lg font-medium transition ${
            reportType === "skills"
              ? "bg-blue-500 text-white"
              : "bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-600"
          }`}
        >
          🔥 Skills Analysis
        </button>
      </div>

      {/* Volunteer Reports */}
      {reportType === "volunteers" && (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-100 dark:bg-gray-700">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900 dark:text-white">
                    Volunteer Name
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900 dark:text-white">
                    Hours Worked
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900 dark:text-white">
                    Opportunities
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900 dark:text-white">
                    Skills Used
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900 dark:text-white">
                    Last Activity
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {volunteerReports.map((report, idx) => (
                  <tr
                    key={idx}
                    className="hover:bg-gray-50 dark:hover:bg-gray-700 transition"
                  >
                    <td className="px-6 py-4 text-sm text-gray-900 dark:text-white font-medium">
                      {report.volunteerName}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-300">
                      {report.hoursWorked}h
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-300">
                      {report.opportunitiesCompleted}
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <div className="flex flex-wrap gap-2">
                        {report.skillsUsed.map((skill, i) => (
                          <span
                            key={i}
                            className="inline-block bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-100 px-2 py-1 rounded text-xs"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-300">
                      {report.lastActivity}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Opportunity Reports */}
      {reportType === "opportunities" && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {opportunityReports.map((report, idx) => (
            <div
              key={idx}
              className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-lg transition"
            >
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                  {report.title}
                </h3>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(
                    report.status
                  )}`}
                >
                  {report.status}
                </span>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    Volunteers Assigned:
                  </span>
                  <span className="text-sm font-semibold text-gray-900 dark:text-white">
                    {report.volunteersAssigned}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    Hours Allocated:
                  </span>
                  <span className="text-sm font-semibold text-gray-900 dark:text-white">
                    {report.hoursAllocated}h
                  </span>
                </div>

                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                    Required Skills:
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {report.skillsRequired.map((skill, i) => (
                      <span
                        key={i}
                        className="inline-block bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-100 px-2 py-1 rounded text-xs"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Skills Analysis */}
      {reportType === "skills" && (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Skill Demand vs Supply
          </h2>
          <div className="space-y-6">
            {skillsData.map((item, idx) => (
              <div key={idx} className="border-b border-gray-200 dark:border-gray-700 pb-6">
                <div className="flex justify-between mb-2">
                  <h3 className="font-semibold text-gray-900 dark:text-white">
                    {item.skill}
                  </h3>
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    Demand: {item.demand} | Available: {item.volunteers}
                  </span>
                </div>

                <div className="space-y-2">
                  <div>
                    <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">
                      Demand Level
                    </p>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div
                        className="bg-red-500 h-2 rounded-full"
                        style={{ width: `${(item.demand / 10) * 100}%` }}
                      ></div>
                    </div>
                  </div>

                  <div>
                    <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">
                      Volunteer Supply
                    </p>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div
                        className="bg-green-500 h-2 rounded-full"
                        style={{ width: `${(item.volunteers / 10) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                </div>

                {item.demand > item.volunteers && (
                  <p className="text-xs text-red-600 dark:text-red-400 mt-2">
                    ⚠️ Gap: {item.demand - item.volunteers} volunteers needed
                  </p>
                )}
                {item.demand <= item.volunteers && (
                  <p className="text-xs text-green-600 dark:text-green-400 mt-2">
                    ✅ Sufficient volunteers available
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Export Section */}
      <div className="mt-8 p-4 bg-blue-50 dark:bg-blue-900 rounded-lg border border-blue-200 dark:border-blue-700">
        <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-3">
          📥 Export Options
        </h3>
        <div className="flex gap-3 flex-wrap">
          <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition text-sm font-medium">
            📄 Export as PDF
          </button>
          <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition text-sm font-medium">
            📊 Export as CSV
          </button>
          <button className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-lg transition text-sm font-medium">
            🖨️ Print Report
          </button>
        </div>
      </div>
    </div>
  );
}
