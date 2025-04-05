"use client";

import { getSellerBasicInfo, url } from "@/api/api";
import StarRating from "@/components/shared/RenderStars";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useCookies } from "next-client-cookies";
import Image from "next/image";
import { useParams } from "next/navigation";
import React from "react";
import { BiSolidPlusCircle } from "react-icons/bi";
import { BsFillPatchCheckFill } from "react-icons/bs";
import ScaleLoader from "react-spinners/ScaleLoader";
import { toast } from "react-toastify";

interface ProfileHeroProps {
	sellerId?: string;
}

const ProfileHero = ({ sellerId }: ProfileHeroProps) => {
	const params = useParams();
	const id = sellerId || params.id;
	const cookies = useCookies();
	const customerId = cookies.get("customer_pid") || "";
	// console.log("enterpenure_pid", id);

	// const userData = JSON.parse(localStorage.getItem("loginDetails") || "{}");
	// const customerId = userData.customer_pid;
	// console.log("customer_pid", customerId);

	const { isLoading, error, data } = useQuery({
		queryKey: ["getSellerBasicInfo"],
		queryFn: () => getSellerBasicInfo(id as string),
	});

	// console.log(data);

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

	const handleFollow = async () => {
		// console.log("followed clicked");
		if (customerId && id) {
			const followInfo = {
				customer_pid: customerId,
				enterpenure_pid: id,
			};
			// console.log(followInfo);

			try {
				const response = await axios.post(
					`${url}/api/admin/follower`,
					followInfo
				);

				// console.log("Response:", response?.data?.meta?.status);
				// console.log("Response:", response?.data);

				if (response?.data?.meta?.status) {
					toast.success("Followed successfully!", {
						position: "bottom-left",
						autoClose: 3000,
					});
				}
			} catch (error: any) {
				// console.error("Error to follow the seller:", error);
				console.error(
					"Error to follow the seller:",
					error?.response?.data?.meta?.status
				);
				if (!error?.response?.data?.meta?.status) {
					toast.error("You already followed this seller", {
						position: "bottom-left",
						autoClose: 3000,
					});
				}
			}
		}
	};

	return (
		<div className="bg-brandLsSecondary">
			<div className="container mx-auto">
				<div className="flex max-md:flex-col max-md:justify-center justify-between items-center">
					<div className="flex items-center max-md:flex-col max-md:justify-center justify-start">
						<div className="flex flex-col items-center py-8">
							{data.file_url ? (
								<Image
									src={data.file_url}
									alt="seller image"
									width={180}
									height={192}
									className="h-48 w-auto rounded-full border-2 border-successHover z-10"
								/>
							) : (
								<Image
									src={`/assets/images/profile/userProfile.png`}
									alt="user image"
									width={180}
									height={192}
									className="h-48 w-auto rounded-full border-2 border-successHover z-10"
								/>
							)}

							{/* <BiSolidPlusCircle className="w-8 h-8 -mt-4 text-brandPrimary z-20" /> */}
						</div>
						<div className="ml-5 my-2 font-normal text-brandPrimary">
							<h1 className="max-md:text-xl text-3xl mb-4">
								{/* MD. Samiul Ahmed Protik */}
								{data.shop_name}
							</h1>
							<div className="flex items-center gap-4 mb-2">
								<div className="text-warning text-xl flex">
									{" "}
									<StarRating rating={data.seller_avg_rating} />{" "}
								</div>
								<p className="text-brandPrimary text-xl">
									{" "}
									{data.seller_avg_rating} / {data.seller_total_rating} {" "}
								</p>
								<p className="text-brandPrimary">
									{" "}
									(Total {data.seller_total_rating} ratings){" "}
								</p>
							</div>

							<div className="flex items-center text-brandPrimary gap-1 mb-4">
								<p className=" text-xl">
									<BsFillPatchCheckFill />
								</p>
								<p className=" text-sm"> Verified Seller </p>
							</div>

							<div className="flex flex-col lg:flex-row items-start lg:items-center gap-0 lg:gap-8 text-brandPrimary">
								<div>{data.total_followers} Followers</div>
								<div>
									{data.positive_rating_percentage}% Positive Seller Ratings
								</div>
							</div>
						</div>
					</div>
					{/* <div>
						<button className="bg-dangerPrimary px-8 py-2 rounded-3xl text-sm text-bgPrimary">
							Logout
						</button>
					</div> */}
					<div>
						<button
							onClick={handleFollow}
							className="border border-brandPrimary hover:bg-brandHover text-brandPrimary hover:text-white px-8 py-2 rounded-3xl text-sm font-medium"
						>
							Follow
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ProfileHero;
