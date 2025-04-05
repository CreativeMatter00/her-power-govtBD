import { useLocale, useTranslations } from "next-intl";
import Link from "next/link";
import { FaCalendarAlt } from "react-icons/fa";
import { GrLocation } from "react-icons/gr";

interface IJobCardProps {
  id: number | string;
  title: string;
  companyName: string;
  description: string;
  location: string;
  time: string;
  type: string;
}

const AllJobCard = ({
  id,
  title,
  companyName,
  description,
  location,
  time,
  type,
}: IJobCardProps) => {
  const locale = useLocale();
  const t = useTranslations("career");

  return (
    <div className="py-2 px-5 bg-brandLsSecondary rounded-md h-full">
      <p className="font-bold text-2xl pb-5"> {title} </p>

      <div className="mb-5">
        <p className="font-bold text-base"> {companyName}</p>
        <p
          className="line-clamp-2"
          dangerouslySetInnerHTML={{ __html: description }}
        ></p>
      </div>

      <div className="flex items-center justify-between gap-8 mb-5">
        <div className="flex items-center gap-2">
          <div className="text-brandPrimary">
            <GrLocation />
          </div>
          <p className="line-clamp-1"> {location} </p>
        </div>

        <div className="flex items-center gap-2">
          <p className="text-brandPrimary">
            <FaCalendarAlt />
          </p>
          <p>
            {" "}
            {time} ({type}){" "}
          </p>
        </div>
      </div>

      <Link href={`/${locale}/career/jobs/${id}`}>
        <button className="bg-brandDs hover:bg-brandHover text-white w-4/5 block mx-auto rounded-full p-2">
          {t("See Details")}
        </button>
      </Link>
    </div>
  );
};

export default AllJobCard;
