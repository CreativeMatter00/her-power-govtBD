import ProductLoader from "@/components/shared/loader/ProductLoader";
import ProductCard from "@/components/shared/ProductCard";
import { useLocale, useTranslations } from "next-intl";
import Link from "next/link";
import { FC } from "react";
import SearchBar from "../home/SearchBar";

type ICategoryProductProps = {
	productLoading: boolean;
	productData: any;
};

const CategoryProducts: FC<ICategoryProductProps> = ({
	productLoading,
	productData,
}) => {
	const t = useTranslations("ShopNowHome");
	const locale = useLocale();

	// console.log("productData", productData);

	return (
		<div className="w-full">
			{/* <p className="pb-4 text-3xl border-b border-brandLsPrimary text-brandPrimary">
				All Products
			</p> */}

			{/* ---------------- SEARCH FIELD ----------------   */}
				<div className="w-full">
					<SearchBar/>
				</div>


			{productLoading ? (
				<div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
					{Array.from({ length: 3 }).map((_, index) => (
						<div key={index} className="mx-auto">
							<ProductLoader />
						</div>
					))}
				</div>
			) : (
				<div className="pt-6">
					<div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
						{productData?.data?.data?.length > 0 ? (
							productData?.data?.data?.map((product: any, index: number) => (
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
							))
						) : (
							<div className="py-8 text-lg text-center">
								No product found for this category
							</div>
						)}
					</div>
				</div>
			)}
		</div>
	);
};

export default CategoryProducts;
