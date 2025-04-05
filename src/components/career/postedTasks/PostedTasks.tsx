"use client";
import React from "react";
import PostedTaskCard from "./PostedTaskCard";
import { useCookies } from "next-client-cookies";
import { useQuery } from "@tanstack/react-query";
import { getPostedTaskByProviderId } from "@/api/api";
import ScaleLoader from "react-spinners/ScaleLoader";
import { useTranslations } from "next-intl";

interface TaskPost {
  taskpost_pid: string;
  jobtitle: string;
  duration: string;
  jobdescription: string;
}

const PostedTasks = () => {
  const t = useTranslations("career");
  const cookies = useCookies();
  const jobProviderPid = cookies.get("jobProvider_pid");

  const { isLoading, error, data, refetch } = useQuery({
    queryKey: ["providerPostedTasks", jobProviderPid],
    queryFn: () => getPostedTaskByProviderId(jobProviderPid as string),
  });

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
        {t("Something_went_wrong")}
      </div>
    );

  return (
    <div className="mt-5 space-y-5">
      <h1 className="text-xl text-brandPrimary font-semibold">
        {t("AllPostedFreelanceServices")}
      </h1>
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 ">
        {data.map((task: TaskPost, index: number) => (
          <PostedTaskCard
            key={index}
            id={task.taskpost_pid}
            title={task.jobtitle}
            description={task.jobdescription}
            time={task.duration}
            refetch={refetch}
          />
        ))}
      </div>
    </div>
  );
};

export default PostedTasks;
