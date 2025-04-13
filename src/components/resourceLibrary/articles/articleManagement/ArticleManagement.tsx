"use client";
import { useLocale, useTranslations } from "next-intl";
import BreadCrumb from "@/components/ui/breadcrumb/BreadCrumb";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import EventsPagination from "@/components/shared/EventsPagination";
import { getAllArticles, url } from "@/api/api";
import CareerLoader from "@/components/shared/loader/CareerLoader";
import Link from "next/link";
import axios from "axios";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export const ArticleManagement = () => {
  const t = useTranslations("resources_Library");
  const locale = useLocale();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState("");
  const { isLoading, data, error, refetch } = useQuery({
    queryKey: ["getAllArticles", currentPage],
    queryFn: () => getAllArticles(currentPage),
  });

  const handleDelete = async (id: string) => {
    try {
      const response = await axios.delete(
        `${url}/api/admin/delete-article/${id}`
      );
      refetch();
      if (response?.data?.meta?.status === true) {
        setEditModalOpen(false);
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("Axios error:", error.response?.data);
      } else {
        console.error("Error during Deletion", error);
      }
    }
  };

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
    <>
      <div className="mt-14 mb-2 max-w-7xl container ">
        <BreadCrumb
          title1="Articles"
          link1="resource-library"
          title2="Articles Management"
        />
      </div>
      <section className="border-t-2 border-brandLsPrimary mb-4 ">
        <div className="max-w-7xl container flex flex-col">
          {/* title */}
          <div className="mt-7 mb-2 flex flex-col ">
            <h1 className="text-3xl text-brandDs font-normal">
              {t("articles")}
            </h1>
            <p className="w-full h-[2px] bg-brandLsPrimary my-6"></p>
          </div>

          {isLoading ? (
            <div className="px-1 grid grid-cols-4 py-6">
              {Array.from({ length: 8 }).map((_, index) => (
                <div key={index} className="mx-auto">
                  <CareerLoader />
                </div>
              ))}
            </div>
          ) : (
            <>
              {Array.isArray(data?.data) ? (
                <div>
                  <div className="px-1 grid grid-cols-4 py-6 text-greyPrimary">
                    <p>{t("SLNo")}</p>
                    <p className="break-words"> {t("articles")}</p>
                    <p>{t("Posted On")}</p>
                    <p className="px-3">{t("Action")}</p>
                  </div>
                  {data.data.map((articlePost: any, index: number) => {
                    return (
                      <div
                        key={articlePost?.post_pid}
                        className="px-1 grid grid-cols-4 py-6 border-t-2 border-t-[greyTertiary]"
                      >
                        <p>{index + 1}</p>
                        <p className="break-words">{articlePost?.title}</p>
                        <p>
                          {articlePost?.cre_date
                            .split(" ")[0]
                            .split("-")
                            .reverse()
                            .join("-")}
                        </p>
                        <div className="flex justify-between items-center px-3">
                          <Link
                            href={`/${locale}/resource-library/articles/article-management/${articlePost?.post_pid}`}
                            className="text-link"
                          >
                            {t("View Article")}
                          </Link>
                          <Link
                            href={`/${locale}/resource-library/articles/article-management/edit-article/${articlePost?.post_pid}`}
                            className="text-link"
                          >
                            {t("Edit")}
                          </Link>
                          <button
                            className="text-dangerPrimary"
                            onClick={() => {
                              setEditModalOpen(true);
                              setSelectedItem(articlePost?.post_pid);
                            }}
                          >
                            {t("Delete Article")}
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className=" py-32 flex justify-center items-center text-2xl text-gray-500">
                  {t(`No Data Available`)}
                </div>
              )}
            </>
          )}
          {Array.isArray(data?.data) && (
            <div className="mb-8">
              <EventsPagination
                currentPage={currentPage}
                hasPreviousPage={data?.current_page > 1}
                hasNextPage={data?.current_page < data?.last_page}
                onPreviousPage={handlePreviousPage}
                onNextPage={handleNextPage}
              />
            </div>
          )}
        </div>
        <Dialog open={editModalOpen} onOpenChange={setEditModalOpen}>
          <DialogTrigger asChild></DialogTrigger>
          <DialogContent className="bg-white w-[30vw]">
            <svg
              className="text-gray-400 dark:text-gray-500 w-11 h-11 mb-3.5 mx-auto"
              aria-hidden="true"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                clipRule="evenodd"
              ></path>
            </svg>
            <p className="mb-4 text-center text-gray-500 dark:text-gray-300">
              {t("Are you sure you want to delete this Article?")}
            </p>
            <div className="flex justify-center items-center space-x-4">
              <button
                onClick={() => setEditModalOpen(false)}
                className="py-2 px-3 text-sm font-medium text-gray-500 bg-white rounded-lg border border-gray-200 hover:bg-gray-100  hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
              >
                {t("No, cancel")}
              </button>
              <button
                onClick={() => handleDelete(selectedItem)}
                className="py-2 px-3 text-sm font-medium text-center text-white bg-red-600 rounded-lg hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-red-500 dark:hover:bg-red-600 dark:focus:ring-red-900"
              >
                {t("Yes, I'm sure")}
              </button>
            </div>
          </DialogContent>
        </Dialog>
      </section>
    </>
  );
};
