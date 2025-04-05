"use client";
import { getSellerSearchProduct } from "@/api/api";
import { useQuery } from "@tanstack/react-query";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useState } from "react";
import SearchResults from "../../searchedProducts/SearchResults";
import ProfileHero from "./ProfileHero";
import { IoIosSearch } from "react-icons/io";
import { useLocale } from "next-intl";
import { useForm } from "react-hook-form";
import ScaleLoader from "react-spinners/ScaleLoader";

interface SearchForm {
  search: string;
}

const SearchedProducts = () => {
  const searchParams = useSearchParams();
  const queryParams = searchParams.toString();
  const productName = searchParams.get("productName");
  const entrepreneurId = searchParams.get("entrepreneurId");
  const [active, setActive] = useState("homepage");
  const { register, handleSubmit, reset } = useForm<SearchForm>();
  const router = useRouter();
  const local = useLocale();

  const onSubmit = (data: SearchForm) => {
    router.push(
      `/${local}/shop-now/seller-profile/searched-products?productName=${data.search}&entrepreneurId=${entrepreneurId}`
    );
    reset();
  };

  const {
    isLoading,
    isError,
    data: searchData,
  } = useQuery({
    queryKey: ["searchData", queryParams],
    queryFn: () => getSellerSearchProduct(queryParams),
  });
  // console.log("search data", searchData);

  if (isLoading)
    return (
      <div className="w-screen h-screen flex justify-center items-center">
        <ScaleLoader color="#421957" height={70} radius={8} width={10} />
      </div>
    );
  return (
    <>
      <ProfileHero sellerId={String(entrepreneurId)} />
      <div className="bg-bgSecondary py-2">
        <div className="container mx-auto w-full flex justify-between">
          <div className="flex items-center gap-4">
            <div
              className={`font-bold hover:cursor-pointer ${
                active === "homepage" ? "text-brandDs" : "text-greyPrimary"
              }`}
              onClick={() => setActive("homepage")}
            >
              Homepage
            </div>
            <div
              className={`font-bold hover:cursor-pointer ${
                active === "allProducts" ? "text-brandDs" : "text-greyPrimary"
              }`}
              onClick={() => setActive("allProducts")}
            >
              All Products
            </div>
            <div
              className={`font-bold hover:cursor-pointer ${
                active === "profile" ? "text-brandDs" : "text-greyPrimary"
              }`}
              onClick={() => setActive("profile")}
            >
              Profile
            </div>
          </div>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex items-center border border-brandDs rounded-full basis-1/4 p-0.5 w-full"
          >
            <div className="basis-full">
              <input
                type="text"
                {...register("search")}
                defaultValue={productName || null || undefined}
                placeholder="Search..."
                className="py-1.5 px-4 outline-none bg-transparent"
              />
            </div>
            <button className="flex justify-center items-center w-10 h-10 bg-brandDs rounded-full">
              <IoIosSearch className="text-bgSecondary w-5 h-5 font-bold" />
            </button>
          </form>
        </div>
      </div>

      <div className="container mx-auto">
        <div className="w-full ">
          <SearchResults
            products={searchData?.data}
            productName={productName}
            columns={4}
          />
        </div>
      </div>
    </>
  );
};

export default SearchedProducts;
