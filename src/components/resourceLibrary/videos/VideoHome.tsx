"use client";
import { getHomeVideos } from "@/api/api";
import { useLocale, useTranslations } from "next-intl";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import ResourceCards from "../ResourceCards";
import Link from "next/link";
import { IoMdArrowForward } from "react-icons/io";
import ResCard from "../ResCard";

const VideoHome = () => {
  const t = useTranslations("resources_Library");

  const locale = useLocale();
  const { isLoading, data, error } = useQuery({
    queryKey: ["getHomeVideos"],
    queryFn: () => getHomeVideos(),
  });
  // console.log(data);
  if (error)
    return (
      <div className="text-center text-xl font-md py-8">
        {t("Something went wrong. Please reload")}
      </div>
    );
  return (
    <div>
      <h1 className="text-brandDs text-3xl font-normal">{t("videos")}</h1>
      <div className="border-b border-brandLsPrimary w-full my-6"></div>
      <div className="grid  lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-x-8 gap-y-8 my-6">
        {/* <ResourceCards title='Videos' data={data?.data} allLink='resource-library/videos' /> */}
        {data?.data?.map((item: any, index: number) => {
          return (
            <ResCard
              key={item.post_pid}
              title="Videos"
              card_pid={item.post_pid}
              cardImage={item.thumbnail_url}
              cardTitle={item.title}
              cardDate={item.cre_date}
              cardDes={item.description}
            />
          );
        })}
      </div>
      {/* =============================   SEE ALL ======================== */}
      <div className="flex justify-end mt-6">
        <Link href={`/${locale}/resource-library/videos`}>
          <div className="flex items-center gap-2 text-brandPrimary cursor-pointer group ">
            <p className="text-base hover:underline underline-offset-2">
              {t("See_all")}
            </p>
            <IoMdArrowForward className="w-5 h-5" />
          </div>
        </Link>
      </div>
    </div>
  );
};

export default VideoHome;
