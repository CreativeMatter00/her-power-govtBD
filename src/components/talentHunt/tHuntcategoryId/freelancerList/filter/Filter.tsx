import { FiSearch } from "react-icons/fi";
import Industries from "./Industries";
import DeveloperType from "./DeveloperType";
import District from "./District";
import { useTranslations } from "next-intl";

const Filter = () => {
  const t = useTranslations("talentHunt");
  return (
    <>
      <section>
        {/* ===================== SEARCH BAR ==================== */}
        <div className="flex justify-start items-center gap-2 border border-[#252525] rounded-lg p-2 w-full text-[#252525] opacity-50">
          <FiSearch className="w-6 h-6" />

          <input
            className="bg-transparent w-full p-1 outline-none font-medium text-lg"
            type="text"
            placeholder={t("Search")}
          />
        </div>

        <div className="flex flex-col gap-6 mt-8">
          <Industries />
          <DeveloperType />
          <District />
        </div>
      </section>
    </>
  );
};

export default Filter;
