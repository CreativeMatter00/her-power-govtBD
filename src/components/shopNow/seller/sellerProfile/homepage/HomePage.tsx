"use client";

import { getLatestSellerProducts } from "@/api/api";
import ProductCard from "@/components/shared/ProductCard";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import ScaleLoader from "react-spinners/ScaleLoader";

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

// console.log(products);

const HomePage = () => {
	const params = useParams();

	const { isLoading, error, data } = useQuery({
		queryKey: ["getLatestSellerProducts"],
		queryFn: () => getLatestSellerProducts(params.id as string),
	});

	// console.log(data?.data);

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
			<div>
				{data?.data.length === 0 ? (
					<div className="text-center text-xl font-md py-8">
						This seller has not uploaded any product yet
					</div>
				) : (
					<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
						{data?.data.map((product: any, index: number) => (
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
				)}
			</div>
		</div>
	);
};

export default HomePage;
