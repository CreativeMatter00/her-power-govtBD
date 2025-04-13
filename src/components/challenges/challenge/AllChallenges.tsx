"use client";

import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import EventsPagination from "@/components/shared/EventsPagination";
import { getAllChallenges } from "@/api/api";
import CareerLoader from "@/components/shared/loader/CareerLoader";
import { useTranslations } from "next-intl";
import Challenge from "./Challenge";

const AllChallenges = () => {
  const t = useTranslations("challenges");

  const [currentPage, setCurrentPage] = useState<number>(1);
  const { isLoading, data, error } = useQuery({
    queryKey: ["getAllChallenges", currentPage],
    queryFn: () => getAllChallenges(currentPage),
  });

  const handleNextPage = () => {
    if (data?.current_page < data?.last_page) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (data?.current_page > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  if (error)
    return (
      <div className="text-center text-xl font-md py-8">
        {t("Somethingwentwrong")}
      </div>
    );
  return (
    <>
      {/*  */}
      <section className="border-t-2 border-brandLsPrimary mb-4 ">
        <div className="max-w-7xl container flex flex-col">
          {/* title */}
          <div className="mt-7 mb-2 flex flex-col ">
            <h1 className="text-3xl text-brandDs font-normal">
              {t("AllChallenges")}
            </h1>
            <p className="w-full h-[2px] bg-brandLsPrimary my-6"></p>
          </div>

          {/* blogposts */}
          {isLoading ? (
            <div className="grid  lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-x-8 gap-y-8 my-6">
              {Array.from({ length: 8 }).map((_, index) => (
                <div key={index} className="mx-auto">
                  <CareerLoader />
                </div>
              ))}
            </div>
          ) : (
            <>
              {Array.isArray(data?.data) ? (
                <Challenge data={data} />
              ) : (
                <div className=" py-32 flex justify-center items-center text-2xl text-gray-500">
                  {t(`No Data Available`)}
                </div>
              )}
            </>
          )}
          <div className="mb-8">
            <EventsPagination
              currentPage={currentPage}
              hasPreviousPage={data?.current_page > 1}
              hasNextPage={data?.current_page < data?.last_page}
              onPreviousPage={handlePreviousPage}
              onNextPage={handleNextPage}
            />
          </div>
        </div>
      </section>
    </>
  );
};

export default AllChallenges;
