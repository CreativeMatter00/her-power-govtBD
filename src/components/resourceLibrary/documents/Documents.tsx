"use client";
import Link from "next/link";
import React, { useState } from "react";
import { IoMdArrowForward } from "react-icons/io";
import { useLocale, useTranslations } from "next-intl";
import { useQuery } from "@tanstack/react-query";
import { getHomeDocuments, url } from "@/api/api";
import DocumentCard from "./DocumentCard";
const Documents = () => {
  const t = useTranslations("resources_Library");
  const locale = useLocale();
  const { isLoading, data, error, refetch } = useQuery({
    queryKey: ["getHomeDocuments"],
    queryFn: () => getHomeDocuments(),
  });
  if (error)
    return (
      <div className="text-center text-xl font-md py-8">
        Something went wrong. Please reload
      </div>
    );
  return (
    <div className="mt-6">
      <h1 className="text-brandDs text-3xl font-normal">{t("documents")}</h1>
      <div className="border-b border-brandLsPrimary w-full my-6"></div>
      {Array.isArray(data?.data) && data?.data?.length > 0 ? (
        <div className="grid  lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-x-8 gap-y-8 my-6">
          {data?.data?.map((items: any, index: number) => (
            <DocumentCard
              key={index}
              cardId={items.post_pid}
              cardTitle={items.title}
              cardDate={items.cre_date}
              documents={items.documents}
            />
          ))}
        </div>
      ) : (
        <div className=" py-12 flex justify-center items-center text-2xl text-gray-500">
          {t(`No Data Available`)}
        </div>
      )}
      {/* =============================   SEE ALL ======================== */}
      <div className="flex justify-end mt-6">
        <Link href={`/${locale}/resource-library/documents`}>
          <div className="flex items-center gap-2 text-brandPrimary cursor-pointer group ">
            <p className="text-base hover:underline underline-offset-2">
              {t("See_all")}
            </p>
            <IoMdArrowForward className="w-5 h-5" />
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Documents;
