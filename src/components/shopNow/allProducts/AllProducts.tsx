"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import ProductCard from "../../shared/ProductCard";
import { getAllProductsDetail } from "@/api/api";
import ProductLoader from "@/components/shared/loader/ProductLoader";
import { useTranslations } from "next-intl";

const AllProduct = () => {
  const t = useTranslations("talentHunt");

  // ? Page Number State
  const [page, setPage] = useState(1);

  // Fetch data once on component mount
  const getCart = localStorage.getItem("cart");
  const storedCartData = JSON.parse(getCart as any);
  // console.log("stored cart data from all products : ", storedCartData);

  // ? API Call

  const { isLoading, error, data } = useQuery({
    queryKey: ["getAllProductsDetail", page],
    queryFn: () => getAllProductsDetail(page),
  });

  if (error)
    return (
      <div className="text-center text-xl font-md py-8">
        {t("Something_went_wrong")}
      </div>
    );

  return (
    <div className="container mx-auto py-10">
      {isLoading ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <div key={index} className="mx-auto">
              <ProductLoader />
            </div>
          ))}
        </div>
      ) : (
        <>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {data?.data?.data?.map((product: any, index: number) => (
              <div key={index} className="w-full mb-4 mx-auto">
                <ProductCard
                  id={product.product_pid}
                  variantId={product.varient_pid}
                  name={product.product_name}
                  image={product.thumbnail_img}
                  price={product.mrp}
                  oldPrice={product.mrp_primary}
                  rating={product.avg_rating}
                  sale={product.is_sale}
                />
              </div>
            ))}
          </div>
          <div className="flex justify-center mt-8 space-x-4">
            <button
              onClick={() => setPage((old) => Math.max(old - 1, 1))}
              disabled={!data?.data?.prev_page_url}
              className={`px-4 py-2 border rounded ${
                !data?.data?.prev_page_url
                  ? "cursor-not-allowed opacity-50"
                  : ""
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
                !data?.data?.next_page_url
                  ? "cursor-not-allowed opacity-50"
                  : ""
              }`}
            >
              {t("Next")}
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default AllProduct;
