"use client";

import { getStudentInfo, getUserInfo } from "@/api/api";
import { useQuery } from "@tanstack/react-query";
import { useCookies } from "next-client-cookies";
import { useLocale, useTranslations } from "next-intl";
import Link from "next/link";
import React from "react";
import { FaEdit } from "react-icons/fa";
import ScaleLoader from "react-spinners/ScaleLoader";

const StudentProfile = () => {
  const t=useTranslations("course")
  const cookies = useCookies();
  const userId = cookies.get("user_pid");
  const locale = useLocale();
  // console.log('user id', userId)

  const {
    isLoading,
    data,
    error,
  } = useQuery({
    queryKey: ["getStudentInfo"],
    queryFn: () => getStudentInfo(userId as string),
  });
  console.log("data", data)

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

  return (
    <div className="">
      {/* ---------------------------- personal information --------------------------------- */}
      <div>
        <div className="flex gap-5 items-center  border-b border-brandLsPrimary mb-2">
          <h1 className="text-base font-bold pb-3">
            {t("Personal Information")}
          </h1>
          <Link href={`/${locale}/course/edit-student`}>
            <FaEdit />
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ">
          <div>
            <h1 className="text-greyPrimary ml-6">{t("Full Name")}</h1>
            <p className="px-6  py-1 mt-1">{data?.full_name}</p>
          </div>
          <div>
            <h1 className="text-greyPrimary ml-6">{t("Date of Birth")}</h1>
            <p className="px-6  py-1 mt-1">{data?.dob}</p>
          </div>
        </div>
      </div>
      <div>
        <h1 className="text-base font-bold pb-3 border-b border-brandLsPrimary mt-6 mb-2">
          {t("Education Information")}
        </h1>
        {
          data?.education_info?.map((educationInfo: any, index: number) => (
            <div key={index} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div>
                <h1 className="text-greyPrimary ml-6">{t("Degree")}</h1>
                <p className="px-6  py-1 mt-1">{educationInfo.degree}</p>
              </div>
              <div>
                <h1 className="text-greyPrimary ml-6">{t("Group/Department")}</h1>
                <p className="px-6  py-1 mt-1">{educationInfo.group_department}</p>
              </div>

              <div>
                <h1 className="text-greyPrimary ml-6">{t("CGPA")}</h1>
                <p className="px-6  py-1 mt-1">
                  {educationInfo.result_gpa} <span className="text-xs font-bold">{t("out of")}</span> {educationInfo.gpa_cgpa_outof}
                </p>
              </div>
              <div>
                <h1 className="text-greyPrimary ml-6">{t("Passing Year")}</h1>
                <p className="px-6  py-1 mt-1">{educationInfo.passing_year}</p>
              </div>
            </div>
          ))
        }
      </div>
    </div>
  );
};

export default StudentProfile;
