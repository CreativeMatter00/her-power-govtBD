import React from "react";
import DeveloperCard from "./DeveloperCard";

const developers = [
  {
    name: "Ripa Sultana",
    role: "Java Developer",
    skills: ["Java", "Spring", "Hibernate"],
    rate: "$40/hr",
    imageUrl:
      "/assets/images/talent-hunt/matheus-ferrero-W7b3eDUb_2I-unsplash.jpg",
  },
  {
    name: "Tanisha Rahman",
    role: "JavaScript Developer",
    skills: ["JavaScript", "React", "Node.js"],
    rate: "$35/hr",
    imageUrl:
      "/assets/images/talent-hunt/matheus-ferrero-W7b3eDUb_2I-unsplash.jpg",
  },
  {
    name: "Tasnim Tushi",
    role: "PHP Developer",
    skills: ["PHP", "Laravel", "Symfony"],
    rate: "$30/hr",
    imageUrl:
      "/assets/images/talent-hunt/matheus-ferrero-W7b3eDUb_2I-unsplash.jpg",
  },
];

const DeveloperList: React.FC = () => {
  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold mb-4">Java Developer</h2>
      <div className="grid grid-cols-3 gap-4">
        {developers.map((developer) => (
          <DeveloperCard key={developer.name} {...developer} />
        ))}
      </div>
    </div>
  );
};

export default DeveloperList;
