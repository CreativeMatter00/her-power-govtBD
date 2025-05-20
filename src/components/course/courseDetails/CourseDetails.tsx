"use client";

import ImagePart from "./ImagePart";
import { Banner } from "./Banner";
import Preliminary from "./Preliminary";
import { useQuery } from "@tanstack/react-query";
import { api, getCourseDetail, getCourseDetailWithStudentId, url } from "@/api/api";
import { useParams, usePathname, useRouter } from "next/navigation";
import ScaleLoader from "react-spinners/ScaleLoader";
import axios from "axios";
import { useState } from "react";
import { useCookies } from "next-client-cookies";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogTrigger,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import SuccessModal from "@/components/events/eventDetails/SuccessModal";
import { useLocale, useTranslations } from "next-intl";
import Link from "next/link";

const CourseDetails = () => {
  const t = useTranslations("career");

  const param = useParams();
  const locale = useLocale();
  const id = param.id as string;
  const cookies = useCookies();
  const studentId = cookies.get("student_pid");
  const isProvider = cookies.get("isProvider");
  const [loading, setLoading] = useState(false);
  const [openModal, setOpenModal] = useState<boolean>();
  const [responseData, setResponseData] = useState<any>({});
  const router = useRouter();
  const pathName = usePathname();

  const [open, setOpen] = useState<boolean>(false);
	
  // =========== DATA FETCHING =========
  const { isLoading, data, error,refetch } = useQuery({
    queryKey: ["getCourseDetail", id, studentId],
    queryFn: async ({ queryKey }) => {
      const courseId = queryKey[1] as string;
      const studentId = queryKey[2] as string | undefined;

      if (studentId) {
        return await getCourseDetailWithStudentId(courseId, studentId);
      } else {
        return await getCourseDetail(courseId);
      }
    },
  });
  const student_pid = cookies.get("student_pid");
  const userPid = cookies.get("user_pid");
// console.log("data",data);

  if (isLoading) {
    return (
      <div className="w-full min-h-[300px] flex justify-center items-center">
        <ScaleLoader color="#421957" height={70} radius={8} width={10} />
      </div>
    );
  }

  if (error)
    return (
      <div className="text-center text-xl font-md py-8">
        {t("Something went wrong. Please reload")}
      </div>
    );

  // =========== Enrollment =========

  const onEnroll = async () => {
    setLoading(true);
    const submissionData = {
      student_pid,
      course_pid: data?.data?.course_pid,
    };
    if (!student_pid) {
      router.push(`/${locale}/login`);
    } else {
      try {
        const response = await api.post(
          `/api/frontend/student-course-enroll`,
          submissionData
        );
        if (response?.data?.meta?.status) {
          setOpenModal(true);
          setResponseData(response.data);
        }
        refetch();
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <>
      <section className=" container p-4">
        <main>
          <ImagePart
            image={data?.data?.banner}
            courseTitle={data?.data?.course_title}
          />
          {/* ------ BANNER --------- */}
          <Banner
            price={data?.data?.course_price}
            provider={data?.data?.providor_name}
          />

          {/* ----------- COURSE DETAILS ------------------- */}
          <Preliminary description={data?.data?.description} />

          <div className="flex justify-center">
            {loading ? (
              <div className="flex w-full items-center justify-center">
                <ScaleLoader height={24} color="#421957" />
              </div>
            ) : (
              <div>
                {
                  isProvider === "false" &&  data?.data?.already_enrolled === "FALSE" &&
                <button
                  className="bg-[#13A14A] px-8 py-1 rounded-3xl text-lg text-[#FFFFFF] mt-4"
                  onClick={() => setOpen(true)}
                >
                  {t("Enroll Now")}
                </button>
                }
                {data?.data?.already_enrolled === "TRUE" ? (
                  <Link href={`/${locale}/course/video/${data?.data?.course_pid}`}>
                  <button className="bg-[#13A14A] px-8 py-1 rounded-3xl text-lg text-[#FFFFFF] mt-4">
                    {t("View Course")}
                  </button>
                </Link>
                ) : (
                  <AlertDialog open={open} onOpenChange={setOpen}>
                    <AlertDialogTrigger asChild></AlertDialogTrigger>
                    <AlertDialogContent className="bg-white">
                      <AlertDialogHeader>
                        <AlertDialogTitle>
                          {userPid && student_pid ? (
                            <>{t("Confirm Registration")}</>
                          ) : (
                            <>
                              {!userPid && !student_pid ? (
                                <>{t("You need to login first")}</>
                              ) : (
                                <>{t("You need to registration as student")}</>
                              )}
                            </>
                          )}
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                          {student_pid && userPid ? (
                            <>{t("are_you_sure")}</>
                          ) : (
                            <>
                              {!userPid ? (
                                <>{t("need_reg")}</>
                              ) : (
                                <>{t("as_student")}</>
                              )}
                            </>
                          )}
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>{t("Cancel")}</AlertDialogCancel>
                        {!student_pid && !userPid && (
                          <Link
                            href={{
                              pathname: `/${locale}/login`,
                              query: { redirect: pathName },
                            }}
                            // href={`/${locale}/login`}
                          >
                            <AlertDialogAction className="bg-brandDs text-brandLsPrimary">
                              {t("Login")}
                            </AlertDialogAction>
                          </Link>
                        )}
                        {!student_pid && !userPid && (
                          <Link
                            href={{
                              pathname: `/${locale}/registration`,
                              query: { redirect: pathName },
                            }}
                            //  href={`/${locale}/registration`}
                          >
                            <AlertDialogAction className="bg-brandDs text-brandLsPrimary">
                              {t("Sign up")}
                            </AlertDialogAction>
                          </Link>
                        )}
                        {!student_pid && userPid && (
                          <Link href={`/${locale}/course/registration/student`}>
                            <AlertDialogAction className="bg-brandDs text-brandLsPrimary">
                              {t("Registration")}
                            </AlertDialogAction>
                          </Link>
                        )}
                        {student_pid && userPid && (
                          <AlertDialogAction
                            onClick={onEnroll}
                            className="bg-brandDs text-brandLsPrimary"
                          >
                            {t("Confirm")}
                          </AlertDialogAction>
                        )}
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                )}
              </div>
            )}
          </div>
        </main>
        <Dialog open={openModal} onOpenChange={setOpenModal}>
          <DialogContent className="bg-white w-[40vw]">
            <SuccessModal
              messageDescription={`Congratulations! You have successfully enrolled in the ${data?.data?.course_title} course. Get ready to embark on an exciting journey of learning and growth`}
              message={"Successfully registered the Course!"}
            />
          </DialogContent>
        </Dialog>
      </section>
    </>
  );
};

export default CourseDetails;
