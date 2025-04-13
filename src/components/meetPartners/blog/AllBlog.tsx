"use client";

import BreadCrumb from "@/components/ui/breadcrumb/BreadCrumb";
import Blog from "./Blog";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import EventsPagination from "@/components/shared/EventsPagination";
import { getAllBlogs } from "@/api/api";
import CareerLoader from "@/components/shared/loader/CareerLoader";
import { useTranslations } from "next-intl";

const AllBlog = () => {
  const t = useTranslations("Blog");

  const [currentPage, setCurrentPage] = useState<number>(1);
  const { isLoading, data, error } = useQuery({
    queryKey: ["getAllBlogs", currentPage],
    queryFn: () => getAllBlogs(currentPage),
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
      {/* breadcrumb */}
      <div className="mt-14 mb-2 max-w-7xl container ">
        <BreadCrumb
          title1="Blogs"
          link1="meet-partners"
          title2="All Blog Posts"
        />
      </div>
      {/*  */}
      <section className="border-t-2 border-brandLsPrimary mb-4 ">
        <div className="max-w-7xl container flex flex-col">
          {/* title */}
          <div className="mt-7 mb-2 flex flex-col ">
            <h1 className="text-3xl text-brandDs font-normal">
              {t("AllBlogPosts")}
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
                <Blog data={data} />
              ) : (
                <div className=" py-32 flex justify-center items-center text-2xl text-gray-500">
                  {t(`No Data Available`)}
                </div>
              )}
            </>
          )}
           {Array.isArray(data?.data) && 
          <div className="mb-8">
            <EventsPagination
              currentPage={currentPage}
              hasPreviousPage={data?.current_page > 1}
              hasNextPage={data?.current_page < data?.last_page}
              onPreviousPage={handlePreviousPage}
              onNextPage={handleNextPage}
            />
          </div>
           }
        </div>
      </section>
    </>
  );
};

export default AllBlog;
