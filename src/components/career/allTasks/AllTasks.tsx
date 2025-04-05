"use client";

import AllTaskCard from "./AllTaskCard";
import { useQuery } from "@tanstack/react-query";
import { getAllTasks } from "@/api/api";
import EventsPagination from "@/components/shared/EventsPagination";
import { useState } from "react";
import CareerLoader from "@/components/shared/loader/CareerLoader";
import { useTranslations } from "next-intl";

const AllTasks = () => {
  const t = useTranslations("career");

  // =========== DATA FETCHING =========
  const [currentPage, setCurrentPage] = useState<number>(1);
  const { isLoading, data, error } = useQuery({
    queryKey: ["getAllTasks", currentPage],
    queryFn: () => getAllTasks(currentPage),
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

  // console.log(data);

  if (error)
    return (
      <div className="text-center text-xl font-md py-8">
        {t("Something went wrong. Please reload")}
      </div>
    );

  return (
    <section className="container my-14">
      <main className="flex flex-col gap-10">
        <div className="bg-brandLsSecondary">
          <p className="font-bold text-2xl p-5">{t("All Freelance Services")}</p>
        </div>
        {/* ============ SEARCH FORM =============== */}

        {isLoading ? (
          <div className="grid grid-cols-2 md:grid-cols-3  gap-5">
            {Array.from({ length: 8 }).map((_, index) => (
              <div key={index} className="mx-auto">
                <CareerLoader />
              </div>
            ))}
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-[25px]">
              {data.data.tasks.map((task: any, index: number) => (
                <AllTaskCard
                  key={index}
                  id={task.taskpost_pid}
                  title={task.jobtitle}
                  description={task.jobdescription}
                  time={task.duration}
                />
              ))}
            </div>
            <EventsPagination
              currentPage={currentPage}
              hasPreviousPage={data?.meta?.current_page[0] > 1}
              hasNextPage={data?.meta?.current_page[0] < data?.meta?.last_page}
              onPreviousPage={handlePreviousPage}
              onNextPage={handleNextPage}
            />
          </>
        )}
      </main>
    </section>
  );
};

export default AllTasks;
