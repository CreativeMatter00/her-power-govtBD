import Order from "@/components/shopNow/seller/order/Order";
import { useTranslations } from "next-intl";
import Link from "next/link";
import React from "react";

const page = () => {
  const t = useTranslations("talentHunt");

  return (
    <div>
      <div className="py-6 border-b-2 border-brandLsSecondary">
        <div className="flex items-center gap-2 text-brandPrimary container mx-auto">
          <Link href={"#"} className="text-link">
            {" "}
            {t("Dashboard")}{" "}
          </Link>{" "}
          /<p className="text-greyPrimary"> {t("Order_ID")}# HPO001 </p>
        </div>
      </div>
      <Order />
    </div>
  );
};

export default page;
