"use client";
import { getHomeStories } from "@/api/api";
import { useLocale, useTranslations } from "next-intl";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { IoMdArrowForward } from "react-icons/io";
import ResCard from "./ResCard";

const StoriesHome = () => {
  const t = useTranslations("story");

  const locale = useLocale();
  const { isLoading, data, error } = useQuery({
    queryKey: ["getHomeStories"],
    queryFn: () => getHomeStories(),
  });
  if (error)
    return (
      <div className="text-center text-xl font-md py-8">
        {t("Something went wrong. Please reload")}
      </div>
    );
  return (
    <div>
      <h1 className="text-brandDs text-3xl font-normal">
        {t("Success Stories")}
      </h1>
      <div className="border-b border-brandLsPrimary w-full my-6"></div>
      {Array.isArray(data?.data) && data?.data?.length > 0 ? (
        <div className="grid  lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-x-8 gap-y-8 my-6">
          {data?.data?.map((item: any, index: number) => {
            return (
              <ResCard
                key={item.story_pid}
                title="story"
                card_pid={item.story_pid}
                cardImage={item.thumbnail_url}
                cardTitle={item.title}
                cardDate={item.cre_date}
              />
            );
          })}
        </div>
      ) : (
        <div className=" py-12 flex justify-center items-center text-2xl text-gray-500">
          {t(`No Data Available`)}
        </div>
      )}
      {/* =============================   SEE ALL ======================== */}
      {Array.isArray(data?.data) && data?.data?.length > 0 && (
        <div className="flex justify-end mt-6">
          <Link href={`/${locale}/success-stories/stories`}>
            <div className="flex items-center gap-2 text-brandPrimary cursor-pointer group ">
              <p className="text-base hover:underline underline-offset-2">
                {t("See_all")}
              </p>
              <IoMdArrowForward className="w-5 h-5" />
            </div>
          </Link>
        </div>
      )}
    </div>
  );
};

export default StoriesHome;
