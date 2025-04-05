"use client";

import { usePathname, useSearchParams } from "next/navigation";
import FilterTypes from "./FilterTypes";
import SearchResults from "./SearchResults";
import { useQuery } from "@tanstack/react-query";
import { getSearchProduct } from "@/api/api";
import ScaleLoader from "react-spinners/ScaleLoader";

const SearchedProducts = () => {
  const pathName = usePathname();
  const searchParams = useSearchParams();
  const queryParams = searchParams.toString();
  const productName = searchParams.get("productName");

  // Extract the last part of the path
  //   const lastSegment = pathName?.split("/").pop();
  //   const productName = lastSegment?.split("&")[0].split("productName=")[1];
  // console.log(productName);

  // console.log("pathName", pathName);
  // console.log("lastSegment", lastSegment);

  const {
    isLoading,
    isError,
    data: searchData,
  } = useQuery({
    queryKey: ["searchData", queryParams],
    queryFn: () => getSearchProduct(queryParams),
  });

  if (isLoading)
    return (
      <div className="w-screen h-screen flex justify-center items-center">
        <ScaleLoader color="#421957" height={70} radius={8} width={10} />
      </div>
    );

  // console.log("searchData1", searchData);

  return (
    <div className="container mx-auto">
      <div className="py-10 flex gap-6">
        <div className="md:w-1/4 hidden md:block">
          <div className="w-full border border-brandLsPrimary py-2">
            <FilterTypes />
          </div>
        </div>

        <div className="w-full md:w-3/4">
          <SearchResults
            products={searchData?.data}
            productName={productName}
          />
        </div>
      </div>
    </div>
  );
};

export default SearchedProducts;
