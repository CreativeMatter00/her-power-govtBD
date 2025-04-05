import { useLocale, useTranslations } from "next-intl";
import Link from "next/link";
import React from "react";
import { FaCalendarAlt } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { GrLocation } from "react-icons/gr";

interface IJobCartProps {
  id: number | string;
  title: string;
  companyName: string;
  description: string;
  location: string;
  time: string;
  type: string;
}

const JobsCard = ({
  id,
  title,
  companyName,
  description,
  location,
  time,
  type,
}: IJobCartProps) => {
  const t = useTranslations("career");

  const locale = useLocale();
  return (
    <div className="col-span-1 bg-brandLsSecondary p-8  flex flex-col justify-between gap-5">
      <div className="">
        <p className="text-black font-bold text-2xl">{title}</p>
        <p className="font-bold mt-1">{companyName}</p>
        <p
          className="line-clamp-4 md:line-clamp-3 text-opacity-80 mt-2"
          dangerouslySetInnerHTML={{
            __html: description,
          }}
        />
      </div>
      <div>
        <div className="flex justify-between items-center mt-2">
          <div className="flex items-center gap-2 ">
            <GrLocation className="text-brandPrimary font-bold w-5" />{" "}
            <p className="font-bold text-sm">{location}</p>
          </div>
          <div className="flex items-center gap-2">
            <FaCalendarAlt className="text-brandPrimary font-bold w-5" />{" "}
            <p className="font-bold text-sm">
              {time} {`(${type})`}
            </p>
          </div>
        </div>
        <Link href={`/${locale}/career/jobs/${id}`}>
          <button className="w-full text-base lg:text-lg px-6 py-2 bg-brandHover rounded-full text-white hover:text-white hover:bg-brandDs mt-4 lg:mt-8">
            {t("See Details")}
          </button>
        </Link>
      </div>
    </div>
  );
};

export default JobsCard;
/*  */
