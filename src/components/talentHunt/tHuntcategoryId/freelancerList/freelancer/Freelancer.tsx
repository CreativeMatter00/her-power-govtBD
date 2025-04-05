import { MdKeyboardArrowRight } from "react-icons/md";
import ProfileCard from "./ProfileCard";
import { useTranslations } from "next-intl";

interface ProfileInfo {
  imageLink: string;
  profileName: string;
  freelancerTitle: string;
  tkPerHour: string;
  ratings: string;
  projectsNumber: string;
  languages: string[];
  appllicationtype: string;
}

interface DeveloperProfileInfo {
  title: string;
  profileInfo: ProfileInfo[];
}

const Freelancer = () => {
  const t = useTranslations("talentHunt");

  return (
    <>
      <div>
        {/* ====================== TITLE & SEE ALL LINK ============================== */}
        <div className="flex justify-between items-center">
          <h1 className="font-bold text-xl text-[#252525]">
            {t("Freelancer")}
          </h1>
          <div className="flex items-center gap-1">
            <button className="font-medium text-lg">{t("See_all")}</button>
            <MdKeyboardArrowRight className="w-5 h-5" />
          </div>
        </div>

        {/* ================================== CARDS ============================= */}
        <div className="mt-2">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <ProfileCard />
            <ProfileCard />
            <ProfileCard />
          </div>
        </div>
      </div>
    </>
  );
};

export default Freelancer;
