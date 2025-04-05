"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import FilterTypes from "./FilterTypes";
import ProductCard from "@/components/shared/ProductCard";
import { useParams } from "next/navigation";
import React from "react";
import { useTranslations } from "next-intl";

interface IProduct {
  product_pid: string;
  product_name: string;
  is_sale: boolean;
  category_pid: string;
  total_sale: number;
  avg_rating: string;
  thumbnail_img: string;
  varient_pid: string;
  mrp_primary: number;
  disc_pct: number;
  mrp: number;
}

interface IData {
  products: IProduct[];
  productName: string | undefined | null;
  columns?: number;
}

const SearchResults: React.FC<IData> = ({ products, productName, columns }) => {
  const t = useTranslations("talentHunt");

  const params = useParams();
  // console.log(params);
  // console.log("searchData2", products);
  return (
    <div className="relative">
      <div className="flex justify-between py-6 border-b border-brandLsPrimary">
        <p className="text-brandPrimary">
          <span className="text-grey"> {t("Search")}: </span> {productName}
        </p>
        <p>
          {" "}
          {products?.length} {t("items_found")}{" "}
        </p>
      </div>

      <div className="py-6">
        <div
          className={`grid grid-cols-2 ${
            columns ? "md:grid-cols-3 lg:grid-cols-4" : "lg:grid-cols-3"
          } gap-4`}
        >
          {products?.map((product, index) => {
            const avgRating = Number(product.avg_rating);
            return (
              <div key={index} className="w-full mb-4 mx-auto">
                <ProductCard
                  id={product.product_pid}
                  name={product.product_name}
                  sale={product.is_sale}
                  rating={avgRating}
                  image={product.thumbnail_img}
                  variantId={product.varient_pid}
                  price={product.mrp_primary}
                  oldPrice={product.mrp}
                />
              </div>
            );
          })}
        </div>

        {/* <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
					{products?.map((product, index) => {
						const avgRating = Number(product.avg_rating);
						return (
							<div key={index} className="w-full mb-4 mx-auto">
								<ProductCard
									id={product.product_pid}
									name={product.product_name}
									sale={product.is_sale}
									rating={avgRating}
									image={product.thumbnail_img}
									variantId={product.varient_pid}
									price={product.mrp_primary}
									oldPrice={product.mrp}
								/>
							</div>
						);
					})}
				</div> */}
      </div>

      <Dialog>
        <DialogTrigger
          className="
					fixed
					bottom-8
					right-8
					text-white
					font-bold
					px-8
					py-3
					bg-brandPrimary
					rounded-md block md:hidden"
        >
          {t("Filter")}
        </DialogTrigger>

        <DialogContent className="bg-white">
          <DialogHeader>
            <DialogTitle className="font-bold text-xl text-brandPrimary pb-4 border-b border-brandLsPrimary">
              {t("Filters")}
            </DialogTitle>
            <div className="max-h-[400px] md:max-h-[600px] overflow-y-auto">
              <FilterTypes />
            </div>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SearchResults;
