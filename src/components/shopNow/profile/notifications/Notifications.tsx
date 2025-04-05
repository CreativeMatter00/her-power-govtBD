"use client";

import NotificationCard from "./NotificationCard";
import { useQuery } from "@tanstack/react-query";
import { getAllNotifications, getLastFourNotifications } from "@/api/api";
import ScaleLoader from "react-spinners/ScaleLoader";
import { useCookies } from "next-client-cookies";
import { useState } from "react";
import { useTranslations } from "next-intl";

interface NotificationI {
  active_status: number;
  cre_by: string | null;
  cre_date: string;
  current_order_status: number;
  customer_pid: string;
  enterpenure_pid: string;
  message: string | null;
  notification_id: number;
  notification_pid: string;
  notification_status: "UNREAD" | "READ"; // assuming these are the possible statuses
  notification_type: "ORDER" | "DELIVERY" | "PAYMENT" | string; // extend as needed
  order_pid: string;
  orderchd_pid: string;
  pid_currdate: string;
  pid_prefix: string;
  priv_order_status: number;
  product_name: string;
  product_pid: string;
  remarks: string | null;
  store_name: string;
  ud_serialno: string | null;
  upd_by: string | null;
  upd_date: string | null;
}

const Notifications = () => {
  const t = useTranslations("talentHunt");

  const cookies = useCookies();
  const customer_pid = cookies.get("customer_pid");
  const [showAll, setShowAll] = useState(false);

  const {
    isLoading: loadingLastFour,
    error: errorLastFour,
    data: lastFourNotifications,
  } = useQuery({
    queryKey: ["getLastFourNotifications", customer_pid],
    queryFn: ({ queryKey }) => getLastFourNotifications(queryKey[1] as string),
    enabled: !!customer_pid,
  });

  // Query for all notifications
  const {
    isLoading: loadingAll,
    error: errorAll,
    data: allNotifications,
  } = useQuery({
    queryKey: ["getAllNotifications", customer_pid],
    queryFn: ({ queryKey }) => getAllNotifications(queryKey[1] as string),
    enabled: showAll && !!customer_pid, // Only run if showAll is true and customer_pid is defined
  });

  if (errorLastFour || errorAll)
    return (
      <div className="text-center text-xl font-md py-8">
        {t("Something_went_wrong")}
      </div>
    );

  // console.log(lastFourNotifications || allNotifications);

  return (
    <div className="container mx-auto py-6">
      <p className="text-brandPrimary text-3xl mb-10">{t("Notifications")}</p>
      <div className="flex justify-end items-center gap-4">
        {/* <div className="flex items-center space-x-2 hover:cursor-pointer">
          <Checkbox id="terms" />
          <label htmlFor="terms" className="text-sm text-brandPrimary">
            Select All
          </label>
        </div> */}

        {/* <button className="p-1 border border-greyPrimary hover:cursor-pointer">
          <RiDeleteBin6Line color="border-greyPrimary" />
        </button> */}
      </div>

      <div>
        {loadingLastFour || loadingAll ? (
          <div className="flex items-center justify-center">
            <ScaleLoader color="#421957" height={70} radius={8} width={10} />
          </div>
        ) : (
          <div>
            {(showAll ? allNotifications : lastFourNotifications)?.data?.map(
              (notification: NotificationI, index: number) => (
                <NotificationCard key={index} notification={notification} />
              )
            )}
          </div>
        )}
      </div>
      {!showAll && (
        <div className="w-full flex justify-center items-center">
          <button
            onClick={() => setShowAll(true)}
            className="text-link hover:underline"
          >
            {t("See_All")}
          </button>
        </div>
      )}
    </div>
  );
};

export default Notifications;
