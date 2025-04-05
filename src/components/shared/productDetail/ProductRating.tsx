import { useTranslations } from "next-intl";
import React from "react";
import { FaStar } from "react-icons/fa";

// =========== FETCHED DATA ===========
interface IData {
	data: Record<string, any>;
}

const ProductRating: React.FC<IData> = ({ data }) => {
	// =============== TRANSLATION ==================
	const t = useTranslations("ProductDetails");

	return (
		<div>
			{/*-----------PRODUCT RATINGS----------- */}
			<div className="mb-10">
				<p className="font-bold text-xl text-brandDs mb-6"> {t("ratings")} </p>

				<div className="flex">
					<div className="flex items-center py-8 pr-6 gap-8 border-r border-brandLsPrimary">
						<p className="text-5xl text-brandPrimary">
							{" "}
							{data?.data?.avg_rating}{" "}
						</p>
						<p className="text-brandDs text-4xl">
							<FaStar />
						</p>
					</div>

					<div className="pl-10">
						<div className="flex items-center gap-2">
							<p className="text-grey"> 5 </p>
							<p className="text-grey">
								<FaStar />
							</p>
							<div className="bg-greySecondary w-48 h-2">
								<div
									className={`bg-brandDs h-full`}
									style={{
										width:
											data?.data?.rating_summary?.total_5_star === 0
												? "0"
												: `${Math.round(
														(data?.data?.rating_summary?.total_5_star /
															data?.data?.total_rating) *
															100
												  )}%`,
									}}
								></div>
							</div>
							<p className="text-brandDs">
								{" "}
								{data?.data?.rating_summary?.total_5_star}{" "}
							</p>
						</div>

						<div className="flex items-center gap-2">
							<p className="text-grey"> 4 </p>
							<p className="text-grey">
								<FaStar />
							</p>
							<div className="bg-greySecondary w-48 h-2">
								<div
									className={`bg-brandDs h-full`}
									style={{
										width:
											data?.data?.rating_summary?.total_4_star === 0
												? "0"
												: `${Math.round(
														(data?.data?.rating_summary?.total_4_star /
															data?.data?.total_rating) *
															100
												  )}%`,
									}}
								></div>
							</div>
							<p className="text-brandDs">
								{" "}
								{data?.data?.rating_summary?.total_4_star}{" "}
							</p>
						</div>

						<div className="flex items-center gap-2">
							<p className="text-grey"> 3 </p>
							<p className="text-grey">
								<FaStar />
							</p>
							<div className="bg-greySecondary w-48 h-2">
								<div
									className={`bg-brandDs opacity-60 h-full`}
									style={{
										width:
											data?.data?.rating_summary?.total_3_star === 0
												? "0"
												: `${Math.round(
														(data?.data?.rating_summary?.total_3_star /
															data?.data?.total_rating) *
															100
												  )}%`,
									}}
								></div>
							</div>
							<p className="text-brandDs">
								{" "}
								{data?.data?.rating_summary?.total_3_star}{" "}
							</p>
						</div>

						<div className="flex items-center gap-2">
							<p className="text-grey"> 2 </p>
							<p className="text-grey">
								<FaStar />
							</p>
							<div className="bg-greySecondary w-48 h-2">
								<div
									className={`bg-warning h-full`}
									style={{
										width:
											data?.data?.rating_summary?.total_2_star === 0
												? "0"
												: `${Math.round(
														(data?.data?.rating_summary?.total_2_star /
															data?.data?.total_rating) *
															100
												  )}%`,
									}}
								></div>
							</div>
							<p className="text-brandDs">
								{" "}
								{data?.data?.rating_summary?.total_2_star}{" "}
							</p>
						</div>

						<div className="flex items-center gap-2">
							<p className="text-grey"> 1 </p>
							<p className="text-grey">
								<FaStar />
							</p>
							<div className="bg-greySecondary w-48 h-2">
								<div
									className={`bg-dangerPrimary h-full`}
									style={{
										width:
											data?.data?.rating_summary?.total_1_star === 0
												? "0"
												: `${Math.round(
														(data?.data?.rating_summary?.total_1_star /
															data?.data?.total_rating) *
															100
												  )}%`,
									}}
								></div>
							</div>
							<p className="text-brandDs">
								{" "}
								{data?.data?.rating_summary?.total_1_star}{" "}
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ProductRating;
