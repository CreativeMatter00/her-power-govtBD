"use client";
import Link from "next/link";
import { BsArrowRight } from "react-icons/bs";

import { useQuery } from "@tanstack/react-query";
import { getHomeChallenges } from "@/api/api";
import CareerLoader from "@/components/shared/loader/CareerLoader";
import { useTranslations } from "next-intl";
import ChallengeCard from "./ChallengeCard";
function Challenges() {
  const { isLoading, data, error } = useQuery({
    queryKey: ["getHomeChallenges"],
    queryFn: () => getHomeChallenges(),
  });

  // console.log(data);
  const t = useTranslations("challenges");

  if (error)
    return (
      <div className="text-center text-xl font-md py-8">{t("loading")}</div>
    );
  return (
    <section className="mt-6 w-full">
      {/* heading */}
      <div className="w-full flex flex-col">
        {/* texts */}
        <div className="flex flex-col">
          <h1 className="text-brandDs text-3xl font-normal">
            {t("Challenges")}
          </h1>
        </div>
        {/* border */}
        <p className="w-full h-[2px] bg-brandLsPrimary my-6"></p>
      </div>

      {/* cards */}
      {isLoading ? (
        <div className="grid  lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-x-8 gap-y-8 my-6">
          {Array.from({ length: 8 }).map((_, index) => (
            <div key={index} className="mx-auto">
              <CareerLoader />
            </div>
          ))}
        </div>
      ) : (
        <>
          {Array.isArray(data?.data) && data?.data?.length > 0 ? (
            <div className="grid 2xl:grid-cols-3 lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-x-4 lg:gap-x-4 gap-y-8 my-6">
              {data &&
                data?.data?.map((blogPost: any) => (
                  <div key={blogPost.cpost_pid}>
                    <ChallengeCard
                      id={blogPost.cpost_pid}
                      title={blogPost?.title}
                      userName={blogPost?.user_pid}
                      publishDate={blogPost?.cre_date}
                      description={blogPost?.description}
                      image={blogPost?.thumbnail_file_url}
                    />
                  </div>
                ))}
            </div>
          ) : (
            <div className=" py-12 flex justify-center items-center text-2xl text-gray-500">
              {t(`No Data Available`)}
            </div>
          )}
        </>
      )}

      {/* see all btn  */}
      {Array.isArray(data?.data) && data?.data?.length > 0 && (
        <div className="w-full flex justify-end text-brandPrimary mb-10">
          <Link href={`challenges/challenge`}>
            <div className="flex items-center gap-2 text-brandPrimary cursor-pointer">
              <p className="text-base">{t("seeAll")}</p>
              <BsArrowRight className="w-5 h-5" />
            </div>
          </Link>
        </div>
      )}
    </section>
  );
}

export default Challenges;
