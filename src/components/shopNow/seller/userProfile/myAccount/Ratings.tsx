/* eslint-disable react/no-unescaped-entities */
import Image from "next/image";
import React from "react";
import { FaStar } from "react-icons/fa6";
import { SlDislike, SlLike } from "react-icons/sl";

const Ratings = () => {
	return (
		<div className="container mx-auto mb-6">
			<p className="text-xl text-brandPrimary mb-6">
				{" "}
				Seller Positive Ratings{" "}
			</p>
			<div className="">
				<div className="flex">
					<div className="flex items-center py-8 pr-6 gap-8 border-r border-brandLsPrimary">
						<p className="text-5xl text-brandPrimary"> 4.0 </p>
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
								<div className="bg-brandDs w-[70%] h-full"> </div>
							</div>
							<p className="text-brandDs"> 17 </p>
						</div>

						<div className="flex items-center gap-2">
							<p className="text-grey"> 4 </p>
							<p className="text-grey">
								<FaStar />
							</p>
							<div className="bg-greySecondary w-48 h-2">
								<div className="bg-brandDs w-[20%] h-full"> </div>
							</div>
							<p className="text-brandDs"> 2 </p>
						</div>

						<div className="flex items-center gap-2">
							<p className="text-grey"> 3 </p>
							<p className="text-grey">
								<FaStar />
							</p>
							<div className="bg-greySecondary w-48 h-2">
								<div className="bg-brandDs opacity-60 w-[30%] h-full"> </div>
							</div>
							<p className="text-brandDs"> 1 </p>
						</div>

						<div className="flex items-center gap-2">
							<p className="text-grey"> 2 </p>
							<p className="text-grey">
								<FaStar />
							</p>
							<div className="bg-greySecondary w-48 h-2">
								<div className="bg-warning w-[20%] h-full"> </div>
							</div>
							<p className="text-brandDs"> 2 </p>
						</div>

						<div className="flex items-center gap-2">
							<p className="text-grey"> 1 </p>
							<p className="text-grey">
								<FaStar />
							</p>
							<div className="bg-greySecondary w-48 h-2">
								<div className="bg-dangerPrimary w-[10%] h-full"> </div>
							</div>
							<p className="text-brandDs"> 1 </p>
						</div>
					</div>
				</div>
			</div>
			<p className="text-greyPrimary mt-6"> Based on 107 customer reviews </p>.
			<div className="py-6">
				<div>
					<p className="text-xl mb-6"> Product Ratings & Reviews (1296) </p>

					<div className="pb-4 mb-4 border-b-2 border-brandLsSecondary">
						<div
							className="grid gap-4"
							style={{ gridTemplateColumns: "1fr 9fr" }}
						>
							<div className="flex items-center justify-center max-h-[150px]">
								<Image
									src="/assets/images/shop-now/product/2.jpg"
									height="300"
									width="300"
									alt="Product"
									className="rounded-lg"
								/>
							</div>

							<div className="flex flex-col justify-between h-full">
								<div className="flex gap-4 mb-6">
									<div className="h-8 px-2 bg-success text-white flex items-center justify-center gap-2 rounded-md">
										<p> 5 </p>
										<FaStar />
									</div>

									<p className="text-brandPrimary">
										I absolutely love the flower vase I bought from "Her Power"!
										It's beautifully crafted and looks stunning on my dining
										table. Plus, knowing that it's handmade by a talented woman
										entrepreneur makes it even more special.
									</p>
								</div>

								<div className="flex justify-between text-greyPrimary">
									<p className="text-sm"> Abdur Rahim | 3 Oct, 2023 </p>

									<div className="flex items-center gap-6">
										<div className="flex items-center gap-2 ">
											<SlLike /> 6
										</div>
										<div className="flex items-center gap-2 ">
											<SlDislike /> 6
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>

					<div className="pb-4 mb-4 border-b-2 border-brandLsSecondary">
						<div
							className="grid gap-4"
							style={{ gridTemplateColumns: "1fr 9fr" }}
						>
							<div className="flex items-center justify-center max-h-[150px]">
								<Image
									src="/assets/images/shop-now/product/3.jpg"
									height="300"
									width="300"
									alt="Product"
									className="rounded-lg"
								/>
							</div>

							<div className="flex flex-col justify-between h-full">
								<div className="flex gap-4 mb-6">
									<div className="h-8 px-2 bg-success text-white flex items-center justify-center gap-2 rounded-md">
										<p> 5 </p>
										<FaStar />
									</div>

									<p className="text-brandPrimary">
										I absolutely love the flower vase I bought from "Her Power"!
										It's beautifully crafted and looks stunning on my dining
										table. Plus, knowing that it's handmade by a talented woman
										entrepreneur makes it even more special.
									</p>
								</div>

								<div className="flex justify-between text-greyPrimary">
									<p className="text-sm"> Abdur Rahim | 3 Oct, 2023 </p>

									<div className="flex items-center gap-6">
										<div className="flex items-center gap-2 ">
											<SlLike /> 6
										</div>
										<div className="flex items-center gap-2 ">
											<SlDislike /> 6
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>

					<div className="pb-4 mb-4 border-b-2 border-brandLsSecondary">
						<div
							className="grid gap-4"
							style={{ gridTemplateColumns: "1fr 9fr" }}
						>
							<div className="flex items-center justify-center max-h-[150px]">
								<Image
									src="/assets/images/shop-now/product/1.jpg"
									height="300"
									width="300"
									alt="Product"
									className="rounded-lg"
								/>
							</div>

							<div className="flex flex-col justify-between h-full">
								<div className="flex gap-4 mb-6">
									<div className="h-8 px-2 bg-success text-white flex items-center justify-center gap-2 rounded-md">
										<p> 5 </p>
										<FaStar />
									</div>

									<p className="text-brandPrimary">
										I absolutely love the flower vase I bought from "Her Power"!
										It's beautifully crafted and looks stunning on my dining
										table. Plus, knowing that it's handmade by a talented woman
										entrepreneur makes it even more special.
									</p>
								</div>

								<div className="flex justify-between text-greyPrimary">
									<p className="text-sm"> Abdur Rahim | 3 Oct, 2023 </p>

									<div className="flex items-center gap-6">
										<div className="flex items-center gap-2 ">
											<SlLike /> 6
										</div>
										<div className="flex items-center gap-2 ">
											<SlDislike /> 6
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Ratings;
