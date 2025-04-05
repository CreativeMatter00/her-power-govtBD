// -------------------- REACT ICONS -----------------
import { IoShareSocialOutline } from "react-icons/io5";
import { IoIosHeartEmpty } from "react-icons/io";
import { IoVideocamOutline } from "react-icons/io5";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";

const Buttons = () => {
  const t=useTranslations("course")
  const locale = useLocale();
  return (
    <>
      <div className="my-4">
        <div className="flex max-md:flex-col flex-row justify-end items-center gap-4">
          {/* <div className="flex max-md:justify-between gap-4 max-md:w-full">
					
						<div>
							<button className="border border-brandPrimary rounded-full p-2">
								<IoShareSocialOutline className="w-5 h-5 text-brandPrimary" />
							</button>
						</div>
						<div className="border border-brandPrimary rounded-full py-2 px-8">
						
							<div className="flex justify-center items-center gap-2 text-base">
								<IoIosHeartEmpty className="h-5 w-6" />
								Notifications
							</div>
						</div>
					</div> */}
          <div className="bg-brandPrimary rounded-full py-2 max-md:w-full px-8">
            {/* ----------------- ADD NEW VIDEO COURSE --------------- */}
            {/* --------------- REACT ICON PLUS TEXT ---------------  */}
            <Link href={`/${locale}/course/course-provider/add-new-course`}>
              <button className="flex justify-center items-center gap-2 text-base text-[#ffffff]">
                <IoVideocamOutline className="h-5 w-6" />
                {t("Add New Course Video")}
              </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Buttons;
