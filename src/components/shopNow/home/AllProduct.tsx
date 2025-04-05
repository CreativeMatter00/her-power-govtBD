"use client";

import { useQuery } from "@tanstack/react-query";
import ProductCard from "../../shared/ProductCard";
import { getAllProductsHome } from "@/api/api";
import ProductLoader from "@/components/shared/loader/ProductLoader";
import { useTranslations } from "next-intl";
import { useCookies } from "next-client-cookies";

const AllProduct = () => {
  const t = useTranslations("talentHunt");
  const cookies = useCookies();
  const { isLoading, error, data } = useQuery({
    queryKey: ["getAllProductsHome"],
    queryFn: getAllProductsHome,
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
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {data?.data.map((product: any, index: number) => (
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
      )}
    </div>
  );
};

export default AllProduct;
