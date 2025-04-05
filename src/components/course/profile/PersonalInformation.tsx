"use client";

import { getUserInfo } from "@/api/api";
import { useQuery } from "@tanstack/react-query";
import { useCookies } from "next-client-cookies";
import React from "react";
import ScaleLoader from "react-spinners/ScaleLoader";

const PersonalInformation = () => {
  const cookies = useCookies();
  const userId = cookies.get("user_pid");

  const { isLoading, error, data } = useQuery({
    queryKey: ["userInfo"],
    queryFn: () => getUserInfo(userId as string),
  });

  if (isLoading) {
    return (
      <div className="w-full min-h-[300px] flex justify-center items-center">
        <ScaleLoader color="#421957" height={70} radius={8} width={10} />
      </div>
    );
  }

  if (error)
    return (
      <div className="text-center text-xl font-md py-8">
        Something went wrong. Please reload
      </div>
    );

  return (
    <div className="my-8">
      {/* ---------------------------- personal information --------------------------------- */}
      <div>
        <h1 className="text-base font-bold pb-3 border-b border-brandLsPrimary mb-2">
          My Personal Information
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ">
          <div>
            <h1 className="text-greyPrimary ml-6">First Name</h1>
            <p className="px-6  py-1 mt-1">{data?.fname}</p>
          </div>
          <div>
            <h1 className="text-greyPrimary ml-6">Mobile Number</h1>
            <p className="px-6  py-1 mt-1">{data?.mobile_no}</p>
          </div>
          <div>
            <h1 className="text-greyPrimary ml-6">Email</h1>
            <p className="px-6  py-1 mt-1">{data?.email}</p>
          </div>
          <div>
            <h1 className="text-greyPrimary ml-6">Last Name</h1>
            <p className="px-6  py-1 mt-1">{data?.lname}</p>
          </div>
        </div>
      </div>

      {/* ---------------------------------------- My Address --------------------------------- */}
      <div>
        <h1 className="text-base font-bold pb-3 border-b border-brandLsPrimary mt-6 mb-2">
          My Addresses
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div>
            <h1 className="text-greyPrimary ml-6">Address</h1>
            <p className="px-6  py-1 mt-1">{data?.customer_address}</p>
          </div>
          <div>
            <h1 className="text-greyPrimary ml-6">City</h1>
            <p className="px-6  py-1 mt-1">{data?.customer_city_name}</p>
          </div>

          <div>
            <h1 className="text-greyPrimary ml-6">Area</h1>
            <p className="px-6  py-1 mt-1">{data?.customer_area_name}</p>
          </div>
          <div>
            <h1 className="text-greyPrimary ml-6">Zip Code</h1>
            <p className="px-6  py-1 mt-1">{data?.customer_zip_postal_code}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonalInformation;
