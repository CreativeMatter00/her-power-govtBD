"use client"
import { documentsManagement, url } from '@/api/api';
import CareerLoader from '@/components/shared/loader/CareerLoader';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useCookies } from 'next-client-cookies';
import { useTranslations } from 'next-intl';
import React, { useState } from 'react'
import DocumentCardManagement from './DocumentCardMangement';
import EventsPagination from '@/components/shared/EventsPagination';
import {
    Dialog,
    DialogContent,
    DialogTrigger,
  } from "@/components/ui/dialog";
const DocumentsManagement = () => {
    const t = useTranslations("resources_Library");

    const [currentPage, setCurrentPage] = useState<number>(1);
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState("");
    const cookies = useCookies();
    const userID=cookies.get("user_pid");
    const { isLoading, data, error, refetch } = useQuery({
      queryKey: ["documentsManagement", currentPage],
      queryFn: () => documentsManagement(currentPage,userID as string),
    });
    const handleDelete = async (id: string) => {
      try {
        const response = await axios.delete(
          `${url}/api/admin/delete-document/${id}/${userID}`
        );
        refetch();
        if (response?.data?.meta?.status === true) {
          // alert("Successfully Deleted");
          setEditModalOpen(false);
        }
      } catch (error) {
        if (axios.isAxiosError(error)) {
          console.error("Axios error:", error.response?.data);
        } else {
          console.error("Error during Deletion", error);
          // alert("Unexpected Error during Deletion");
        }
      }
    };
    const documentDelete = (id: string) => {
      setEditModalOpen(true);
      setSelectedItem(id);
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
      <div className="mt-20 container max-w-7xl">
        <h1 className="text-brandDs text-3xl font-normal">{t("documents")}</h1>
        <div className="border-b border-brandLsPrimary w-full my-6"></div>
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
              <div>
                <div className="grid  lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-x-8 gap-y-8 my-6">
                  {data?.data?.map((items: any, index: number) => (
                    <DocumentCardManagement
                      key={index}
                      cardId={items.post_pid}
                      cardTitle={items.title}
                      cardDate={items.cre_date}
                      documents={items.documents}
                      handleDelete={handleDelete}
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
              </div>
            ) : (
              <div className=" py-32 flex justify-center items-center text-2xl text-gray-500">
                {t(`No Data Available`)}
              </div>
            )}
          </>
        )}
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
              {t("Are you sure you want to delete this Document?")}
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
      </div>
    );
}

export default DocumentsManagement
