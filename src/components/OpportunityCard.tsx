interface Opportunity {
  id: number;
  title: string;
  description: string;
  location: string;
  requiredSkills: string[];
  volunteers: number;
}

interface OpportunityCardProps {
  opportunity: Opportunity;
}

export default function OpportunityCard({ opportunity }: OpportunityCardProps) {
  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md hover:shadow-lg transition">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
        {opportunity.title}
      </h3>
      <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
        {opportunity.description}
      </p>
      <p className="text-xs text-gray-500 dark:text-gray-500 mb-3">
        📍 {opportunity.location}
      </p>

      <div className="mb-3 pb-3 border-b border-gray-200 dark:border-gray-700">
        <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          👥 Volunteers Needed: <span className="text-blue-600 dark:text-blue-400 font-bold">{opportunity.volunteers}</span>
        </p>
      </div>

      <div>
        <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Required Skills:
        </p>
        <div className="flex flex-wrap gap-2">
          {opportunity.requiredSkills.map((skill, index) => (
            <span
              key={index}
              className="inline-block bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-100 text-xs font-medium px-3 py-1 rounded-full"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
