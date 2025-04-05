import { useTranslations } from "next-intl";
import { BiMessageRoundedDots } from "react-icons/bi";
import { FiUpload } from "react-icons/fi";

const Buttons = () => {
  const t = useTranslations("talentHunt");
  return (
    <>
      <div className="flex flex-col max-md:gap-4 gap-12 max-md:w-full">
        {/* ======================== FIRST ROW BUTTONS ================== */}
        <div className="flex max-md:flex-col items-center gap-4 max-md:w-full">
          <div className="flex items-center gap-4 max-md:mt-4 max-md:w-full">
            {/* =================== MESSAGE BUTTON ============================= */}
            <div>
              <button className="w-8 h-8 rounded-full bg-brandPrimary flex items-center justify-center">
                <BiMessageRoundedDots className="w-5 h-5 text-white" />
              </button>
            </div>
            {/* =============================== HIRE BUTTON ==================== */}
            <div className="max-md:w-full">
              <button className="max-md:w-full bg-brandPrimary text-white rounded-full px-6 py-1 font-medium text-lg">
                {t("Hire_Now")}
              </button>
            </div>
          </div>

          {/* ============================== INVITE TO JOB ========================= */}
          <div className="max-md:w-full">
            <button className="max-md:w-full font-medium text-lg bg-brandDs px-6 py-1 text-white rounded-full">
              {t("Invite_to_Job")}
            </button>
          </div>
        </div>

        {/* ======================== SHARE FILE ROW BUTTON ================== */}
        <div className="flex max-md:justify-center justify-end max-md:w-full">
          <div className="flex max-md:justify-center items-center gap-2 border-2 border-brandDs px-6 py-1 rounded-full text-base text-brandDs max-md:w-full">
            {t("share")}
            <FiUpload className="w-5 h-5" />
          </div>
        </div>
      </div>
    </>
  );
};

export default Buttons;
