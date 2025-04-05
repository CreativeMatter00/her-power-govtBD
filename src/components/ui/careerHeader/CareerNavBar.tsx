"use client";
import { useCookies } from "next-client-cookies";
import { useLocale, useTranslations } from "next-intl";
import Link from "next/link";
import { useState } from "react";
import { Dialog, DialogContent, DialogTrigger } from "../dialog";
import { Button } from "../button";
import RegistrationCard from "@/components/course/CourseHome/RegistrationCard";

const navItems = [
  { navItem: "Find Jobs", link: "career/all-jobs" },
  { navItem: "Find Task", link: "career/all-tasks" },
  { navItem: "Post Job", link: "career/profile/job-provider/post-job" },
  { navItem: "Post Task", link: "career/profile/job-provider/post-task" },
];

const CareerNavBar = () => {
  const t = useTranslations("career");

  const locale = useLocale();
  const cookies = useCookies();
  const isOrganizer = cookies.get("isOrganizer") === "true";
  const userId = cookies.get("user_pid");
  const isJobProvider = cookies.get("isJobProvider") === "true";
  const isSeeker = cookies.get("isJobSeeker") === "true";
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const closeDialog = () => setIsDialogOpen(false);

  return (
    <ul className="flex justify-evenly items-center gap-6 max-md:text-sm text-base text-bgPrimary font-normal h-full">
      <Link
        href={`/${locale}/career`}
        className="cursor-pointer hover:underline underline-offset-8 decoration-2"
      >
        {t("Home")}
      </Link>
      {!isJobProvider ? (
        <>
          <li className="list-none">
            <Link
              href={`/${locale}/career/all-jobs`}
              className="cursor-pointer hover:underline underline-offset-8 decoration-2"
            >
              {t("FindJobs")}
            </Link>
          </li>
          <li className="list-none">
            <Link
              href={`/${locale}/career/all-tasks`}
              className="cursor-pointer hover:underline underline-offset-8 decoration-2"
            >
              {t("FindFreelanceServices")}
            </Link>
          </li>
          {isSeeker && (
            <li className="list-none">
              <Link
                href={`/${locale}/career/profile/job-seeker`}
                className="cursor-pointer hover:underline underline-offset-8 decoration-2"
              >
                {t("SeekerProfile")}
              </Link>
            </li>
          )}
        </>
      ) : (
        <>
          <li className="list-none">
            <Link
              href={`/${locale}/career/profile/job-provider/post-job`}
              className="cursor-pointer hover:underline underline-offset-8 decoration-2"
            >
              {t("PostJobs")}
            </Link>
          </li>
          <li className="list-none">
            <Link
              href={`/${locale}/career/profile/job-provider/post-task`}
              className="cursor-pointer hover:underline underline-offset-8 decoration-2"
            >
              {t("PostFreelanceServices")}
            </Link>
          </li>
          <li className="list-none">
            <Link
              href={`/${locale}/career/profile/job-provider/profile`}
              className="cursor-pointer hover:underline underline-offset-8 decoration-2"
            >
              {t("Profile")}
            </Link>
          </li>
        </>
      )}
      {!isJobProvider && !isSeeker && (
        <div className="z-[99999]">
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button
                className={`text-center text-base font-medium hover:underline underline-offset-8 decoration-2 duration-300`}
              >
                {t("Register")}
              </Button>
            </DialogTrigger>
            <DialogContent className="w-[50vw] bg-white h-96">
              <div className="flex justify-center items-center gap-16">
                <Link
                  href={ userId ? `/${locale}/career/job-provider-registration` : `/${locale}/login`}
                  onClick={closeDialog}
                >
                  <RegistrationCard
                    registrationLogo="/assets/images/course/course registration/Teacher.png"
                    registrationType="I am a Job Provider"
                  />
                </Link>
                <Link
                   href={userId ? `/${locale}/career/job-seeker-registration` : `/${locale}/login`}
                  onClick={closeDialog}
                >
                  <RegistrationCard
                    registrationLogo="/assets/images/course/course registration/Student.png"
                    registrationType="I am a Jobs Seeker"
                  />
                </Link>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      )}
    </ul>
  );
};

export default CareerNavBar;
