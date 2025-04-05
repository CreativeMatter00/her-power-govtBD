"use client";

import { useQuery } from "@tanstack/react-query";
import ProductCard from "../../shared/ProductCard";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useLocale, useTranslations } from "next-intl";
import Link from "next/link";
import { FaArrowRightLong } from "react-icons/fa6";
import { getNewProductsHome } from "@/api/api";
import ProductLoader from "@/components/shared/loader/ProductLoader";

const NewProducts = () => {
  const locale = useLocale();
  const t = useTranslations("ShopNowHome");

  // ? API Call

  const { isLoading, error, data } = useQuery({
    queryKey: ["getNewProductsHome"],
    queryFn: getNewProductsHome,
  });
  // console.log("data", data);

  if (error)
    return (
      <div className="text-center text-xl font-md py-8">
        Something went wrong. Please reload
      </div>
    );

  return (
    <div className="container mx-auto my-8 py-10">
      <div className="flex items-center justify-between mb-6">
        <p className="font-bold text-xl text-brandDs"> {t("newProducts")} </p>
        <Link href={`/${locale}/shop-now/new-products`}>
          <button className="flex items-center gap-2 text-base text-[#09020C]">
            {t("seeAll")} <FaArrowRightLong />
          </button>
        </Link>
      </div>

      {/* ------- PRODUCTS --------- */}

      {isLoading ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <div key={index} className="mx-auto">
              <ProductLoader />
            </div>
          ))}
        </div>
      ) : (
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
        >
          <CarouselContent>
            {data?.data?.map((product: any, index: number) => (
              <CarouselItem
                className="basis-1/2 md:basis-1/3 lg:basis-1/4"
                key={index}
              >
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
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="left-1 top-[30%] bg-brandDs text-white border-none" />
          <CarouselNext className="right-1 top-[30%] bg-brandDs text-white border-none" />
        </Carousel>
      )}
    </div>
  );
};

export default NewProducts;
