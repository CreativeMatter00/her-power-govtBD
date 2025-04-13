"use client";
import Link from "next/link";
import React from "react";
import { IoMdArrowForward } from "react-icons/io";
import { useLocale, useTranslations } from "next-intl";
import ResCard from "../ResCard";
import { useQuery } from "@tanstack/react-query";
import { getHomeArticle } from "@/api/api";
import CareerLoader from "@/components/shared/loader/CareerLoader";

const ArticleHome = () => {
  const t = useTranslations("resources_Library");

  const locale = useLocale();
  const { isLoading, data, error } = useQuery({
    queryKey: ["getHomeArticle"],
    queryFn: () => getHomeArticle(),
  });

  if (error)
    return (
      <div className="text-center text-xl font-md py-8">
        {t("Something went wrong. Please reload")}
      </div>
    );
  return (
    <div className="mt-6">
      <h1 className="text-brandDs text-3xl font-normal">{t("articles")}</h1>
      <div className="border-b border-brandLsPrimary w-full my-6"></div>
      {isLoading ? (
        <div className="grid   md:grid-cols-3 grid-cols-1 gap-x-8 gap-y-8 my-6">
          {Array?.from({ length: 8 })?.map((_, index) => (
            <div key={index} className="mx-auto">
              <CareerLoader />
            </div>
          ))}
        </div>
      ) : (
        <>
          {Array.isArray(data?.data) && data?.data?.length > 0 ? (
            <div className="grid   md:grid-cols-3 grid-cols-1 gap-x-8 gap-y-8 my-6">
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
          ) : (
            <div className=" py-12 flex justify-center items-center text-2xl text-gray-500">
              {t(`No Data Available`)}
            </div>
          )}
        </>
      )}

      {/* ============================= SEE ALL ======================== */}

      {Array.isArray(data?.data) && data?.data?.length > 0 && (
        <div className="flex justify-end mt-6">
          <Link href={`/${locale}/resource-library/articles`}>
            <div className="flex items-center gap-2 text-brandPrimary cursor-pointer group ">
              <p className="text-base hover:underline underline-offset-2">
                {t("See_all")}
              </p>
              <IoMdArrowForward className="w-5 h-5" />
            </div>
          </Link>
        </div>
      )}
    </div>
  );
};

export default ArticleHome;
