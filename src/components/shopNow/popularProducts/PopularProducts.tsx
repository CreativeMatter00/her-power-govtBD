"use client";

import { getPopularProductsAll } from "@/api/api";
import ProductLoader from "@/components/shared/loader/ProductLoader";
import ProductCard from "@/components/shared/ProductCard";
import BreadCrumb from "@/components/ui/breadcrumb/BreadCrumb";
import { useQuery } from "@tanstack/react-query";
import { useLocale, useTranslations } from "next-intl";
import Link from "next/link";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Search from "@/components/shopNow/home/Search";
import SearchBar from "../home/SearchBar";

const PopularProducts = () => {
	const t = useTranslations("ShopNowHome");
	const locale = useLocale();

	const { isLoading, error, data } = useQuery({
		queryKey: ["getPopularProductsAll"],
		queryFn: getPopularProductsAll,
	});

	if (error)
		return (
			<div className="text-center text-xl font-md py-8">
				Something went wrong. Please reload
			</div>
		);

	// console.log(data);

	return (
		<div>
			<div className="h-24 border-b border-brandLsPrimary flex justify-center">
				<BreadCrumb
					title1={t("shopNow")}
					link1="shop-now"
					title2={t("popularProducts")}
				/>
			</div>

			<div className="container mx-auto">
				<p className="text-3xl text-brandPrimary pt-6">
					{" "}
					{t("popularProducts")}{" "}
				</p>

				{/* ---------------- SEARCH FIELD ----------------   */}

				<div className="w-full">
					<SearchBar/>
				</div>

				{/* ---------------- PRODUCTS ----------------   */}

				<div className="py-10">
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
							{data?.data?.data?.map((product: any, index: number) => (
								<div key={index} className="w-full mb-4 mx-auto">
									<ProductCard
										id={product.product_pid}
										variantId={product.varient_pid}
										name={product.product_name}
										image={product.thumbnail_img}
										price={product.mrp_primary}
										oldPrice={product.mrp}
										rating={product.avg_rating}
										sale={product.is_sale}
									/>
								</div>
							))}
						</div>
					)}
				</div>
			</div>
			<ToastContainer />
		</div>
	);
};

export default PopularProducts;
