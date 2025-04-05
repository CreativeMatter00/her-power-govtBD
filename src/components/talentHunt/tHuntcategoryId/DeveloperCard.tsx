import React from "react";

interface DeveloperCardProps {
  name: string;
  role: string;
  skills: string[];
  rate: string;
  imageUrl: string;
}

const DeveloperCard: React.FC<DeveloperCardProps> = ({
  name,
  role,
  skills,
  rate,
  imageUrl,
}) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <img
        src={imageUrl}
        alt={name}
        className="w-16 h-16 rounded-full mx-auto"
      />
      <h3 className="text-xl font-bold mt-4">{name}</h3>
      <p className="text-gray-600">{role}</p>
      <div className="mt-2">
        {skills.map((skill) => (
          <span
            key={skill}
            className="inline-block bg-gray-200 text-gray-700 rounded-full px-2 py-1 text-xs mr-1"
          >
            {skill}
          </span>
        ))}
      </div>
      <p className="mt-4 text-purple-700 font-bold">{rate}</p>
    </div>
  );
};

export default DeveloperCard;
