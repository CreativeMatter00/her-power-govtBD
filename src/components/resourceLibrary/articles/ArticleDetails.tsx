"use client";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { useParams } from "next/navigation";
import { getArticleById } from "@/api/api";
import React from "react";
import { SlCalender } from "react-icons/sl";
import CareerLoader from "@/components/shared/loader/CareerLoader";
import { useLocale, useTranslations } from "next-intl";
import Link from "next/link";

const ArticleDetails = () => {
  const t = useTranslations("resources_Library");
  const locale = useLocale();
  const params = useParams();
  const { id } = params;
  // console.log(id);
  const { isLoading, data, error } = useQuery({
    queryKey: ["getArticleById", id],
    queryFn: () => getArticleById(id as string),
  });
  if (error)
    return (
      <div className="text-center text-xl font-md py-8">
        {t("Something went wrong. Please reload")}
      </div>
    );
  return (
    <>
      {isLoading ? (
        <div className=" container max-w-7xl mt-20">
          <div className="mx-auto">
            <CareerLoader />
          </div>
        </div>
      ) : (
        <div className=" container max-w-7xl mt-20">
          <div className="relative rounded-md">
            <Image
              src={data.banner_file_url}
              alt={data.title}
              width={1024}
              height={521}
              className="w-full h-[520px] rounded-md"
            />
          </div>
          <div className="w-full my-6"></div>
          <div className="flex justify-between  gap-2 ">
            <h1 className="text-3xl text-admin_Text2 font-bold ">
              {data.title}
            </h1>
            <div className="flex items-center gap-2 ">
              <div className="flex items-center gap-2">
                <SlCalender className="text-admin_Text2" />
                <p className="text-xl text-brandPrimary font-normal">
                  {data.cre_date.split(" ")[0].split("-").reverse().join("-")}
                </p>
              </div>
              {/* <Link
                href={`/${locale}/resource-library/articles/article-management/edit-article/${id}`}
                className="py-2 px-4 bg-brandDs text-bgPrimary text-lg rounded-full"
              >
                Edit
              </Link> */}
            </div>
          </div>
          <div className="border-b border-brandLsPrimary w-full my-6"></div>
          <div
            className="py-5"
            dangerouslySetInnerHTML={{ __html: data.description }}
          ></div>
        </div>
      )}
    </>
  );
};

export default ArticleDetails;
