"use client";

import { getProductCategories } from "@/api/api";
import ProductLoader from "@/components/shared/loader/ProductLoader";
import { useQuery } from "@tanstack/react-query";
import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaArrowRightLong } from "react-icons/fa6";

const Category = () => {
	const locale = useLocale();
	const t = useTranslations("ShopNowHome");

	// ? API Call

	const { isLoading, error, data } = useQuery({
		queryKey: ["getProductCategories"],
		queryFn: getProductCategories,
	});

	if (error)
		return (
			<div className="text-center text-xl font-md py-8">
				Something went wrong. Please reload
			</div>
		);

	return (
		<div className="border-y-2 border-brandLsPrimary">
			<div className="container mx-auto my-8 py-10">
				<div className="flex items-center justify-between mb-20">
					<p className="font-bold text-xl text-brandDs">
						{t("exploreByCategory")}
					</p>
					<Link href={`/${locale}/shop-now/explore-by-category/all`}>
						<button className="flex items-center gap-2 text-base text-[#09020C]">
							{t("seeAll")} <FaArrowRightLong />
						</button>
					</Link>
				</div>

				{isLoading ? (
					<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
						{Array.from({ length: 4 }).map((_, index) => (
							<div key={index} className="mx-auto">
								<ProductLoader />
							</div>
						))}
					</div>
				) : (
					<div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
						{data?.data?.slice(0, 8).map((category: any, index: number) => {
							return (
								<Link
									href={`/${locale}/shop-now/explore-by-category/${category.category_pid}`}
									className="mx-auto"
									key={index}
								>
									<div className="p-8 border border-brandPrimary rounded-full h-[166px] w-[166px]">
										{category.file_url && (
											<Image
												src={category.file_url}
												height={200}
												width={200}
												alt="Product Category"
											/>
										)}
									</div>
									<p className="text-2xl text-brandDs text-center py-4">
										{category.category_name}
									</p>
								</Link>
							);
						})}
					</div>
				)}
			</div>
		</div>
	);
};

export default Category;
