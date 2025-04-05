import { useLocale, useTranslations } from "next-intl";
import Link from "next/link";
import { FaClock } from "react-icons/fa";

interface ITaskCardProps {
  id: number;
  title: string;
  description: string;
  time: string;
}

const TaskCard = ({ id, title, description, time }: ITaskCardProps) => {
  const t = useTranslations("career");

  const locale = useLocale();
  return (
    <div className="col-span-1 bg-brandLsSecondary p-8  flex flex-col justify-between gap-5">
      <div className="space-y-2">
        <p className="text-black font-bold text-2xl">{title}</p>
        <p
          className="line-clamp-4 md:line-clamp-3 text-opacity-80"
          dangerouslySetInnerHTML={{
            __html: description,
          }}
        />
        <div className="flex items-center gap-2">
          <FaClock className="text-brandDs font-bold w-5" />{" "}
          <p className="font-bold text-sm">{time}</p>
        </div>
      </div>
      <Link href={`/${locale}/career/tasks/${id}`}>
        <button className="w-full text-base lg:text-lg px-6 py-2 bg-brandHover rounded-full text-white hover:text-white hover:bg-brandDs mt-4 lg:mt-8">
          {t("See Details")}
        </button>
      </Link>
    </div>
  );
};

export default TaskCard;
