"use client";

import { useLocale, useTranslations } from "next-intl";
import Link from "next/link";
import { IoMdArrowForward } from "react-icons/io";
import JobsCard from "../careerHome/JobsCard";

const Jobs = ({
  data,
  searchName,
}: {
  data: any;
  searchName: string | null;
}) => {
  const t = useTranslations("career");
  return (
    <div className="container mx-auto">
      <div className="w-full px-3 py-3 bg-brandLsSecondary text-xl font-bold">
        {t("Jobssearchfor")} {`${searchName}`}
      </div>
      {data?.length === 0 ? (
        <div className="w-full min-h-52 flex justify-center items-center">
          {t("Thereisnojobsfor")} {searchName}.
        </div>
      ) : (
        <>
          <div className="w-full grid grid-cols-3 gap-5 mt-5">
            {data.map((job: any, index: number) => (
              <JobsCard
                key={index}
                id={job.jobpost_pid}
                title={job.jobtitle}
                companyName={job.jobtitle}
                description={job.jobtitle}
                location={job.job_location}
                time={job.job_type}
                type={job.workplace_type}
              />
            ))}
          </div>
        </>
      )}

      {/* <div className="flex justify-end mt-6">
                <Link href={`/${locale}/career/all-jobs`}>
                    <div className="flex items-center gap-2 text-brandPrimary cursor-pointer group ">
                        <p className="text-base hover:underline underline-offset-2">
                            See all
                        </p>
                        <IoMdArrowForward className="w-5 h-5" />
                    </div>
                </Link>
            </div> */}
    </div>
  );
};

export default Jobs;
