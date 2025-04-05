"use client";
import React from "react";
import PostedJobsCard from "./PostedJobsCard";
import { useCookies } from "next-client-cookies";
import { useQuery } from "@tanstack/react-query";
import { getPostedJobsByProviderId } from "@/api/api";
import ScaleLoader from "react-spinners/ScaleLoader";
import { useTranslations } from "next-intl";

interface JobPost {
  jobpost_pid: string;
  jobprovider_pid: string;
  jobtitle: string;
  workplace_type: "hybrid" | "remote" | "onsite"; // Use specific types if known
  job_location: string;
  job_type: "Full time" | "Part time" | "Contract"; // Use specific types if known
  validdate: string; // or Date if you plan to convert it to a Date object
  companyName: string;
  jobdescription: string;
  provider_name: string;
}

const PostedJobs = () => {
  const t = useTranslations("career");

  const cookies = useCookies();
  const jobProviderPid = cookies.get("jobProvider_pid");

  const { isLoading, error, data, refetch } = useQuery({
    queryKey: ["providerPostedJobs", jobProviderPid],
    queryFn: () => getPostedJobsByProviderId(jobProviderPid as string),
  });


  if (isLoading) {
    return (
      <div className="w-full min-h-[300px] flex justify-center items-center">
        <ScaleLoader color="#421957" height={70} radius={8} width={10} />
      </div>
    );
  }

  // if (error )
  //   return (
  //     <div className="text-center text-xl font-md py-8">
  //       {t("Something_went_wrong")}

  //     </div>
  //   );
  return (
    <div className="mt-5 space-y-5">
      <h1 className="text-xl text-brandPrimary font-semibold">
        {t("AllPostedJobs")}
      </h1>
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 ">
        {data?.map((post: JobPost, index: number) => (
          <PostedJobsCard
            key={index}
            id={post.jobpost_pid}
            title={post.jobtitle}
            companyName={post?.provider_name || "N/A"}
            description={post.jobdescription || "N/A"}
            location={post.job_location}
            type={post.job_type}
            workLocation={post.job_location}
            refetch={refetch}
          />
        ))}
      </div>
    </div>
  );
};

export default PostedJobs;
