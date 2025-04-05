import { useLocale, useTranslations } from "next-intl";
import Link from "next/link";
import React from "react";
import { FiClock } from "react-icons/fi";

interface ITaskProps {
  id: string | number;
  title: string;
  description: string;
  time: string;
}
const AllTaskCard: React.FC<ITaskProps> = ({
  id,
  title,
  description,
  time,
}) => {
  const locale = useLocale();
  const t = useTranslations("career");

  return (
    <div className="flex flex-col justify-between gap-5 p-5 bg-brandLsSecondary rounded-[5px]">
      <div className="space-y-2">
        <p className="font-bold text-[#252525] text-2xl line-clamp-2">
          {title}
        </p>
        <p
          className="line-clamp-4 md:line-clamp-3 text-opacity-80"
          dangerouslySetInnerHTML={{
            __html: description,
          }}
        />
        <div className="flex items-center gap-[5px]">
          <FiClock className="text-[#8b3392] w-4 h-4" />
          <p className="font-bold text-[#252525] text-base">{time}</p>
        </div>
      </div>

      <Link className="w-full" href={`/${locale}/career/tasks/${id}`}>
        <button className="w-full bg-brandDs hover:bg-brandHover text-white block mx-auto rounded-full p-2">
          {t("See Details")}
        </button>
      </Link>
    </div>
  );
};

export default AllTaskCard;
