"use client";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";

import ProductCard from "@/components/shared/ProductCard";
import FilterTypes from "./FilterTypes";
import ScaleLoader from "react-spinners/ScaleLoader";
import { getAllSellerProducts } from "@/api/api";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";



const SearchResults = () => {
	const params = useParams();
	// console.log(params.id);

	// ? Page Number State

	const [page, setPage] = useState(1);

	const { isLoading, error, data } = useQuery({
		queryKey: ["getAllSellerProducts"],
		queryFn: () => getAllSellerProducts(params.id as string, page),
	});

	// console.log(data?.data.data);
	const allProducts = data?.data.data;
	if (isLoading)
		return (
			<div className="w-screen h-screen flex justify-center items-center">
				<ScaleLoader color="#421957" height={70} radius={8} width={10} />
			</div>
		);

	if (error)
		return (
			<div className="text-center text-xl font-md py-8">
				Something went wrong. Please reload
			</div>
		);

	return (
		<div className="relative">
			<div className="flex justify-between py-6 border-b border-brandLsPrimary">
				<p className="text-brandPrimary">
					<span className="text-grey"> Search: </span> household items
				</p>
				<p> 56 items found </p>
			</div>

			<div className="py-6">
				<div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
					{allProducts.map((product: any, index: number) => {
						const avgRating = Number(product.avg_rating);
						return (
							<div key={index} className="w-full mb-4 mx-auto">
								<ProductCard
									// id={index}
									id={product.product_pid}
									variantId={product.varient_pid}
									name={product.product_name}
									image={product.thumbnail_img}
									price={product.mrp_primary}
									oldPrice={product.mrp}
									rating={avgRating}
									// sale={product.disc_pct}
									sale={product.is_sale}
								/>
							</div>
						);
					})}
				</div>
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
					Filter
				</DialogTrigger>

				<DialogContent className="bg-white">
					<DialogHeader>
						<DialogTitle className="font-bold text-xl text-brandPrimary pb-4 border-b border-brandLsPrimary">
							Filters
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
