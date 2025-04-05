"use client";
import styles from "@/styles/Events.module.css";
import { CgProfile } from "react-icons/cg";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { usePathname } from "next/navigation";
import { BsPersonWorkspace } from "react-icons/bs";
import { FaTasks } from "react-icons/fa";
import Image from "next/image";
import { useCookies } from "next-client-cookies";
import { getStudentInfo } from "@/api/api";
import { useQuery } from "@tanstack/react-query";

const Sidebar = () => {
  const t = useTranslations("course");
  const locale = useLocale();
  const path = usePathname();
  const cookies = useCookies();
  const userId = cookies.get("user_pid");
  const lastWord = path.split("/").filter(Boolean).pop();
  const [activeItem, setActiveItem] = useState<string>("student-profile");

  useEffect(() => {
    if (lastWord === "student-profile") {
      setActiveItem("student-profile");
    } else if (lastWord === "student-courses") {
      setActiveItem("student-courses");
    }
  }, [lastWord]);

  const { isLoading, data, error } = useQuery({
    queryKey: ["getStudentInfo"],
    queryFn: () => getStudentInfo(userId as string),
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
                className="h-48 w-48 object-cover rounded-full border-2 border-brandDs z-10"
                alt="profile images"
              />
            </div>
            <h1>{data?.data?.name}</h1>
          </div>

          <Link href={`/${locale}/course/student-profile`}>
            <div
              className={`flex items-center gap-3 p-4 hover:cursor-pointer hover:bg-brandLsSecondary ${
                activeItem === "student-profile" ? "bg-brandLsPrimary" : ""
              }`}
            >
              <CgProfile
                className={`w-6 h-6 ${
                  activeItem === "student-profile"
                    ? "text-brandDs"
                    : "text-brandPrimary"
                }`}
              />
              <p
                className={`${
                  activeItem === "student-profile" ? "text-brandDs" : ""
                }`}
              >
                {t("Student Information")}
              </p>
            </div>
          </Link>

          {/* ============================ MY PROFILE ======================================= */}
          <Link href={`/${locale}/course/student-courses`}>
            <div
              className={`flex items-center gap-3 p-4 hover:cursor-pointer hover:bg-brandLsSecondary ${
                activeItem === "student-courses" ? "bg-brandLsPrimary" : ""
              }`}
            >
              <BsPersonWorkspace
                className={`w-6 h-6 ${
                  activeItem === "student-courses"
                    ? "text-brandDs"
                    : "text-brandPrimary"
                }`}
              />
              <p
                className={`${activeItem === "courses" ? "text-brandDs" : ""}`}
              >
                {t("Enrolled Courses")}
              </p>
            </div>
          </Link>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
