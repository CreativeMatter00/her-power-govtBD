import { LuShare2 } from "react-icons/lu";
import { FaRegHeart } from "react-icons/fa";
import { FaRegBell } from "react-icons/fa";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";

export const ShareNotification = () => {
  const t = useTranslations("talentHunt");
  const locale = useLocale();
  return (
    <>
      <div className="flex flex-col lg:flex-row justify-between items-center gap-4 lg:gap-0 w-full">
        <div>
          {/* <p className="text-base text-brandPrimary">
						Your account has been{" "}
						<span className="text-3xl text-success">100%</span> completed
					</p> */}
        </div>
        <div className="max-md:my-4 max-md:w-full">
          <div className="flex max-md:flex-col max-md:justify-center justify-evenly items-center max-md:gap-4 gap-3 text-brandPrimary text-base">
            <div className="max-md:w-full">
              <div className="flex max-md:justify-between justify-evenly items-center gap-3">
                {/* <div className="border border-brandPrimary rounded-full p-3">
									<LuShare2 />
								</div> */}
                <Link href={`/${locale}/shop-now/profile/notifications`}>
                  <div className="border border-brandPrimary rounded-3xl px-6 py-2">
                    <div className="flex items-center gap-2">
                      <FaRegBell /> <p>{t("Notifications")}</p>
                    </div>
                  </div>
                </Link>
              </div>
            </div>
            <div className="max-md:w-full">
              <Link href={`/${locale}/shop-now/profile/wishlist`}>
                <div className="border border-brandPrimary rounded-3xl  px-6 py-2">
                  <div className="flex items-center gap-2">
                    <FaRegHeart /> <p>{t("Wishlist_&_Followed_Stores")}</p>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
