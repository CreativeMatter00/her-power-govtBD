import { useTranslations } from "next-intl";
import { TiArrowRight } from "react-icons/ti";

const FindTalents = () => {
  const t = useTranslations("talentHunt");
  return (
    <div
      className="relative lg:h-[490px] bg-cover bg-center container mt-16 p-2 rounded-xl"
      style={{
        backgroundImage: "url('/assets/images/talent-hunt/SM987854.jpg')",
      }}
    >
      <div className="absolute inset-0 bg-black opacity-30 rounded-xl"></div>
      <div className="relative  container  rounded-xl overflow-hidden lg:max-h-[470px] text-white h-full">
        <div className="h-full flex flex-col justify-between p-4 gap-4">
          <p className="font-bold">{t("ForClients")}</p>

          <div>
            <p className="text-5xl font-bold">{t("FindTalentsyourway")}</p>
            <p className="text-sm mt-4">
              {t(
                "Discover_exceptional_talents_in_various_fields, tailored_to_your_preferences,offering_recognition opportunities,_and_rewards."
              )}
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            <div className="bg-[#6B469B] rounded-xl p-4 hover:bg-white hover:text-[#6B469B] transition-all duration-300 cursor-pointer">
              <p className="text-2xl font-bold mb-2">
                {t("Post_a_job_and_hire")}
              </p>
              <div className="flex items-center text-sm ">
                {t("TalentMarketplace")} <TiArrowRight />
              </div>
            </div>

            <div className="bg-[#6B469B] rounded-xl p-4 hover:bg-white hover:text-[#6B469B] transition-all duration-300 cursor-pointer">
              <p className="text-2xl font-bold mb-2">
                {t("Post_a_job_and_hire")}
              </p>
              <div className="flex items-center text-sm ">
                {t("TalentMarketplace")} <TiArrowRight />
              </div>
            </div>

            <div className="bg-[#6B469B] rounded-xl p-4 hover:bg-white hover:text-[#6B469B] transition-all duration-300 cursor-pointer">
              <p className="text-2xl font-bold mb-2">
                {t("Post_a_job_and_hire")}
              </p>
              <div className="flex items-center text-sm ">
                {t("TalentMarketplace")} <TiArrowRight />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FindTalents;
