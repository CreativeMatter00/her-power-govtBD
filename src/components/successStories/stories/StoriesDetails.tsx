"use client";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { SlCalender } from "react-icons/sl";
import { useParams } from "next/navigation";
import { getStoryById } from "@/api/api";
import CareerLoader from "@/components/shared/loader/CareerLoader";

const StoriesDetails = () => {
  const params = useParams();
    const { id } = params;
    const {
      isLoading,
      data,
      error,
    } = useQuery({
      queryKey: ["getStoryById", id],
      queryFn: () => getStoryById(id as string),
    });
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
            <div className="flex items-center gap-2">
              <SlCalender className="text-admin_Text2" />
              <p className="text-xl text-brandPrimary font-normal">
                {data?.cre_date?.split(' ')[0].split('-').reverse().join('-')}
              </p>
            </div>
          </div>
          <div className="border-b border-brandLsPrimary w-full my-6"></div>
          <div className="relative rounded-md mb-6">
          <video
              src={data?.video_url}
              controls
              width="100%"
              className="w-full h-auto rounded-md"
            />
          </div>
        </div>
      )}
    </>
  )
}

export default StoriesDetails
