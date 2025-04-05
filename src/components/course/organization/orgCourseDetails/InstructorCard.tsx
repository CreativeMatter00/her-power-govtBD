import Image from "next/image";

interface InstructorCardProps {
  name: string;
  details: string;
  image: string;
}

const InstructorCard: React.FC<InstructorCardProps> = ({
  name,
  details,
  image,
}) => {
  return (
    <div className="flex items-start space-x-4 p-4 bg-white shadow rounded-lg">
      <Image
        src={image}
        alt={name}
        className="rounded-lg h-36 w-36"
        height={140}
        width={140}
      />
      <div>
        <h3 className="text-xl font-semibold text-gray-800">{name}</h3>
        <p className="text-gray-600">{details}</p>
      </div>
    </div>
  );
};

export default InstructorCard;
