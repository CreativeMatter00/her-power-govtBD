"use client";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { SlCalender } from "react-icons/sl";
import { useParams } from "next/navigation";
import { getStoryById } from "@/api/api";
import CareerLoader from "@/components/shared/loader/CareerLoader";
import { useLocale, useTranslations } from "next-intl";
import Link from "next/link";

const StoriesDetails = () => {
   const t = useTranslations("resources_Library");
   const locale = useLocale();
   const params = useParams();
   const { id } = params;
   const { isLoading, data, error } = useQuery({
     queryKey: ["getStoryById", id],
     queryFn: () => getStoryById(id as string),
   });
   if (error)
     return (
       <div className="text-center text-xl font-md py-8">
         {t("Something went wrong. Please reload")}
       </div>
     );
  return (
    <>
      {isLoading ? (
        <div className=" container max-w-7xl mt-20">
          <div className="mx-auto">
            <CareerLoader />
          </div>
        </div>
      ) : (
        <div className=" container max-w-7xl mt-20">
          <div className="flex justify-between  gap-2 ">
            <h1 className="text-3xl text-admin_Text2 font-bold ">
              {data.title}
            </h1>
            <div className="flex gap-4 justify-center items-center">
              <div className="flex items-center gap-2">
                <SlCalender className="text-admin_Text2" />
                <p className="text-xl text-brandPrimary font-normal">
                  {data?.cre_date?.split(" ")[0].split("-").reverse().join("-")}
                </p>
              </div>
              <div>
                <Link
                  href={`/${locale}/success-stories/stories/stories-management/edit-stories/${id}`}
                  className="py-2 px-4 bg-brandDs text-bgPrimary text-lg rounded-full"
                >
                  {t("Edit")}
                </Link>
              </div>
            </div>
          </div>
          <div className="border-b border-brandLsPrimary w-full my-6"></div>
          <div className="flex justify-center rounded-md mb-6">
            <video
              src={data?.video_url}
              controls
              width="100%"
              className="w-auto h-auto max-h-[500px] rounded-md"
            />
          </div>
        </div>
      )}
    </>
  )
}

export default StoriesDetails
