"use client";

import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import RegistrationCard from "@/components/course/CourseHome/RegistrationCard";
import { useLocale, useTranslations } from "next-intl";
import { useState } from "react";
import { useCookies } from "next-client-cookies";

const CourseNavbar = () => {
  const locale = useLocale();
  const cookies = useCookies();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const closeDialog = () => setIsDialogOpen(false);
  const t = useTranslations("OnlineNavbar");
  const isStudent = cookies.get("isStudent");
  const isProvider = cookies.get("isProvider");

  // console.log("isStudent", isStudent);
  // console.log("isProvider", isProvider);

  return (
    <>
      <div className="w-full">
        <div className="transition-all container text-base font-medium text-bgPrimary bg-[#763B90] py-3  fixed  z-[9999] min-w-full">
          <div className="container flex gap-6 items-center">
            <Link href={`/${locale}/course`}>
              <button
                className={`text-center  hover:underline underline-offset-8 decoration-2 duration-300`}
              >
                {t("courseCategory")}
              </button>
            </Link>

            {isStudent === "false" && isProvider === "false" && (
              <div className="z-[99999]">
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                  <DialogTrigger asChild>
                    <Button
                      className={`text-center text-base font-medium hover:underline underline-offset-8 decoration-2 duration-300`}
                    >
                      Register
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="w-[80vw] lg:w-[50vw] bg-white h-96">
                    <div className="flex justify-center items-center gap-16">
                      <Link
                        href={`/${locale}/course/registration/course-provider`}
                        onClick={closeDialog}
                      >
                        <RegistrationCard
                          registrationLogo="/assets/images/course/course registration/Teacher.png"
                          registrationType={t("I_am_a_course_provider")}
                        />
                      </Link>
                      <Link
                        href={`/${locale}/course/registration/student`}
                        onClick={closeDialog}
                      >
                        <RegistrationCard
                          registrationLogo="/assets/images/course/course registration/Student.png"
                          registrationType={t("I_am_a_student")}
                        />
                      </Link>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            )}
            {isStudent === "true" && (
              <Link href={`/${locale}/course/student-courses`}>
                <button
                  className={`text-center hover:underline underline-offset-8 decoration-2 duration-300`}
                >
                  {t("myCourses")}
                </button>
              </Link>
            )}
            {isProvider === "true" && (
              <Link href={`/${locale}/course/course-provider/add-new-course`}>
                <button
                  className={`text-center hover:underline underline-offset-8 decoration-2 duration-300`}
                >
                  {t("addNewCourse")}
                </button>
              </Link>
            )}
            {isProvider === "true" && (
              <Link href={`/${locale}/course/course-provider/dashboard`}>
                <button
                  className={`text-center hover:underline underline-offset-8 decoration-2 duration-300`}
                >
                  {t("profile")}
                </button>
              </Link>
            )}
            {isStudent === "true" && (
              <Link href={`/${locale}/course/student-profile`}>
                <button
                  className={`text-center hover:underline underline-offset-8 decoration-2 duration-300`}
                >
                  {t("studentProfile")}
                </button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default CourseNavbar;
