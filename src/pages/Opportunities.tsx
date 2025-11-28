import { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import OpportunityCard from "../components/OpportunityCard";

interface Opportunity {
  id: number;
  title: string;
  description: string;
  location: string;
  requiredSkills: string[];
  volunteers: number;
}

export default function Opportunities() {
  const location = useLocation();
  const formRef = useRef<HTMLDivElement>(null);
  const [opportunities, setOpportunities] = useState<Opportunity[]>(() => {
    try {
      const stored = localStorage.getItem("opportunities");
      if (stored) return JSON.parse(stored) as Opportunity[];
    } catch (e) {
      console.error("Failed to parse stored opportunities", e);
      localStorage.removeItem("opportunities");
    }

    return [
      {
        id: 1,
        title: "Community Cleanup",
        description: "Help clean up the local park",
        location: "Central Park",
        requiredSkills: ["Physical tasks", "Teamwork", "Enthusiasm"],
        volunteers: 5,
      },
      {
        id: 2,
        title: "Food Bank",
        description: "Sort and pack food donations",
        location: "Downtown",
        requiredSkills: ["Organization", "Attention to detail", "Problem-solving"],
        volunteers: 8,
      },
      {
        id: 3,
        title: "Tutoring Program",
        description: "Help students with homework",
        location: "School District",
        requiredSkills: ["Communication", "Teaching", "Patience"],
        volunteers: 3,
      },
    ];
  });

  // persist opportunities to localStorage when they change
  useEffect(() => {
    try {
      localStorage.setItem("opportunities", JSON.stringify(opportunities));
    } catch (e) {
      console.error("Failed to save opportunities to localStorage", e);
    }
  }, [opportunities]);

  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    location: "",
    requiredSkills: "",
    volunteers: "",
  });

  // Auto-open form and scroll when navigating from dashboard
  useEffect(() => {
    if (location.state?.scrollToForm) {
      setShowForm(true);
      setTimeout(() => {
        formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 100);
    }
  }, [location.state?.scrollToForm]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddOpportunity = (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !formData.title ||
      !formData.description ||
      !formData.location ||
      !formData.requiredSkills ||
      !formData.volunteers
    ) {
      alert("Please fill in all fields");
      return;
    }

    const newOpportunity: Opportunity = {
      id: Math.max(...opportunities.map((o) => o.id), 0) + 1,
      title: formData.title,
      description: formData.description,
      location: formData.location,
      requiredSkills: formData.requiredSkills
        .split(",")
        .map((skill) => skill.trim())
        .filter((skill) => skill),
      volunteers: parseInt(formData.volunteers),
    };

    setOpportunities([...opportunities, newOpportunity]);
    setFormData({
      title: "",
      description: "",
      location: "",
      requiredSkills: "",
      volunteers: "",
    });
    setShowForm(false);
  };

  const handleDeleteOpportunity = (id: number) => {
    setOpportunities(opportunities.filter((o) => o.id !== id));
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold">Opportunities</h1>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-blue-500 hover:bg-blue-600 text-white px-3 sm:px-4 py-2 rounded-lg transition text-sm sm:text-base"
        >
          {showForm ? "Cancel" : "Add Opportunity"}
        </button>
      </div>

      {showForm && (
        <div ref={formRef} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md mb-6">
          <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">
            Add New Opportunity
          </h2>
          <form onSubmit={handleAddOpportunity} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Opportunity Title
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="e.g. Community Cleanup, Food Bank"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Describe the opportunity in detail"
                rows={3}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Location
                </label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g. Central Park, Downtown"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Volunteers Needed
                </label>
                <input
                  type="number"
                  name="volunteers"
                  value={formData.volunteers}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g. 10"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Required Skills (comma-separated)
              </label>
              <textarea
                name="requiredSkills"
                value={formData.requiredSkills}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="e.g. Leadership, Communication, Problem-solving"
                rows={3}
              />
            </div>

            <button
              type="submit"
              className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3 rounded-lg transition min-h-12"
            >
              Add Opportunity
            </button>
          </form>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {opportunities.map((opportunity) => (
          <div key={opportunity.id} className="relative">
            <OpportunityCard opportunity={opportunity} />
            <button
              onClick={() => handleDeleteOpportunity(opportunity.id)}
              className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded text-sm transition"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
