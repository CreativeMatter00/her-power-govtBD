"use client";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import EventsPagination from "@/components/shared/EventsPagination";
import { getAllArticles } from "@/api/api";
import CareerLoader from "@/components/shared/loader/CareerLoader";
import ResCard from "../ResCard";
import { useTranslations } from "next-intl";

const AllArticles = () => {
  const t = useTranslations("resources_Library");

  interface cardProps {
    card_pid: string;
    cardImage: string;
    cardTitle: string;
    cardDate: any;
    cardDes: string;
  }
  // =========== DATA FETCHING =========
  const [currentPage, setCurrentPage] = useState<number>(1);
  const { isLoading, data, error } = useQuery({
    queryKey: ["getAllArticles", currentPage],
    queryFn: () => getAllArticles(currentPage),
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
        {t("Something went wrong. Please reload")}
      </div>
    );
  return (
    <div className="mt-20 container max-w-7xl">
      <h1 className="text-brandDs text-3xl font-normal">{t("articles")}</h1>
      <div className="border-b border-brandLsPrimary w-full my-6"></div>
      {isLoading ? (
        <div className="grid  lg:grid-cols-4 md:grid-cols-3 grid-cols-1 gap-x-8 gap-y-8 my-6">
          {Array.from({ length: 8 }).map((_, index) => (
            <div key={index} className="mx-auto">
              <CareerLoader />
            </div>
          ))}
        </div>
      ) : (
        <>
          <div className="grid  md:grid-cols-3 grid-cols-1 gap-x-8 gap-y-8 my-6">
            {data?.data?.map((items: any, index: number) => (
              <ResCard
                key={index}
                card_pid={items.post_pid}
                cardImage={items.thumbnail_file_url}
                cardTitle={items.title}
                cardDate={items.cre_date}
                cardDes={items.description}
                title={"Articles"}
              />
            ))}
          </div>
          <div className="mb-8">
            <EventsPagination
              currentPage={currentPage}
              hasPreviousPage={data?.current_page > 1}
              hasNextPage={data?.current_page < data?.last_page}
              onPreviousPage={handlePreviousPage}
              onNextPage={handleNextPage}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default AllArticles;
