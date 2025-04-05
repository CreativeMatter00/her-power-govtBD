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

// const products = [
// 	{
// 		name: "Pink Flower vase",
// 		image: "/assets/images/shop-now/product/1.jpg",
// 		price: "1600",
// 		oldPrice: "1800",
// 		rating: 4,
// 		sale: true,
// 	},
// 	{
// 		name: "Matte Peacock Canvas Hanging Painting",
// 		image: "/assets/images/shop-now/product/2.jpg",
// 		price: "1600",
// 		oldPrice: "2000",
// 		rating: 5,
// 		sale: false,
// 	},
// 	{
// 		name: "Basketweave Chocolate Cake",
// 		image: "/assets/images/shop-now/product/3.jpg",
// 		price: "1500",
// 		oldPrice: "1700",
// 		rating: 3,
// 		sale: true,
// 	},
// 	{
// 		name: "DIY Rattan Style Lamp",
// 		image: "/assets/images/shop-now/product/4.jpg",
// 		price: "700",
// 		oldPrice: "900",
// 		rating: 4,
// 		sale: false,
// 	},
// 	{
// 		name: "Chinese Neolithic Pottery",
// 		image: "/assets/images/shop-now/product/5.jpg",
// 		price: "800",
// 		oldPrice: "1000",
// 		rating: 1,
// 		sale: true,
// 	},
// 	{
// 		name: "Chocolate Cake",
// 		image: "/assets/images/shop-now/product/6.jpg",
// 		price: "1000",
// 		oldPrice: "1200",
// 		rating: 3,
// 		sale: false,
// 	},
// 	{
// 		name: "Wooden Wall Clock",
// 		image: "/assets/images/shop-now/product/7.jpg",
// 		price: "1100",
// 		oldPrice: "1400",
// 		rating: 3,
// 		sale: true,
// 	},
// 	{
// 		name: "Marbel Vase",
// 		image: "/assets/images/shop-now/product/8.jpg",
// 		price: "500",
// 		oldPrice: "700",
// 		rating: 3,
// 		sale: false,
// 	},
// ];

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

				<div className="flex items-center flex-col md:flex-row gap-2 md:gap-8 py-8">
					<input
						type="text"
						placeholder={t("searchForProducts")}
						className="my-6 py-2 px-4 text-xl flex-grow rounded-full w-full bg-white border border-brandPrimary"
					/>
					<Link href={`/${locale}/shop-now/searched-products`}>
						<button className="w-48 bg-brandPrimary text-white py-2 rounded-full font-medium text-lg hover:bg-brandHover">
							{t("search")}
						</button>
					</Link>
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
