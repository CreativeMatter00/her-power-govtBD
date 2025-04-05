/* eslint-disable react/no-unescaped-entities */

"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { useFormattedDateOrTime } from "@/hooks/useFormattedDateOrTime";

import { statusColors, statusLabels } from "@/utils/status";
import { useLocale, useTranslations } from "next-intl";
import Link from "next/link";

interface Notification {
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
  notification_type: "ORDER" | "CHAT" | "PAYMENT" | string; // extend as needed
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
interface NotificationI {
  notification: Notification;
}

const NotificationCard = ({ notification }: NotificationI) => {
  const t = useTranslations("talentHunt");

  const locale = useLocale();

  return (
    <div
      className="px-4 py-3 grid border border-brandLsPrimary rounded-md mb-4"
      style={{ gridTemplateColumns: "7fr 1fr" }}
    >
      <div className="flex items-center space-x-2">
        <Checkbox id="" />
        <label htmlFor="" className="text-brandPrimary">
          {notification?.notification_type === "ORDER" ? (
            <>
              {t("Your_order_of")}{" "}
              <Link
                href={`/${locale}/shop-now/products/${notification.product_pid}`}
              >
                <span className="text-link hover:underline">
                  {notification.product_name}
                </span>
              </Link>{" "}
              {t("has_been")}{" "}
              <span className={statusColors[notification.current_order_status]}>
                {statusLabels[notification.current_order_status]}
              </span>{" "}
              {t("from")}{" "}
              <span className={statusColors[notification.priv_order_status]}>
                {statusLabels[notification.priv_order_status]}
              </span>
              .
            </>
          ) : (
            <>
              {t("Your_chat_on")} {notification.product_name}{" "}
              {t("has_been_replied.")}
            </>
          )}
        </label>
      </div>
      <div className="text-greyPrimary text-sm text-right">
        {" "}
        {useFormattedDateOrTime(notification.cre_date, "both")}{" "}
      </div>
    </div>
  );
};

export default NotificationCard;
