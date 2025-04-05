"use client";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import React from "react";
import { SlCalender } from "react-icons/sl";
import { BiPlayCircle } from "react-icons/bi";
import { useParams } from "next/navigation";
import { getVideoById } from "@/api/api";
import CareerLoader from "@/components/shared/loader/CareerLoader";
import { useLocale, useTranslations } from "next-intl";
import Link from "next/link";
const VideoDetails = () => {
  const t = useTranslations("resources_Library");

  const locale = useLocale();
  const params = useParams();
  const { id } = params;
  // console.log(id);
  const { isLoading, data, error } = useQuery({
    queryKey: ["getVideoById", id],
    queryFn: () => getVideoById(id as string),
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
          <div className="relative rounded-md">
            <video
              src={data?.video_url}
              controls
              width="100%"
              // height="520px"
              className="w-full h-auto rounded-md"
            />
            {/* <div className="absolute top-[40%] left-[45%] text-playButton">
              {" "}
              <BiPlayCircle size={100} />{" "}
            </div> */}
          </div>
          <div className="border-b border-brandLsPrimary w-full my-6"></div>
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
                  href={`/${locale}/resource-library/videos/video-management/edit-video/${id}`}
                  className="py-2 px-4 bg-brandDs text-bgPrimary text-lg rounded-full"
                >
                  {t("Edit")}
                </Link>
              </div>
            </div>
          </div>
          <div
            className="py-5"
            dangerouslySetInnerHTML={{ __html: data.description }}
          ></div>
        </div>
      )}
    </>
  );
};

export default VideoDetails;
