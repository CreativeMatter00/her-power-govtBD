"use client";
import styles from "@/styles/Events.module.css";
import { TbBrandGoogleAnalytics } from "react-icons/tb";
import { RiInboxArchiveLine } from "react-icons/ri";
import { IoSpeedometerOutline } from "react-icons/io5";
import { MdOutlineCreateNewFolder } from "react-icons/md";
import { IoCreate } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { usePathname } from "next/navigation";
import { BsPersonWorkspace } from "react-icons/bs";
import { FaTasks } from "react-icons/fa";
import { useCookies } from "next-client-cookies";
import { useQuery } from "@tanstack/react-query";
import { getStudentInfo, getUserInfo } from "@/api/api";
import Image from "next/image";

const Sidebar = () => {
  const t = useTranslations("career");
  const locale = useLocale();
  const path = usePathname();
  const cookies = useCookies();
  const userId = cookies.get("user_pid");
  const lastWord = path.split("/").filter(Boolean).pop();

  const [activeItem, setActiveItem] = useState<string>("dashboard");

  useEffect(() => {
    if (lastWord === "profile") {
      setActiveItem("profile");
    } else if (lastWord === "posted-jobs") {
      setActiveItem("postedJobs");
    } else if (lastWord === "posted-tasks") {
      setActiveItem("postedTasks");
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

  return (
    <aside className={`${styles.dashboardSidebarShadow} min-w-fit`}>
      <div className="">
        <div className="flex flex-col gap-3 text-base text-brandPrimary bg-bgPrimary pb-12">
          {/* ==================================== DASHBOARD ============================= */}
          <div className="w-full flex flex-col justify-center items-center p-3 border-b border-b-brandLsPrimary ">
            <div className="flex justify-center items-center rounded-full overflow-hidden">
              <Image
                src={
                  data?.profile_photo ||
                  "/assets/images/profile/avatar-profile.jpg"
                }
                width={100}
                height={100}
                className="h-32 w-32 object-cover rounded-full border-2 border-brandDs z-10"
                alt="profile images"
              />
            </div>
            <h1>{data?.fname}</h1>
          </div>
          <Link href={`/${locale}/career/profile/job-provider/profile`}>
            <div
              className={`flex items-center gap-3 p-4 hover:cursor-pointer hover:bg-brandLsSecondary ${
                activeItem === "profile" ? "bg-brandLsPrimary" : ""
              }`}
            >
              <CgProfile
                className={`w-6 h-6 ${
                  activeItem === "profile"
                    ? "text-brandDs"
                    : "text-brandPrimary"
                }`}
              />
              <p
                className={`${activeItem === "profile" ? "text-brandDs" : ""}`}
              >
                {t("Profile")}
              </p>
            </div>
          </Link>

          {/* ============================ MY PROFILE ======================================= */}
          <Link href={`/${locale}/career/profile/job-provider/posted-jobs`}>
            <div
              className={`flex items-center gap-3 p-4 hover:cursor-pointer hover:bg-brandLsSecondary ${
                activeItem === "postedJobs" ? "bg-brandLsPrimary" : ""
              }`}
            >
              <BsPersonWorkspace
                className={`w-6 h-6 ${
                  activeItem === "postedJobs"
                    ? "text-brandDs"
                    : "text-brandPrimary"
                }`}
              />
              <p
                className={`${
                  activeItem === "postedJobs" ? "text-brandDs" : ""
                }`}
              >
                {t("PostedJobs")}
              </p>
            </div>
          </Link>
          {/* =============================== CREATE EVENT ================================= */}
          <Link href={`/${locale}/career/profile/job-provider/posted-tasks`}>
            <div
              className={`flex items-center gap-3 p-4 hover:cursor-pointer hover:bg-brandLsSecondary ${
                activeItem === "postedTasks" ? "bg-brandLsPrimary" : ""
              }`}
            >
              <FaTasks
                className={`w-6 h-6 ${
                  activeItem === "postedTasks"
                    ? "text-brandDs"
                    : "text-brandPrimary"
                }`}
              />
              <p
                className={`${
                  activeItem === "postedTasks" ? "text-brandDs" : ""
                }`}
              >
                {t("postedServices")}
              </p>
            </div>
          </Link>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
