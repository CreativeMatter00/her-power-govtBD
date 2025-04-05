"use client"
import { useCookies } from "next-client-cookies";
import { useLocale, useTranslations } from "next-intl";
import Link from "next/link";

const Hero = () => {
  const t = useTranslations("career");
  const cookies = useCookies();
  const locale = useLocale();
  const providerId = cookies.get("jobProvider_pid");
  return (

      <div
      className="bg-hero-image bg-cover bg-center h-80 w-full flex items-center"
      style={{
        backgroundImage: "url('/assets/images/career/Rectangle 108.png')",
      }}
    >
      {
        providerId && 
      <div className="container mx-auto h-full text-white py-12">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">
          {t("Hirethebest")}{" "}<br/>{t("talentforyourjob")}
        </h1>
        <div className="flex items-center gap-5">
          <Link href={`/${locale}/career/profile/job-provider/post-job`}>
            <button className="text-base lg:text-lg px-10 py-2 bg-brandLsSecondary rounded-full text-brandPrimary hover:text-white hover:bg-brandDs mt-4 lg:mt-8">
              {t("PostaJob")}
            </button>
          </Link>
          <Link href={`/${locale}/career/profile/job-provider/post-task`}>
            <button className="text-base lg:text-lg px-10 py-2 bg-brandHover rounded-full text-white hover:text-white hover:bg-brandDs mt-4 lg:mt-8">
              {t("PostaFreelanceService")}
            </button>
          </Link>
        </div>
      </div>
      } 
    </div>
  );
};

export default Hero;
