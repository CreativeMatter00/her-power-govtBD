import { useTranslations } from "next-intl";
import Link from "next/link";

const HeadingPart = () => {
  const t = useTranslations("talentHunt");

  return (
    <nav className="p-4 container">
      <div className="container mx-auto flex justify-between items-center max-lg:flex-col gap-4">
        <div className="flex space-x-4 text-lg font-medium text-[#763B90] max-md:flex-wrap max-md:items-center max-md:justify-center">
          <Link
            href="#"
            className="text-center hover:underline underline-offset-8 decoration-[#763B90] decoration-2 transition-all"
          >
            {t("FindJobs")}
          </Link>
          <Link
            href="#"
            className="text-center hover:underline underline-offset-8 decoration-[#763B90] decoration-2 transition-all"
          >
            {t("HireTalent")}
          </Link>
          <Link
            href="#"
            className="text-center hover:underline underline-offset-8 decoration-[#763B90] decoration-2 transition-all"
          >
            {t("Contests")}
          </Link>
          <Link
            href="#"
            className="text-center hover:underline underline-offset-8 decoration-[#763B90] decoration-2 transition-all"
          >
            {t("GetIdea")}
          </Link>
        </div>
        <div>
          <input
            type="text"
            placeholder="Search Talents..."
            className="py-1.5 px-6 border border-gray-300 placeholder:text-[#252525] text-xl rounded-full"
          />
        </div>
      </div>
    </nav>
  );
};

export default HeadingPart;
