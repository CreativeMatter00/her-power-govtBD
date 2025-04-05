import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { IoStar } from "react-icons/io5";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";

interface IExpert {
  name: string;
  title: string;
  location: string;
  rating: number;
  reviews: number;
  recommendation: string;
  skills: string[];
  projects: number;
  hourlyRate: string;
  image: string;
}

type IExpertsPart = { experts: IExpert[] };

const ExpertTalents: React.FC<IExpertsPart> = ({ experts }) => {
  const t = useTranslations("talentHunt");

  return (
    <div className="container">
      <div className="flex justify-between items-center ">
        <div>
          <p className="text-black text-4xl font-bold">
            {t("Browsetalentbycategory")}
          </p>
          <p className="text-[#252525] text-lg font-medium mb-6">
            {t("SearchandcontactExpertsdirectlywithnoobligation")}
          </p>
        </div>
        <Link href="#" className="flex items-center font-medium cursor-pointer">
          {t("Seeall")} <MdOutlineKeyboardArrowRight fontSize={20} />
        </Link>
      </div>
      {/*  */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {experts.map((expert) => (
          <div key={expert.name} className=" w-full h-full">
            <div className="group transition-all duration-500 cursor-pointer">
              <div className="bg-brandDs group-hover:bg-brandLsSecondary pb-2 rounded-t-lg">
                <div className="flex flex-col gap-4">
                  {/* ============= PROFILE IMAGE ================= */}
                  <div className="mt-6">
                    <div className="flex justify-center items-center">
                      <Image
                        src={
                          "/assets/images/talent-hunt/matheus-ferrero-W7b3eDUb_2I-unsplash.jpg"
                        }
                        alt=""
                        width={160}
                        height={160}
                        className="object-cover w-40 h-40 rounded-full"
                      />
                    </div>
                  </div>
                  {/* ============= PROFILE INFO ================= */}
                  <div className="text-white group-hover:text-[#252525] flex flex-col gap-4 px-8 ">
                    {/* <div className="text-white group-hover:text-[#252525] flex flex-col gap-4 space-x-8 border-4 border-red-600"> */}
                    <h1 className="font-bold text-xl text-center">
                      Ripa Islam
                    </h1>
                    <p className="text-sm">
                      SEO and Digital Marketing Expert. Google Certified.
                      <span className="font-bold">
                        &nbsp; Over 100 Projects complete.
                      </span>
                    </p>
                    <p>
                      <span className="font-bold mr-4">Location:</span>Dhaka
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-brandLsPrimary group-hover:bg-brandDs pl-8 pr-6 py-2 rounded-b-lg">
                <div className="flex items-center gap-1 text-[#252525] group-hover:text-white text-base">
                  {/* ======================= PROFILE RATING STORE ====================== */}
                  <span>
                    <IoStar className="w-5 h-5 text-brandDs group-hover:text-white" />
                  </span>
                  <span className="font-bold">4.95</span>
                  <span className="opacity-50">(119)</span>
                </div>

                <div className="text-sm flex flex-col gap-1 group-hover:text-white">
                  {/* ================= RECOMENDATION =========================== */}
                  <p>Recommend by: Coder Trust</p>
                  <p className="opacity-50">
                    Link Building, Google Ranking ...
                  </p>
                  <div className="flex justify-between items-center">
                    {/* ================= PROJECTS INFO ============================ */}
                    <div>
                      <span>147</span>
                      <span>&nbsp; Projects</span>
                    </div>
                    {/* ================= PAYMENT PER HOUR ===================== */}
                    <div>
                      <span className="font-bold ">BDT58</span>
                      <span className=" opacity-50">/hr</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExpertTalents;
