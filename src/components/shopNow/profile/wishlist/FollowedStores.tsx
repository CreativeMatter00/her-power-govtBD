import React from "react";
import FollowedStoresCard from "./FollowedStoresCard";
import { useQuery } from "@tanstack/react-query";
import { getFollowedStores } from "@/api/api";
import ScaleLoader from "react-spinners/ScaleLoader";

import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { cookies } from "next/headers";
import { useCookies } from "next-client-cookies";
import { useTranslations } from "next-intl";

const FollowedStores = () => {
  const t = useTranslations("talentHunt");
  const cookies = useCookies();
  const customerId = cookies.get("customer_pid") || "";

  // const userData = JSON.parse(localStorage.getItem("loginDetails") || "{}");
  // const customerId = userData.customer_pid;

  const { isLoading, error, data, refetch } = useQuery({
    queryKey: ["getFollowedStores"],
    queryFn: () => getFollowedStores(customerId),
  });

  if (error)
    return (
      <div className="text-center text-xl font-md py-8">
        {t("Something_went_wrong")}
      </div>
    );

  return (
    <div>
      {isLoading ? (
        <div className="flex items-center justify-center">
          <ScaleLoader color="#421957" height={70} radius={8} width={10} />
        </div>
      ) : (
        <div className="py-8">
          {data?.data?.length < 1 ? (
            <div className="text-center text-xl font-bold">
              {t("There_is_no_followed_store_for_this_customer")}
            </div>
          ) : (
            <div>
              {data?.data?.map((store: any, index: number) => {
                return (
                  <FollowedStoresCard
                    key={index}
                    id={store.user_pid}
                    entrepreneurId={store.enterpenure_pid}
                    name={store.shop_name}
                    rating={store.seller_avg_rating}
                    noOfRatings={store.seller_total_rating}
                    followers={store.total_follower}
                    positiveRatingPercentage={store.positive_seller_rating}
                    refetch={refetch}
                  />
                );
              })}
            </div>
          )}
        </div>
      )}
      <ToastContainer />
    </div>
  );
};

export default FollowedStores;
