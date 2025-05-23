"use client";
import { api, blogsManagement } from "@/api/api";
import EventsPagination from "@/components/shared/EventsPagination";
import CareerLoader from "@/components/shared/loader/CareerLoader";
import BreadCrumb from "@/components/ui/breadcrumb/BreadCrumb";
import {
  Dialog,
  DialogContent,
  DialogTrigger
} from "@/components/ui/dialog";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useCookies } from "next-client-cookies";
import { useLocale, useTranslations } from "next-intl";
import Link from "next/link";
import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export const BlogManagement = () => {
  const t = useTranslations("Blog");
  const cookies = useCookies();
  const userID=cookies.get("user_pid");
  const locale = useLocale();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState("");
  const { isLoading, data, error, refetch } = useQuery({
    queryKey: ["blogsManagement", currentPage],
    queryFn: () => blogsManagement(currentPage,userID as string),
  });

  const handleDelete = async (id: string) => {
    try {
      const response = await api.delete(
        `/api/admin/delete-blog-post/${id}/${userID}`
      );
      refetch();
      if (response?.data?.meta?.status === true) {
        setEditModalOpen(false);
        toast.success("Successfully Deleted!", {
          position: "bottom-left",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    } catch (error) {
      toast.error("Something went wrong! please try again", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
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
        {t("Somethingwentwrong")}
      </div>
    );
  return (
    <>
      <ToastContainer />
      <div className="mt-14 mb-2 max-w-7xl container ">
        <BreadCrumb
          title1="Blogs"
          link1="meet-partners"
          title2="Blog Management"
        />
      </div>
      <section className="border-t-2 border-brandLsPrimary mb-4 ">
        <div className="max-w-7xl container flex flex-col">
          {/* title */}
          <div className="mt-7 mb-2 flex flex-col ">
            <h1 className="text-3xl text-brandDs font-normal">{t("Blogs")}</h1>
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
                    <p>{t("SlNo")}</p>
                    <p className="break-words">{t("Blogs")}</p>
                    <p>{t("PostedOn")}</p>
                    <p className="px-3">{t("Action")}</p>
                  </div>
                  {data &&
                    data?.data?.map((blogPost: any, index: number) => (
                      <div
                        key={blogPost?.bpost_pid}
                        className="px-1 grid grid-cols-4 py-6 border-t-2 border-t-[greyTertiary]"
                      >
                        <p>{index + 1}</p>
                        <p className="break-words">{blogPost?.title}</p>
                        <p>
                          {blogPost?.cre_date
                            .split(" ")[0]
                            .split("-")
                            .reverse()
                            .join("-")}
                        </p>
                        <div className="flex justify-between items-center">
                          <Link
                            href={`/${locale}/meet-partners/blogs/blog-management/${blogPost?.bpost_pid}`}
                            className="text-link"
                          >
                            {t("ViewBlog")}
                          </Link>
                          <Link
                            href={`/${locale}/meet-partners/blogs/blog-management/edit-blog/${blogPost?.bpost_pid}`}
                            className="text-link"
                          >
                            {t("Edit")}
                          </Link>
                          <button
                            className="text-dangerPrimary"
                            onClick={() => {
                              setEditModalOpen(true);
                              setSelectedItem(blogPost?.bpost_pid);
                            }}
                          >
                            {t("DeleteBlog")}
                          </button>
                        </div>
                      </div>
                    ))}
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
                fill-rule="evenodd"
                d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                clip-rule="evenodd"
              ></path>
            </svg>
            <p className="mb-4 text-center text-gray-500 dark:text-gray-300">
              {t("AreyousureyouwanttodeletethisBlog?")}
            </p>
            <div className="flex justify-center items-center space-x-4">
              <button
                onClick={() => setEditModalOpen(false)}
                className="py-2 px-3 text-sm font-medium text-gray-500 bg-white rounded-lg border border-gray-200 hover:bg-gray-100  hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
              >
                {t("NoCancel")}
              </button>
              <button
                onClick={() => handleDelete(selectedItem)}
                className="py-2 px-3 text-sm font-medium text-center text-white bg-red-600 rounded-lg hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-red-500 dark:hover:bg-red-600 dark:focus:ring-red-900"
              >
                {t("yesISure")}
              </button>
            </div>
          </DialogContent>
        </Dialog>
      </section>
    </>
  );
};
