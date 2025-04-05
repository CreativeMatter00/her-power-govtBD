"use client";

import React, { useState } from "react";
import UserProfileHero from "./UserProfileHero";
import Dashboard from "./dashboard/Dashboard";
import OrderList from "./dashboard/OrderList";
import MyAccount from "./myAccount/MyAccount";
import Chat from "./chat/Chat";
import { useQuery } from "@tanstack/react-query";
import { getSellerOrderInfo } from "@/api/api";
import ScaleLoader from "react-spinners/ScaleLoader";
import { useTranslations } from "next-intl";

const UserProfile = () => {
  const t = useTranslations("talentHunt");

  const [active, setActive] = useState<string>("dashboard");
  const getUserInfo = JSON.parse(
    localStorage.getItem("loginDetails") as string
  );
  const sellerId = getUserInfo?.enterpenure_pid;
  const {
    isLoading,
    error,
    data,
    refetch: dashboardOverViewRefetch,
  } = useQuery({
    queryKey: ["getSellerOrderInfo"],
    queryFn: () => getSellerOrderInfo(sellerId),
  });

  // console.log("Dashboard data", data);

  if (isLoading)
    return (
      <div className="w-screen h-screen flex justify-center items-center">
        <ScaleLoader color="#421957" height={70} radius={8} width={10} />
      </div>
    );

  if (error)
    return (
      <div className="text-center text-xl font-md py-8">
        {t("Something_went_wrong")}
      </div>
    );

  return (
    <div>
      <UserProfileHero
        active={active}
        setActive={setActive}
        // sellerId={sellerId}
        userInfo={getUserInfo}
      />
      {active === "dashboard" && (
        <div>
          <Dashboard sellerId={sellerId} data={data} />
          <OrderList dashboardOverViewRefetch={dashboardOverViewRefetch} />
        </div>
      )}

      {active === "myAccount" && <MyAccount />}
      {active === "chat" && <Chat sellerId={sellerId} />}
    </div>
  );
};

export default UserProfile;
