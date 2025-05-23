"use client";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import React from "react";
import { SlCalender } from "react-icons/sl";
import { BiPlayCircle } from "react-icons/bi";
import { useParams } from "next/navigation";
import { getVideoById } from "@/api/api";
import CareerLoader from "@/components/shared/loader/CareerLoader";

const VideoDetails = () => {
  const params = useParams();
  const { id } = params;
  // console.log(id);
  const {
    isLoading,
    data,
    error,
  } = useQuery({
    queryKey: ["getVideoById", id],
    queryFn: () => getVideoById(id as string),
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
          <div className="flex justify-center rounded-md mb-6">
          <video
              src={data?.video_url}
              controls
              width="100%"
              // height="520px"
              className="w-auto h-auto max-h-[500px] rounded-md"
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
            <div className="flex items-center gap-2">
              <SlCalender className="text-admin_Text2" />
              <p className="text-xl text-brandPrimary font-normal">
                {data?.cre_date?.split(' ')[0].split('-').reverse().join('-')}
              </p>
            </div>
          </div>
          <div className="py-5">{data.description}</div>
        </div>
      )}
    </>
  );
};

export default VideoDetails;
