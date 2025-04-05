"use client";
import { getAllEventCategories } from "@/api/api";
import { useQuery } from "@tanstack/react-query";
import { useLocale } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import React from "react";
import ScaleLoader from "react-spinners/ScaleLoader";

const CategorySidebar = () => {
  const locale = useLocale();
  const params = useParams();
  const id = params.id as string;
  const {
    isLoading,
    error,
    data: allEventCategories,
    refetch,
  } = useQuery({
    queryKey: ["allEventCategories"],
    queryFn: () => getAllEventCategories(),
  });
  if (isLoading)
    return (
      <div className="w-screen h-screen flex justify-center items-center">
        <ScaleLoader color="#421957" height={70} radius={8} width={10} />
      </div>
    );
  return (
    <div className="border border-brandLsPrimary rounded-md w-full mt-4">
      {allEventCategories && (
        <div className="flex flex-col gap-1">
          <Link href={`/${locale}/events/events-category/all`}>
            <div
              className={`flex items-center gap-4 cursor-pointer hover:bg-bgSecondary p-4 ${
                id === "all" ? "bg-bgSecondary" : ""
              }`}
            >
              <Image
                src={"/assets/images/category/networking-events.png"}
                alt=""
                width={30}
                height={30}
              />
              <p className="text-brandPrimary">All</p>
            </div>
          </Link>
          {allEventCategories?.map((category: any, index: number) => {
            return (
              <Link
                href={`/${locale}/events/events-category/${category?.category_pid}`}
                key={index}
              >
                <div
                  className={`flex items-center gap-4 cursor-pointer hover:bg-bgSecondary p-4 ${
                    id === category?.category_pid ? "bg-bgSecondary" : ""
                  }`}
                >
                  <Image
                    src={
                      category?.category_file_url ??
                      "/assets/images/category/networking-events.png"
                    }
                    alt=""
                    width={30}
                    height={30}
                  />
                  <p className="text-brandPrimary">{category?.category_name}</p>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default CategorySidebar;
