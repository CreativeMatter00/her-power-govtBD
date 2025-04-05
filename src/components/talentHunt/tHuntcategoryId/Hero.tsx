import { useTranslations } from "next-intl";
import Image from "next/image";

const Hero: React.FC = () => {
  const t = useTranslations("talentHunt");

  return (
    <div className="bg-[#490070] text-white p-4 rounded-lg flex items-center justify-between">
      <div className="flex flex-col gap-4 pl-4">
        <p className="text-5xl font-bold text-white">
          {t("Web_experts_to_scale_your_organization")}
        </p>
        <p className="mt-2">
          {t("Hire_top_independent_web_developers_to_scale_your_projects")}
        </p>
        <button className="bg-white text-[#59187B] px-4 py-1 rounded-full mt-4 text-lg font-medium hover:text-white hover:bg-[#59187B] w-fit">
          {t("Post_a_Job")}
        </button>
      </div>
      <Image
        src="/assets/images/talent-hunt/Rectangle 108.png"
        height={500}
        width={444}
        alt="Hero Image"
        className="w-1/2 rounded-lg h-[500px]"
      />
    </div>
  );
};

export default Hero;
