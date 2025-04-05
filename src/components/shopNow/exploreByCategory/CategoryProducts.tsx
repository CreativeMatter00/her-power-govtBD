import ProductLoader from "@/components/shared/loader/ProductLoader";
import ProductCard from "@/components/shared/ProductCard";
import { useLocale, useTranslations } from "next-intl";
import Link from "next/link";
import { FC } from "react";

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
