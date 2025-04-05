"use client";

import { useLocale, useTranslations } from "next-intl";
import Link from "next/link";
import LocalSwitcher from "../LocalSwitcher";
import LoginNav from "../LoginNav";
import Image from "next/image";

const MobileNavbar = () => {
  const t = useTranslations("Navbar");
  const locale = useLocale();
  return (
    <div className="flex justify-center items-center h-full -mt-0.5">
      <div className=" bg-[#FBF5FD] flex flex-col justify-between border-t w-full  h-full">
        <div className="overflow-auto p-4 uppercase px-4 bg-primary">
          <div className="flex justify-center gap-4  text-brandPrimary text-lg font-medium pb-1 flex-col">
            <div className="flex justify-between px-4">
              <Image
                src={`/assets/images/navbar/ICT Logo.png`}
                width={70}
                height={50}
                alt="ICT Logo"
                className="h-auto "
                priority
              />
              {/* <Image
								src={`/assets/images/navbar/mujib-sotoborso.png`}
								width={70}
								height={40}
								alt="mujib-sotoborso"
								className="h-auto"
								priority
							/> */}
            </div>
            <Link
              href={`/${locale}/shop-now`}
              className="text-center hover:underline underline-offset-8 decoration-brandDs decoration-2 transition-all hover:text-brandDs"
            >
              {t("shopNow")}
            </Link>
            <Link
              href={`/${locale}/course`}
              className="text-center hover:underline underline-offset-8 decoration-brandDs decoration-2 transition-all hover:text-brandDs"
            >
              {t("course")}
            </Link>
            <Link
              href={`/${locale}/events`}
              className="text-center hover:underline underline-offset-8 decoration-brandDs decoration-2 transition-all hover:text-brandDs"
            >
              {t("events")}
            </Link>
            <Link
              href={`/${locale}/career`}
              className="text-center hover:underline underline-offset-8 decoration-brandDs decoration-2 transition-all hover:text-brandDs"
            >
              {t("career")}
            </Link>
            <Link
              href={`/${locale}/meet-partners`}
              className="text-center hover:underline underline-offset-8 decoration-brandDs decoration-2 transition-all hover:text-brandDs"
            >
              {t("Blogs")}
            </Link>
            <Link
              href={`/${locale}/resource-library`}
              className="text-center hover:underline underline-offset-8 decoration-brandDs decoration-2 transition-all hover:text-brandDs"
            >
              {t("Resource Library")}
            </Link>
            <Link
              href={`/${locale}/events`}
              className="text-center hover:underline underline-offset-8 decoration-brandDs decoration-2 transition-all hover:text-brandDs"
            >
              {t("events")}
            </Link>
            <Link
              href={`/${locale}/success-stories`}
              className="text-center hover:underline underline-offset-8 decoration-brandDs decoration-2 transition-all hover:text-brandDs"
            >
              {t("Success Stories")}
            </Link>
            <Link
              href={`/${locale}/challenges`}
              className="text-center hover:underline underline-offset-8 decoration-brandDs decoration-2 transition-all hover:text-brandDs"
            >
              {t("Challenges")}
            </Link>
            <Link
              href="/"
              className="text-center hover:underline underline-offset-8 decoration-brandDs decoration-2 transition-all hover:text-brandDs"
            >
              {t("aboutUs")}
            </Link>

            <Link
              href={`/${locale}/contact`}
              className="text-center hover:underline underline-offset-8 decoration-brandDs decoration-2 transition-all hover:text-brandDs"
            >
              {t("contact")}
            </Link>
          </div>
        </div>

        <div className="">
          <LocalSwitcher />
          {/* <LoginNav /> */}
        </div>
      </div>
    </div>
  );
};

export default MobileNavbar;

// h-[calc(screen-100px)]
