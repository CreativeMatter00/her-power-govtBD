'use client'
import { getUserInfo } from "@/api/api";
import { useQuery } from "@tanstack/react-query";
import { useCookies } from "next-client-cookies";
import React from "react";

const UserInformation = () => {
  const cookies = useCookies();
  const userId = cookies.get("user_pid");
  const { isLoading, error, data, refetch } = useQuery({
    queryKey: ["userInfo"],
    queryFn: () => getUserInfo(userId as string),
  });
  if (error)
    return (
      <div className="text-center text-xl font-md py-8">
        Something went wrong. Please reload
      </div>
    );
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-14 gap-y-4 mt-4">
      <div>
        <h1 className="text-greyPrimary ml-6">First Name</h1>
        <p className="px-6 py-1 mt-1">{data && data.fname}</p>
      </div>
      <div>
        <h1 className="text-greyPrimary ml-6">Last Name</h1>
        <p className="px-6 py-1 mt-1">{data && data.lname}</p>
      </div>
      <div>
        <h1 className="text-greyPrimary ml-6">Email</h1>
        <p className="px-6 py-1 mt-1">{data && data.email}</p>
      </div>
      <div>
        <h1 className="text-greyPrimary ml-6">Phone Number</h1>
        <p className="px-6 py-1 mt-1">{data && data.mobile_no}</p>
      </div>
      <div>
        <h1 className="text-greyPrimary ml-6">Address</h1>
        <p className="px-6 py-1 mt-1">{data && data.customer_address}</p>
      </div>
      <div>
        <h1 className="text-greyPrimary ml-6">Area Name</h1>
        <p className="px-6 py-1 mt-1">{data && data.customer_area_name}</p>
      </div>
      <div>
        <h1 className="text-greyPrimary ml-6">Area Name</h1>
        <p className="px-6 py-1 mt-1">{data && data.customer_city_name}</p>
      </div>
      <div>
        <h1 className="text-greyPrimary ml-6">Zip Code</h1>
        <p className="px-6 py-1 mt-1">
          {data && data.customer_zip_postal_code}
        </p>
      </div>
    </div>
  );
};

export default UserInformation;