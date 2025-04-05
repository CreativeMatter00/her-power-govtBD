"use client";
import { getChallengeById } from "@/api/api";
import CareerLoader from "@/components/shared/loader/CareerLoader";
import BreadCrumb from "@/components/ui/breadcrumb/BreadCrumb";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { useParams } from "next/navigation";

import React from "react";
import { useLocale, useTranslations } from "next-intl";
import Link from "next/link";
const ChallengeDetails = () => {
  const t = useTranslations("Blog");

   const locale = useLocale();
  const params = useParams();
  const { id } = params;
  // console.log(id);
  const {
    isLoading,
    data,
    error,
  } = useQuery({
    queryKey: ["getChallengeById", id],
    queryFn: () => getChallengeById(id as string),
  });
  if (error)
    return (
      <div className="text-center text-xl font-md py-8">
        {t("Somethingwentwrong")}
      </div>
    );
  return (
    <>
      {/* breadcrumb */}
      {/* <div className="mt-20 md:mt-14 mb-2 max-w-[1055px] mx-auto w-full">
        <BreadCrumb title1="Blogs" link1="meet-partners" title2={`${id}`} />
      </div> */}
      {isLoading ? (
        <div className=" container max-w-7xl mt-20">
          <div className="mx-auto">
            <CareerLoader />
          </div>
        </div>
      ) : (
        <section className="border-t-2 border-brandLsPrimary mb-4 px-5 lg:px-0">
        <div className="my-6 max-w-5xl w-full mx-auto flex flex-col gap-6">
          {/* image */}
          <Image
            src={`${data.banner_file_url}`}
            alt="blog details image"
            width={1024}
            height={521}
          />
          {/* heading */}
          <div className="flex justify-between items-center">
          <h1 className="text-5xl leading-[56px] font-bold text-[#1C1C1C] ">
            {data.title}
          </h1>
          <div>
          <Link href={`/${locale}/challenges/challenge/challenge-management/edit-challenge/${id}`} className="py-2 px-4 bg-brandDs text-bgPrimary text-lg rounded-full">{t("Edit")}</Link>
          </div>
          </div>
          {/* border */}
          <p className="w-full h-[2px] bg-brandLsPrimary"></p>
          {/* texts */}
          <div className="py-5" dangerouslySetInnerHTML={{ __html: data.description }}></div>
        </div>
      </section>
      )}
    </>
  );
};

export default ChallengeDetails;
