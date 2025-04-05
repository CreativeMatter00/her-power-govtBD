"use client";

import { useQuery } from "@tanstack/react-query";
import AllJobCard from "./AllJobCard";
import { getAllJobs } from "@/api/api";
import ScaleLoader from "react-spinners/ScaleLoader";
import EventsPagination from "@/components/shared/EventsPagination";
import { useState } from "react";
import CareerLoader from "@/components/shared/loader/CareerLoader";
import { useTranslations } from "next-intl";

const AllJobs = () => {
	const t = useTranslations("career");

  const [currentPage, setCurrentPage] = useState(1);
  const { isLoading, data, error } = useQuery({
    queryKey: ["getAllJobs", currentPage],
    queryFn: () => getAllJobs(currentPage),
  });

  const handleNextPage = () => {
    if (data?.meta?.current_page[0] < data?.meta?.last_page) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (data?.meta?.current_page[0] > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  if (error)
    return (
      <div className="text-center text-xl font-md py-8">
        {t("Something went wrong. Please reload")}
      </div>
    );

  return (
    <div>
      <div className="container mx-auto py-8">
        <div className="w-full px-3 py-3 bg-brandLsSecondary text-xl font-bold">
          {t("Jobs for you")}
        </div>

        <div className="pt-10">
          {isLoading ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {Array.from({ length: 8 }).map((_, index) => (
                <div key={index} className="mx-auto">
                  <CareerLoader />
                </div>
              ))}
            </div>
          ) : (
            <>
              <div className="grid grid-cols-2 gap-6">
                {data.data.jobs.map((job: any, index: number) => (
                  <div key={index}>
                    <AllJobCard
                      id={job.jobpost_pid}
                      title={job.jobtitle}
                      companyName={job.provider_name}
                      description={job.company_type}
                      location={job.job_location}
                      time={job.job_type}
                      type={job.workplace_type}
                    />
                  </div>
                ))}
              </div>
              <EventsPagination
                currentPage={currentPage}
                hasPreviousPage={data?.meta?.current_page[0] > 1}
                hasNextPage={
                  data?.meta?.current_page[0] < data?.meta?.last_page
                }
                onPreviousPage={handlePreviousPage}
                onNextPage={handleNextPage}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default AllJobs;
