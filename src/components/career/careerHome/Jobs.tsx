"use client";

import { useLocale, useTranslations } from "next-intl";
import Link from "next/link";
import { IoMdArrowForward } from "react-icons/io";
import JobsCard from "./JobsCard";
import { useQuery } from "@tanstack/react-query";
import { getLatestJobs } from "@/api/api";
import ScaleLoader from "react-spinners/ScaleLoader";
import CourseLoader from "@/components/shared/loader/CourseLoader";
import CareerLoader from "@/components/shared/loader/CareerLoader";

const Jobs = () => {
  const t = useTranslations("career");

  const locale = useLocale();

  // =========== DATA FETCHING =========

  const { isLoading, data, error } = useQuery({
    queryKey: ["getLatestJobs"],
    queryFn: () => getLatestJobs(),
  });

  // console.log(data);

  if (error)
    return (
      <div className="text-center text-xl font-md py-8">
        {t("Something_went_wrong")}
      </div>
    );

  return (
    <div className="container mx-auto">
      <div className="w-full px-3 py-3 bg-brandLsSecondary text-xl font-bold">
        {t("Jobsforyou")}
      </div>
      {isLoading ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {Array.from({ length: 8 }).map((_, index) => (
            <div key={index} className="mx-auto">
              <CareerLoader />
            </div>
          ))}
        </div>
      ) : (
        <div className="w-full grid grid-cols-3 gap-5 mt-5">
          {data.map((job: any, index: number) => (
            <JobsCard
              key={index}
              id={job.jobpost_pid}
              title={job.jobtitle}
              companyName={job.provider_name}
              description={job.jobdescription}
              location={job.job_location}
              time={job.job_type}
              type={job.workplace_type}
            />
          ))}
        </div>
      )}
      <div className="flex justify-end mt-6">
        <Link href={`/${locale}/career/all-jobs`}>
          <div className="flex items-center gap-2 text-brandPrimary cursor-pointer group ">
            <p className="text-base hover:underline underline-offset-2">
              {t("Seeall")}
            </p>
            <IoMdArrowForward className="w-5 h-5" />
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Jobs;
