"use client";
import styles from "@/styles/Events.module.css";
import { CgProfile } from "react-icons/cg";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { usePathname } from "next/navigation";
import { BsPersonWorkspace } from "react-icons/bs";
import { FaTasks } from "react-icons/fa";
import { useCookies } from "next-client-cookies";
import { useQuery } from "@tanstack/react-query";
import { getUserInfo } from "@/api/api";
import Image from "next/image";

const Sidebar = () => {
  const t = useTranslations("career");
  const locale = useLocale();
  const path = usePathname();
  const cookies = useCookies();
  const userId = cookies.get("user_pid");
  const lastWord = path.split("/").filter(Boolean).pop();
  const [activeItem, setActiveItem] = useState<string>("job-seeker");

  useEffect(() => {
    if (lastWord === "job-seeker") {
      setActiveItem("job-seeker");
    }
  }, [lastWord]);

  const {
    isLoading: isUserLoading,
    error: userError,
    data,
  } = useQuery({
    queryKey: ["userInfo"],
    queryFn: () => getUserInfo(userId as string),
  });

  // console.log("data", data);

  return (
    <aside className={`${styles.dashboardSidebarShadow} min-w-fit`}>
      <div className="">
        <div className="flex flex-col gap-3 text-base text-brandPrimary bg-bgPrimary pb-12">
          <div className="w-full flex flex-col justify-center items-center p-3 border-b border-b-brandLsPrimary ">
            <div className="flex justify-center items-center rounded-full overflow-hidden">
              <Image
                src={
                  data?.profile_photo ||
                  "/assets/images/profile/avatar-profile.jpg"
                }
                width={100}
                height={100}
                alt="profile images"
              />
            </div>
            <h1>{data?.fname}</h1>
          </div>
          <Link href={`/${locale}/career/profile/job-seeker`}>
            <div
              className={`flex items-center gap-3 p-4 hover:cursor-pointer hover:bg-brandLsSecondary ${
                activeItem === "job-seeker" ? "bg-brandLsPrimary" : ""
              }`}
            >
              <CgProfile
                className={`w-6 h-6 ${
                  activeItem === "job-seeker"
                    ? "text-brandDs"
                    : "text-brandPrimary"
                }`}
              />
              <p
                className={`${
                  activeItem === "job-seeker" ? "text-brandDs" : ""
                }`}
              >
                {t("Profile")}
              </p>
            </div>
          </Link>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
