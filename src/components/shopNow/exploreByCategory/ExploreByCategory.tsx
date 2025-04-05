"use client";

import Image from "next/image";
import CategoryProducts from "./CategoryProducts";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import {
  getAllProductsDetail,
  getProductByCategory,
  getProductCategories,
} from "@/api/api";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "@/components/ui/skeleton";
import { useParams } from "next/navigation";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const categoryList = [
  // {
  // 	src: "/assets/images/shop-now/category/all.png",
  // 	title: "All",
  // },
  {
    src: "/assets/images/shop-now/category/food.png",
    title: "Food",
  },
  {
    src: "/assets/images/shop-now/category/grocery.png",
    title: "Groceries",
  },
  {
    src: "/assets/images/shop-now/category/electronics.png",
    title: "Electronics",
  },
  {
    src: "/assets/images/shop-now/category/book.png",
    title: "Books",
  },
  {
    src: "/assets/images/shop-now/category/handicrafts.png",
    title: "Handicraft",
  },
  {
    src: "/assets/images/shop-now/category/fashion.png",
    title: "Life Style",
  },
  {
    src: "/assets/images/shop-now/category/brush.png",
    title: "Art & Paints",
  },
];

const ExploreByCategory = () => {
  const t = useTranslations("talentHunt");

  // ? Params and translations
  const locale = useLocale();

  const params = useParams();
  const id = params.id as string;

  // ? Page Number State
  const [page, setPage] = useState(1);

  // ? API Call

  // * Get All Categories

  const { isLoading, error, data } = useQuery({
    queryKey: ["getProductCategories"],
    queryFn: getProductCategories,
  });

  // * Get Products by Category

  const {
    isLoading: productLoading,
    error: productError,
    data: productData,
  } = useQuery({
    queryKey: ["getProductByCategory", params.id, page],
    queryFn: ({ queryKey }) => {
      const page = queryKey[2] as string | number; // Explicitly cast to string | number
      return id === "all"
        ? getAllProductsDetail(page)
        : getProductByCategory(id, page);
    },
  });

  if (error || productError)
    return (
      <div className="text-center text-xl font-md py-8">
        {t("Something_went_wrong")}
      </div>
    );

  return (
    <div>
      <div className="py-6 container mx-auto">
        <div
          className="py-10 flex gap-6"
          // style={{ gridTemplateColumns: "1fr 3fr" }}
        >
          {/* ------------- Desktop View for product category -------------  */}

          <div className="md:w-1/4 hidden md:block">
            {isLoading ? (
              <Skeleton className="w-full h-96 bg-gray-300" />
            ) : (
              <div className="w-full border border-brandLsPrimary py-2">
                <ul className="text-brandPrimary">
                  <Link href={`/${locale}/shop-now/explore-by-category/all`}>
                    <li
                      className={`flex items-center gap-4 px-4 py-2 cursor-pointer mb-2 hover:bg-bgSecondary ${
                        id === "all" ? "bg-bgSecondary" : ""
                      }`}
                    >
                      <Image
                        src="/assets/images/shop-now/category/all.png"
                        height={30}
                        width={30}
                        alt="category"
                      />
                      <p> All </p>
                    </li>
                  </Link>
                  {data?.data?.map((category: any, index: number) => {
                    return (
                      <Link
                        href={`/${locale}/shop-now/explore-by-category/${category.category_pid}`}
                        key={index}
                      >
                        <li
                          className={`flex items-center gap-4 px-4 py-2 cursor-pointer mb-2 hover:bg-bgSecondary ${
                            id === category.category_pid ? "bg-bgSecondary" : ""
                          }`}
                          key={index}
                        >
                          {category.file_url && (
                            <Image
                              src={category.file_url}
                              height={30}
                              width={30}
                              alt="category"
                            />
                          )}
                          <p> {category.category_name} </p>
                        </li>
                      </Link>
                    );
                  })}
                </ul>
              </div>
            )}
          </div>

          <div className="w-full md:w-3/4">
            {/* ------------- Mobile View for product category -------------  */}
            <div className="flex items-center gap-4 mb-10 md:hidden">
              <p className="text-xs font-bold text-brandDs">
                {" "}
                {t("Products_Category")}{" "}
              </p>
              <div>
                <Select>
                  <SelectTrigger className="min-w-[220px]">
                    <SelectValue placeholder="Select Category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categoryList.map((category, index) => {
                      return (
                        <SelectItem key={index} value={category.title}>
                          {category.title}
                        </SelectItem>
                      );
                    })}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <CategoryProducts
              productLoading={productLoading}
              productData={productData}
            />
          </div>
        </div>
        <div className="flex justify-center mt-8 space-x-4">
          <button
            onClick={() => setPage((old) => Math.max(old - 1, 1))}
            disabled={!data?.data?.prev_page_url}
            className={`px-4 py-2 border rounded ${
              !data?.data?.prev_page_url ? "cursor-not-allowed opacity-50" : ""
            }`}
          >
            {t("Previous")}
          </button>
          <button
            onClick={() =>
              setPage((old) => (data?.data?.next_page_url ? old + 1 : old))
            }
            disabled={!data?.data?.next_page_url}
            className={`px-4 py-2 border rounded ${
              !data?.data?.next_page_url ? "cursor-not-allowed opacity-50" : ""
            }`}
          >
            {t("Next")}
          </button>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default ExploreByCategory;
