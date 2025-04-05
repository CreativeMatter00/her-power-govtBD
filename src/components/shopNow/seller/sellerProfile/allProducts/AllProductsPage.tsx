"use client";

import { getAllSellerProducts, getLatestSellerProducts } from "@/api/api";
import ProductCard from "@/components/shared/ProductCard";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { useState } from "react";
import ScaleLoader from "react-spinners/ScaleLoader";

const AllProductsPage = () => {
	const params = useParams();

	// ? Page Number State

	const [page, setPage] = useState(1);
	// console.log("🚀 ~ AllProductsPage ~ page:", page);

	const { isLoading, error, data } = useQuery({
		queryKey: ["getAllSellerProducts", params.id, page], // Include page in queryKey
		queryFn: () => getAllSellerProducts(params.id as string, page),
	});

	// console.log(data?.data?.data);

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
		<div className="container mx-auto py-10">
			<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
				{data?.data?.data?.map((product: any, index: number) => (
					<div key={index} className="w-full mb-4 mx-auto">
						<ProductCard
							// id={index}
							id={product.product_pid}
							variantId={product.varient_pid}
							name={product.product_name}
							image={product.thumbnail_img}
							price={product.mrp_primary}
							oldPrice={product.mrp}
							rating={product.avg_rating}
							// sale={product.disc_pct}
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
						!data?.data?.prev_page_url ? "cursor-not-allowed opacity-50" : ""
					}`}
				>
					Previous
				</button>
				<button
					onClick={() =>
						setPage((old) => (data?.data?.next_page_url ? old + 1 : old))
					}
					disabled={!data?.data?.next_page_url}
					className={`px-4 py-2 border rounded ${
						!data?.data?.next_page_url ? "cursor-not-allowed opacity-50" : ""
					}`}
				>
					Next
				</button>
			</div>
		</div>
	);
};

export default AllProductsPage;
