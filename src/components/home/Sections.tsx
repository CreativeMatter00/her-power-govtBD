"use client";

import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";

const Sections = () => {
  const locale = useLocale();
  const t = useTranslations("Modules");

  return (
    <div className="mb-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
        <Link href={`${locale}/shop-now`} className="">
          <div className="bg-[#8154CC] rounded-lg group h-[260px] cursor-pointer">
            <div className="py-3 px-6 flex gap-4">
              <div
                className="grid gap-4"
                style={{ gridTemplateColumns: "2fr 1fr" }}
              >
                <div className="text-white flex flex-col justify-center h-[240px]">
                  <p className="font-black text-3xl mb-3"> {t("shopNow")} </p>
                  <p className="text-sm max-h-max md:h-10 group-hover:h-full overflow-hidden    transition-all duration-300">
                    {t("shopDes")}
                  </p>
                </div>

                <div className="flex items-center justify-center">
                  <Image
                    src="/assets/images/home/sections/1.png"
                    height={180}
                    width={180}
                    className="w-full h-auto group-hover:scale-90 transition-all duration-300"
                    alt="shop now"
                  />
                </div>
              </div>
            </div>
          </div>
        </Link>

        <Link href={`${locale}/course`} className="">
          <div className="bg-[#A954CD] rounded-lg group h-[260px] cursor-pointer">
            <div className="py-3 px-6 flex gap-4">
              <div
                className="grid gap-4"
                style={{ gridTemplateColumns: "2fr 1fr" }}
              >
                <div className="text-white flex flex-col justify-center h-[240px] ">
                  <p className="font-black text-3xl mb-3"> {t("course")} </p>
                  <p className="text-sm max-h-max md:h-10 group-hover:h-full overflow-hidden    transition-all duration-300">
                    {t("courseDes")}
                  </p>
                </div>
                {/* <div className="text-white flex flex-col justify-center h-[240px]  border-4 border-red-400">
                  <p className="font-black text-3xl mb-3"> {t("course")} </p>
                  <p className="text-sm max-h-max md:max-h-10 overflow-hidden group-hover:max-h-max group-hover:overflow-auto transition-all duration-300">
                    A talent hunt is a search for individuals excelling in
                    various professional fields such as Digital Marketing, Web
                    Development, Graphic Design, IT Service, E-Commerce, or Call
                    Center Agent.
                  </p>
                </div> */}

                <div className="flex items-center justify-center">
                  <Image
                    src="/assets/images/home/sections/2.png"
                    height={180}
                    width={180}
                    className="w-full h-auto group-hover:scale-90 transition-all duration-300"
                    alt="explore courses"
                  />
                </div>
              </div>
            </div>
          </div>
        </Link>

        <Link href={`${locale}/career`} className="">
          <div className="bg-[#A954CD] rounded-lg group h-[260px] cursor-pointer">
            <div className="py-3 px-6 flex gap-4">
              <div
                className="grid gap-4"
                style={{ gridTemplateColumns: "2fr 1fr" }}
              >
                <div className="text-white flex flex-col justify-center h-[240px]">
                  <p className="font-black text-3xl mb-3"> {t("career")} </p>
                  <p className="text-sm max-h-max md:h-10 group-hover:h-full overflow-hidden    transition-all duration-300">
                    {t("cpDes")}
                  </p>
                </div>

                <div className="flex items-center justify-center">
                  <Image
                    src="/assets/images/home/sections/3.png"
                    height={180}
                    width={180}
                    className="w-full h-auto group-hover:scale-90 transition-all duration-300"
                    alt="talent hunt"
                  />
                </div>
              </div>
            </div>
          </div>
        </Link>
        <Link href={`${locale}/events`} className="">
          <div className="bg-[#8154CC] rounded-lg group h-[260px] cursor-pointer">
            <div className="py-3 px-6 flex gap-4">
              <div
                className="grid gap-4"
                style={{ gridTemplateColumns: "2fr 1fr" }}
              >
                <div className="text-white flex flex-col justify-center h-[240px]">
                  <p className="font-black text-3xl mb-3"> {t("events")} </p>
                  <p className="text-sm max-h-max md:h-10 group-hover:h-full overflow-hidden transition-all duration-300">
                    {t("eventDes")}
                  </p>
                </div>

                <div className="flex items-center justify-center">
                  <Image
                    src="/assets/images/home/sections/5.png"
                    height={180}
                    width={180}
                    className="w-full h-auto max-w-[154px] group-hover:scale-90 transition-all duration-300"
                    alt="events"
                  />
                </div>
              </div>
            </div>
          </div>
        </Link>
        <Link href={`${locale}/meet-partners`} className="">
          <div className="bg-[#8154CC] rounded-lg group h-[260px] cursor-pointer">
            <div className="py-3 px-6 flex gap-4">
              <div
                className="grid gap-4"
                style={{ gridTemplateColumns: "2fr 1fr" }}
              >
                <div className="text-white flex flex-col justify-center h-[240px]">
                  <p className="font-black text-3xl mb-3">
                    {" "}
                    {t("Blogs")}{" "}
                  </p>
                  <p className="text-sm max-h-max md:h-10 group-hover:h-full overflow-hidden    transition-all duration-300">
                    {t("blogDes")}
                  </p>
                </div>

                <div className="flex items-center justify-center">
                  <Image
                    src="/assets/images/home/sections/5.png"
                    height={180}
                    width={180}
                    className="w-full h-auto max-w-[154px] group-hover:scale-90 transition-all duration-300"
                    alt="events"
                  />
                </div>
              </div>
            </div>
          </div>
        </Link>
        <Link href={`${locale}/resource-library`} className="">
          <div className="bg-[#A954CD] rounded-lg group h-[260px] cursor-pointer">
            <div className="py-3 px-6 flex gap-4">
              <div
                className="grid gap-4"
                style={{ gridTemplateColumns: "2fr 1fr" }}
              >
                <div className="text-white flex flex-col justify-center h-[240px]">
                  <p className="font-black text-3xl mb-3"> {t("resource")} </p>
                  <p className="text-sm max-h-max md:h-10 group-hover:h-full overflow-hidden    transition-all duration-300">
                    {t("rlDes")}
                  </p>
                </div>

                <div className="flex items-center justify-center">
                  <Image
                    src="/assets/images/home/sections/6.png"
                    height={180}
                    width={180}
                    className="w-full h-auto group-hover:scale-90 transition-all duration-300"
                    alt="Resource Library"
                  />
                </div>
              </div>
            </div>
          </div>
        </Link>
        <Link href={`${locale}/success-stories`} className="">
          <div className="bg-[#A954CD] rounded-lg group h-[260px] cursor-pointer">
            <div className="py-3 px-6 flex gap-4">
              <div
                className="grid gap-4"
                style={{ gridTemplateColumns: "2fr 1fr" }}
              >
                <div className="text-white flex flex-col justify-center h-[240px]">
                  <p className="font-black text-3xl mb-3"> {t("success-story")} </p>
                  <p className="text-sm max-h-max md:h-10 group-hover:h-full overflow-hidden    transition-all duration-300">
                    {t("successDes")}
                  </p>
                </div>

                <div className="flex items-center justify-center">
                  <Image
                    src="/assets/images/home/sections/3.png"
                    height={180}
                    width={180}
                    className="w-full h-auto group-hover:scale-90 transition-all duration-300"
                    alt="talent hunt"
                  />
                </div>
              </div>
            </div>
          </div>
        </Link>
        <Link href={`${locale}/challenges`} className="">
          <div className="bg-[#8154CC] rounded-lg group h-[260px] cursor-pointer">
            <div className="py-3 px-6 flex gap-4">
              <div
                className="grid gap-4"
                style={{ gridTemplateColumns: "2fr 1fr" }}
              >
                <div className="text-white flex flex-col justify-center h-[240px]">
                  <p className="font-black text-3xl mb-3"> {t("challenges")} </p>
                  <p className="text-sm max-h-max md:h-10 group-hover:h-full overflow-hidden    transition-all duration-300">
                    {t("ChallengesDes")}
                  </p>
                </div>

                <div className="flex items-center justify-center">
                  <Image
                    src="/assets/images/home/sections/5.png"
                    height={180}
                    width={180}
                    className="w-full h-auto group-hover:scale-90 transition-all duration-300"
                    alt="talent hunt"
                  />
                </div>
              </div>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Sections;
