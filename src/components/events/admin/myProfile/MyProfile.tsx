"use client";
import { BiSolidPlusCircle } from "react-icons/bi";
import Image from "next/image";
import { useState } from "react";
import ProfileInformation from "./ProfileInformation";
import EditProfileForm from "./EditProfileForm";
import PasswordForm from "./PasswordForm";
import { useCookies } from "next-client-cookies";
import { useQuery } from "@tanstack/react-query";
import { getUserInfo } from "@/api/api";
import ScaleLoader from "react-spinners/ScaleLoader";
import { useTranslations } from "next-intl";

const MyProfile = () => {
	const [editProfile, setEditProfile] = useState<boolean>(false);
	const [editPassword, setEditPassword] = useState<boolean>(false);
	const t=useTranslations("Events");
	const handleProfileInformaiton = () => {
		setEditProfile(!editProfile);
		setEditPassword(false);
	};

	const cookies = useCookies();
	const userPid = cookies.get("user_pid");

	const {
		isLoading: isUserLoading,
		error: userError,
		data: userData,
	} = useQuery({
		queryKey: ["userInfo"],
		queryFn: () => getUserInfo(userPid as string),
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
		// console.log("data fetching past event error");
		console.log(userError);
	}

	return (
		<>
			<aside className="basis-full">
				{/* ====================================  USER INFO ======================================= */}
				<div className="bg-brandLsSecondary">
					<div className="container mx-auto">
						<div className="flex max-md:flex-col max-md:justify-center justify-between items-center">
							<div className="flex items-center max-md:flex-col max-md:justify-center justify-start">
								<div className="flex flex-col items-center py-8">
									<Image
										src={userData?.profile_photo || "/images/user.png"}
										alt="user image"
										width={180}
										height={192}
										className="h-48 w-auto rounded-full border-2 border-successHover z-10"
									/>
									{/* <BiSolidPlusCircle className="w-8 h-8 -mt-4 text-brandPrimary z-20" /> */}
								</div>
								<div className="ml-5 my-2 font-normal text-brandPrimary">
									<h1 className="max-md:text-xl text-3xl mb-4">
										{userData.fname} {userData.lname}
									</h1>
								</div>
							</div>
						</div>
					</div>
				</div>

				{/* ================================ EDIT PROFILE ================================== */}
				{!editProfile ? (
					<button className="mt-6" onClick={() => setEditProfile(true)}>
						<h1 className="text-xl font-normal text-brandPrimary hover:underline underline-offset-2">
							{t("Edit your profile")}
						</h1>
					</button>
				) : (
					<div className="flex gap-6 mt-6">
						<button onClick={handleProfileInformaiton}>
							<h1 className="text-xl font-normal text-brandPrimary hover:underline underline-offset-2">
								{t("Profile Information")}
							</h1>
						</button>{" "}
						<button onClick={() => setEditPassword(true)}>
							<h1
								className={`text-xl font-normal  hover:underline underline-offset-2 ${
									editPassword ? "text-link" : "text-brandPrimary"
								}`}
							>
								{t("Change Password")}
							</h1>
						</button>
					</div>
				)}

				{editProfile ? (
					<>
						{!editPassword ? (
							<EditProfileForm setEditProfile={setEditProfile} />
						) : (
							<PasswordForm
								setEditPassword={setEditPassword}
								setEditProfile={setEditProfile}
							/>
						)}
					</>
				) : (
					<ProfileInformation
						firstName={userData.fname}
						lastName={userData.lname}
						emailAddress={userData.email}
						mobileNumber={userData.mobile_no}
						address={userData.customer_address|| userData.address_line}
						city={userData.customer_city_name||userData.city_name}
						area={userData.customer_area_name|| userData.area_name}
						zipCode={userData.customer_zip_postal_code || userData.zip_postal_code}
					/>
				)}
			</aside>
		</>
	);
};

export default MyProfile;
