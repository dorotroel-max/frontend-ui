interface Volunteer {
  id: number;
  name: string;
  role: string;
  hours: number;
  skills: string[];
}

interface VolunteerCardProps {
  volunteer: Volunteer;
}

export default function VolunteerCard({ volunteer }: VolunteerCardProps) {
  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md hover:shadow-lg transition">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
        {volunteer.name}
      </h3>
      <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
        <span className="font-medium">Role:</span> {volunteer.role}
      </p>
      <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
        <span className="font-medium">Hours:</span> {volunteer.hours}
      </p>
      
      <div>
        <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Skills:
        </p>
        <div className="flex flex-wrap gap-2">
          {volunteer.skills.map((skill, index) => (
            <span
              key={index}
              className="inline-block bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-100 text-xs font-medium px-3 py-1 rounded-full"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
