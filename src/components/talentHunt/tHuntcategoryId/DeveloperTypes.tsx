import { useTranslations } from "next-intl";
import Image from "next/image";
import { MdStarRate } from "react-icons/md";

const DeveloperTypes: React.FC = () => {
  const t = useTranslations("talentHunt");

  const types = [
    "Java Developer",
    "JavaScript Developer",
    "PHP Developer",
    "iOS Developer",
    "SQL Developer",
    "Data Analyst",
    "QA Engineer",
  ];

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold mb-4">
        {t("What_type_of_developers_do_you_need")}
      </h2>
      <div className="grid lg:grid-cols-4 gap-4">
        {types.map((type) => (
          <div
            key={type}
            className="bg-[#F3E9F6] p-4 rounded-lg group cursor-pointer hover:bg-[#D0B4DA]"
          >
            <p className="text-xl font-bold mb-3">{type}</p>
            <div className=" flex gap-1 items-center text-[#5C5C5C] text-sm font-medium mb-3">
              <MdStarRate color="#59187B" fontSize={20} className="" />
              4.5/5 average rating
            </div>
            <div className="flex ">
              <Image
                src="/assets/images/talent-hunt/alex-mccarthy-RGKdWJOUFH0-unsplash.jpg"
                height={40}
                width={40}
                alt="Hero Image"
                className="w-10 rounded-full h-10  bg-[#D9D9D9]  duration-300"
              />
              <Image
                src="/assets/images/talent-hunt/angshu-purkait-pgQ1-bDAkTQ-unsplash.jpg"
                height={40}
                width={40}
                alt="Hero Image"
                className="w-10 rounded-full h-10 -translate-x-5 bg-[#D9D9D9] group-hover:-translate-x-2.5 duration-300"
              />
              <Image
                src="/assets/images/talent-hunt/Rectangle 108.png"
                height={40}
                width={40}
                alt="Hero Image"
                className="w-10 rounded-full h-10 -translate-x-10 bg-[#D9D9D9] group-hover:-translate-x-5 duration-300"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DeveloperTypes;
