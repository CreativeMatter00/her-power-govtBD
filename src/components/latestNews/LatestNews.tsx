"use client";
import { useQuery } from "@tanstack/react-query";
import { useLocale, useTranslations } from "next-intl";
import React, { useState } from "react";
import { getNewsAdminById } from "../../api/api";
import PuffLoader from "react-spinners/PuffLoader";
import Link from "next/link";
import Image from "next/image";

// test test 21

const LatestNews = () => {
  // ? Transtation
  const locale = useLocale();
  const t = useTranslations("Home");

  // ? State for pagination
  const [currentPage, setCurrentPage] = useState(1);

  // ? API Call - Fetch news based on the current page
  const { isLoading, error, data } = useQuery({
    queryKey: ["LatestNews", currentPage],
    queryFn: () => getNewsAdminById(currentPage), // Adjust the API call to include pagination
  });

  // ? Extracting data from the response
  const totalNews = data?.data || []; // Array of news articles
  const totalPages = data?.meta?.total_pages || 1; // Total number of pages
  const metaData = data?.meta;

  // debugging
  // console.log(totalNews);
  // console.log(metaData);

  if (isLoading)
    return (
      <div className="flex items-center justify-center py-8">
        <PuffLoader color="#421957" size={80} />
      </div>
    );

  if (error)
    return (
      <div className="text-center text-xl font-md py-8">
        {t("Somethingwentwrong")}
      </div>
    );

  // Function to change the current page
  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  return (
    <div className="bg-bgSecondary">
      <section className="container mx-auto py-10">
        <h1 className="text-2xl text-[#252525] font-bold">{t("latestNews")}</h1>
        <table className="border-collapse border border-[#252525] mt-8 w-full">
          <thead className="text-xl font-bold">
            <tr>
              <th className="border border-[#252525]">{t("SL")}</th>
              <th className="border border-[#252525]">{t("Title")}</th>
              <th className="border border-[#252525]">{t("PublishDate")}</th>
              <th className="border border-[#252525]">{t("Attachments")}</th>
            </tr>
          </thead>
          <tbody className="text-base font-normal text-center">
            {totalNews.map((news: any, index: number) => (
              <tr key={news.news_id}>
                <td className="border border-[#252525] px-6">
                  {/* Calculate serial number */}
                  {(currentPage - 1) * metaData.per_page[0] + (index + 1)}
                </td>
                <td className="border border-[#252525] py-4 text-start pl-6">
                  {news.news_title}
                </td>
                <td className="border border-[#252525] px-6">
                  {new Date(news.publish_date).toLocaleDateString(locale)}
                </td>
                <td className="border border-[#252525] px-6">
                  {news.attachments?.length > 0 ? (
                    <Link
                      href={news.attachments[0].file_url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Image
                        src="/assets/images/news/pdf.png"
                        height={8}
                        width={8}
                        alt="pdf"
                        className="h-auto w-auto mx-auto"
                      />
                    </Link>
                  ) : (
                    "No attachment"
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination Controls */}
        <div className="my-8 text-lg flex justify-center text-brandDs font-medium">
          {/* Previous Button */}
          <button
            className={`px-4 py-2 mx-2 rounded-md border-2 border-brandDs ${
              currentPage === 1
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-brandDs text-white hover:bg-white hover:text-brandDs"
            }`}
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            {t("Previous")}
          </button>

          {/* Page Number Buttons */}
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index + 1}
              className={`px-3 py-2 mx-1 rounded-md border-2 border-brandDs ${
                currentPage === index + 1
                  ? "bg-brandDs text-white" // Highlight the current page
                  : "bg-white text-brandDs hover:bg-brandDs hover:text-white"
              }`}
              onClick={() => handlePageChange(index + 1)}
            >
              {index + 1}
            </button>
          ))}

          {/* Next Button */}
          <button
            className={`px-4 py-2 mx-2 rounded-md border-2 border-brandDs ${
              currentPage === totalPages
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-brandDs text-white hover:bg-white hover:text-brandDs"
            }`}
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            {t("Next")}
          </button>
        </div>
      </section>
    </div>
  );
};

export default LatestNews;
