import { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import VolunteerCard from "../components/VolunteerCard";

interface Volunteer {
  id: number;
  name: string;
  role: string;
  hours: number;
  skills: string[];
}

export default function Volunteers() {
  const location = useLocation();
  const formRef = useRef<HTMLDivElement>(null);
  const [volunteers, setVolunteers] = useState<Volunteer[]>(() => {
    try {
      const stored = localStorage.getItem("volunteers");
      if (stored) return JSON.parse(stored) as Volunteer[];
    } catch (e) {
      console.error("Failed to parse stored volunteers", e);
      localStorage.removeItem("volunteers");
    }

    return [
      {
        id: 1,
        name: "John Ace",
        role: "Team Lead",
        hours: 40,
        skills: ["Leadership", "Planning", "Communication"],
      },
      {
        id: 2,
        name: "Jane Smith",
        role: "Coordinator",
        hours: 32,
        skills: ["Organization", "Problem-solving", "Teamwork"],
      },
      {
        id: 3,
        name: "Bob Johnson",
        role: "Volunteer",
        hours: 16,
        skills: ["Enthusiasm", "Physical tasks"],
      },
    ];
  });

  // persist volunteers to localStorage when they change
  useEffect(() => {
    try {
      localStorage.setItem("volunteers", JSON.stringify(volunteers));
    } catch (e) {
      console.error("Failed to save volunteers to localStorage", e);
    }
  }, [volunteers]);

  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    role: "",
    hours: "",
    skills: "",
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

  const handleAddVolunteer = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.role || !formData.hours || !formData.skills) {
      alert("Please fill in all fields");
      return;
    }

    const newVolunteer: Volunteer = {
      id: Math.max(...volunteers.map((v) => v.id), 0) + 1,
      name: formData.name,
      role: formData.role,
      hours: parseInt(formData.hours),
      skills: formData.skills
        .split(",")
        .map((skill) => skill.trim())
        .filter((skill) => skill),
    };

    setVolunteers([...volunteers, newVolunteer]);
    setFormData({ name: "", role: "", hours: "", skills: "" });
    setShowForm(false);
  };

  const handleDeleteVolunteer = (id: number) => {
    setVolunteers(volunteers.filter((v) => v.id !== id));
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold">Volunteers</h1>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-blue-500 hover:bg-blue-600 text-white px-3 sm:px-4 py-2 rounded-lg transition text-sm sm:text-base"
        >
          {showForm ? "Cancel" : "Add Volunteer"}
        </button>
      </div>

      {showForm && (
        <div ref={formRef} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md mb-6">
          <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">
            Add New Volunteer
          </h2>
          <form onSubmit={handleAddVolunteer} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter volunteer name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Role
                </label>
                <input
                  type="text"
                  name="role"
                  value={formData.role}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g. Team Lead, Coordinator"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Volunteer Hours
                </label>
                <input
                  type="number"
                  name="hours"
                  value={formData.hours}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g. 20"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Skills (comma-separated)
              </label>
              <textarea
                name="skills"
                value={formData.skills}
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
              Add Volunteer
            </button>
          </form>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {volunteers.map((volunteer) => (
          <div key={volunteer.id} className="relative">
            <VolunteerCard volunteer={volunteer} />
            <button
              onClick={() => handleDeleteVolunteer(volunteer.id)}
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
