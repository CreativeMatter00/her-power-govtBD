import Notifications from "@/components/shopNow/profile/notifications/Notifications";
import { useTranslations } from "next-intl";
import Link from "next/link";
import React from "react";

const page = () => {
  const t = useTranslations("talentHunt");

  return (
    <div>
      <div className="h-24 border-b border-brandLsPrimary flex flex-col justify-center">
        <div className="flex items-center container mx-auto gap-2">
          <Link href={"#"} className="text-link">
            {t("Profile")}
          </Link>
          /<p className="text-grey"> {t("Notifications")} </p>
        </div>
      </div>
      <Notifications />
    </div>
  );
};

export default page;
