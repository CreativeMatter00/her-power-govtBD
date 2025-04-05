"use client";

import Link from "next/link";
import { IoMdArrowForward } from "react-icons/io";
import TaskCard from "./TaskCard";
import { useLocale, useTranslations } from "next-intl";
import { getLatestTasks } from "@/api/api";
import { useQuery } from "@tanstack/react-query";
import ScaleLoader from "react-spinners/ScaleLoader";
import CareerLoader from "@/components/shared/loader/CareerLoader";

const Tasks = () => {
  const locale = useLocale();
  const t = useTranslations("career");
  // =========== DATA FETCHING =========

  const { isLoading, data, error } = useQuery({
    queryKey: ["getLatestTasks"],
    queryFn: () => getLatestTasks(),
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
        {t("FreelanceServicesforyou")}
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
        <div className="w-full grid grid-cols-2 gap-5 mt-5">
          {data.map((task: any, index: number) => (
            <TaskCard
              key={index}
              id={task.taskpost_pid}
              title={task.jobtitle}
              description={task.jobdescription}
              time={task.duration}
            />
          ))}
        </div>
      )}
      <div className="flex justify-end mt-6">
        <Link href={`/${locale}/career/all-tasks`}>
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

export default Tasks;
