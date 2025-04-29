"use client";

import { getCourseProviderInfoById, getProviderInfo } from "@/api/api";
import { useQuery } from "@tanstack/react-query";
import { useCookies } from "next-client-cookies";
import { useLocale, useTranslations } from "next-intl";
import Link from "next/link";
import { useParams } from "next/navigation";
import React from "react";
import { FaEdit } from "react-icons/fa";
import ScaleLoader from "react-spinners/ScaleLoader";

const ProviderInfo = () => {
  const t = useTranslations("providerInfo");
  const locale = useLocale();
  const cookies = useCookies();

  // ? Data Fetching

  const userId = cookies.get("user_pid");
  const email = cookies.get("email");
  // const mobile_no = cookies.get("mobile_no");

  const { isLoading, data, error } = useQuery({
    queryKey: ["getCourseProviderInfoById"],
    queryFn: () => getCourseProviderInfoById(userId as string),
  });

  // console.log("data course provider ==>> ", data);

  // if (error)
  // 	return (
  // 		<div className="text-center text-xl font-md py-8">
  // 			Something went wrong. Please reload
  // 		</div>
  // 	);

  return (
    <div>
      {isLoading ? (
        <div className="flex items-center justify-center">
          <ScaleLoader color="#421957" height={70} radius={8} width={10} />
        </div>
      ) : (
        <div>
          <div className="mb-4">
            <div className="flex items-center gap-5 pb-3 mb-2 ">
              <h1 className="text-base font-bold  border-b border-brandLsPrimary ">
                {t("Course Provider Information")}
              </h1>
              <Link
                href={`/${locale}/course/course-provider/edit-course-provider/${data.user_pid}`}
              >
                <FaEdit />
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 ">
              <div>
                <h1 className="text-greyPrimary ml-6">{t("Full Name")}</h1>
                <p className="px-6 py-1 mt-1">{data?.providor_name}</p>
              </div>
              <div>
                <h1 className="text-greyPrimary ml-6">{t("Mobile No")}</h1>
                
              </div>
              <div>
                <h1 className="text-greyPrimary ml-6">{t("Email")}</h1>
                <p className="px-6 py-1 mt-1">{email}</p>
              </div>
              <div>
                <h1 className="text-greyPrimary ml-6">{t("Website")}</h1>
                <p className="px-6  py-1 mt-1">{data?.website_address}</p>
              </div>
              <div>
                <h1 className="text-greyPrimary ml-6">{t("Address")}</h1>
                <p className="px-6  py-1 mt-1">{data?.address_line}</p>
              </div>
              <div>
                <h1 className="text-greyPrimary ml-6">{t("Tax ID")}</h1>
                <p className="px-6  py-1 mt-1">{data?.tax_reg_id}</p>
              </div>
              <div>
                <h1 className="text-greyPrimary ml-6">{t("TIN No")}</h1>
                <p className="px-6  py-1 mt-1">{data?.tin_number}</p>
              </div>
              <div>
                <h1 className="text-greyPrimary ml-6">{t("Trade License")}</h1>
                <p className="px-6  py-1 mt-1">{data?.trade_licence}</p>
              </div>
              <div>
                <h1 className="text-greyPrimary ml-6">{t("VAT ID")}</h1>
                <p className="px-6  py-1 mt-1">{data?.vat_reg_id}</p>
              </div>
            </div>
          </div>

          <div className="mb-4">
            <h1 className="text-base font-bold pb-3 border-b border-brandLsPrimary mb-2">
              {t("Branches")}
            </h1>
            {data?.branch?.map((d: any) => (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-2 ">
                <div>
                  <h1 className="text-greyPrimary ml-6">{t("Branch Name")}</h1>
                </div>
                <div>
                  <h1 className="text-greyPrimary ml-6">
                    {t("Branch Location")}
                  </h1>
                </div>
                <p className="px-6  py-1 mt-1">{d?.branch_name}</p>
                <p className="px-6  py-1 mt-1">{d?.address_line}</p>
              </div>
            ))}
          </div>

          <div className="mb-4">
            <h1 className="text-base font-bold pb-3 border-b border-brandLsPrimary mb-2">
              {t("Expertise")}
            </h1>
            {data?.experience.map((expertise: any, index: number) => (
              <div
                key={index}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6"
              >
                <div>
                  <h1 className="text-greyPrimary ml-6">
                    {t("Worked as / Trained as")}
                  </h1>
                  <p className="px-6 py-1 mt-1">{expertise.work_as || "N/A"}</p>
                </div>
                <div>
                  <h1 className="text-greyPrimary ml-6">{t("Experience")}</h1>
                  <p className="px-6 py-1 mt-1">
                    {expertise.experiance || "N/A"}
                  </p>
                </div>
                <div>
                  <h1 className="text-greyPrimary ml-6">
                    {t("Institution Name")}
                  </h1>
                  <p className="px-6 py-1 mt-1">
                    {expertise.institution || "N/A"}
                  </p>
                </div>
                <div>
                  <h1 className="text-greyPrimary ml-6">
                    {t("Relevant Degree")}
                  </h1>
                  <p className="px-6 py-1 mt-1">
                    {expertise.relavent_dgree || "N/A"}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="mb-4">
            <h1 className="text-base font-bold pb-3 border-b border-brandLsPrimary mb-2">
              {t("Education")}
            </h1>
            {data?.education_info.map((education: any, index: number) => (
              <div
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6"
                key={index}
              >
                <div>
                  <h1 className="text-greyPrimary ml-6">{t("Degree")}</h1>
                  <p className="px-6  py-1 mt-1">{education.degree || "N/A"}</p>
                </div>
                <div>
                  <h1 className="text-greyPrimary ml-6">
                    {t("Group / Department")}
                  </h1>
                  <p className="px-6  py-1 mt-1">
                    {education.group_department || "N/A"}
                  </p>
                </div>
                <div>
                  <h1 className="text-greyPrimary ml-6">{t("Passing Year")}</h1>
                  <p className="px-6  py-1 mt-1">
                    {education.passing_year || "N/A"}
                  </p>
                </div>
                <div>
                  <h1 className="text-greyPrimary ml-6">{t("GPA / CGPA")} </h1>
                  <p className="px-6  py-1 mt-1">
                    {" "}
                    {education.result_gpa || "N/A"}{" "}
                  </p>
                </div>
                <div>
                  <h1 className="text-greyPrimary ml-6">
                    {t("GPA / CGPA out of")}{" "}
                  </h1>
                  <p className="px-6  py-1 mt-1">
                    {education.gpa_cgpa_outof || "N/A"}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProviderInfo;
