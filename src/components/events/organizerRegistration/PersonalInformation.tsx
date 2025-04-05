"use client";
import React from "react";
import Title from "./Title";
import { useCookies } from "next-client-cookies";
import { useQuery } from "@tanstack/react-query";
import { getUserInfo } from "@/api/api";
import ScaleLoader from "react-spinners/ScaleLoader";
import { useTranslations } from "next-intl";

interface IProps {
	userPid: string;
}
const PersonalInformation: React.FC<IProps> = ({ userPid }) => {
	const t=useTranslations("career")
	const {
		isLoading: isUserLoading,
		error: userError,
		data: userData,
		refetch: userDataRefetch,
	} = useQuery({
		queryKey: ["userInfo"],
		queryFn: () => getUserInfo(userPid),
	});

	if (isUserLoading)
		return (
			<div className="min-h-[600px]">
				<div className="flex items-center justify-center">
					<ScaleLoader color="#421957" height={70} radius={8} width={10} />
				</div>
			</div>
		);

	if (userError) {
		console.log(userError);
	}
	const {
		fname,
		lname,
		email,
		mobile_no,
		customer_address:address_line,
		customer_area_name:area_name,
		customer_city_name:city_name,
		customer_zip_postal_code:zip_postal_code,
	} = userData;
	return (
		<>
			<div className="my-5 border border-brandLsPrimary rounded-lg w-full p-6">
				<div>
					<Title title={t("Personal Information")} />
					<div className="grid grid-cols-1 md:grid-cols-2 gap-x-14 gap-y-4 mt-4">
						<div className="w-full">
							<label className="text-sm font-normal pb-2 pl-6 text-brandPrimary">
								{t("firstName")}
							</label>

							<p className="py-2 pl-6">{fname}</p>
						</div>
						<div className="w-full">
							<label className="text-sm font-normal pb-2 pl-6 text-brandPrimary">
								{t("lastName")}
							</label>
							<p className="py-2 pl-6">{lname}</p>
						</div>
						<div className="w-full">
							<label className="text-sm font-normal pb-2 pl-6 text-brandPrimary">
								{t("Email")}
							</label>
							<p className="py-2 pl-6">{email}</p>
						</div>
						<div className="w-full">
							<label className="text-sm font-normal pb-2 pl-6 text-brandPrimary">
								{t("phoneNumber")}
							</label>
							<p className="py-2 pl-6">{mobile_no}</p>
						</div>
						<div className="w-full">
							<label className="text-sm font-normal pb-2 pl-6 text-brandPrimary">
								{t("Address")}
							</label>
							<p className="py-2 pl-6">{address_line}</p>
						</div>
						<div className="w-full">
							<label className="text-sm font-normal pb-2 pl-6 text-brandPrimary">
								{t("Area_Name")}
							</label>
							<p className="py-2 pl-6">{area_name}</p>
						</div>
						<div className="w-full">
							<label className="text-sm font-normal pb-2 pl-6 text-brandPrimary">
								{t("City_Name")}
							</label>
							<p className="py-2 pl-6">{city_name}</p>
						</div>
						<div className="w-full">
							<label className="text-sm font-normal pb-2 pl-6 text-brandPrimary">
								{t("zipCode")}
							</label>
							<p className="py-2 pl-6">{zip_postal_code}</p>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default PersonalInformation;
