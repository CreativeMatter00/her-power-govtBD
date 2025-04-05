"use client";

import React from "react";
import Title from "./Title";
import { useForm } from "react-hook-form";
import InputField from "./InputField";
import PersonalInformation from "./PersonalInformation";
import { yupResolver } from "@hookform/resolvers/yup";
import OrganizerRegistrationSchema from "./organizerRegistrationSchema";
import axios from "axios";
import { url } from "@/api/api";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useCookies } from "next-client-cookies";
import { useLocale, useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
interface IFormInputs {
	org_name: string;
	designation: string;
	org_address: string;
	org_type: string;
	org_website: string;
}

const OrganizerRegistration = () => {
	const cookies = useCookies();
	const locale = useLocale();
	const router = useRouter();
	const userPid = cookies.get("user_pid");
	const t=useTranslations("career")
	const resolver = yupResolver(OrganizerRegistrationSchema);
	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm<IFormInputs>({ resolver });

	const onSubmit = async (data: IFormInputs) => {
		const organizerData = {
			org_name: data.org_name,
			designation: data.designation,
			org_address: data.org_address,
			org_type: data.org_type,
			org_website: data.org_website,
			ref_user_pid: userPid,
		};
		// console.log(organizerData);
		try {
			const response = await axios.post(
				`${url}/api/admin/event/organizer`,
				organizerData
			);
			if (response?.data?.meta?.status === true) {
				// ? Add to cart toast notification
				toast.success("Form submitted successfully!", {
					position: "bottom-left",
					autoClose: 3000,
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true,
					progress: undefined,
					theme: "light",
				});
			}
			reset();
			cookies.set("isOrganizer", "true");
			router.push(`/${locale}/events`);
		} catch (error) {
			console.error("Error submitting form:", error);
			toast.error("Something went wrong", {
				position: "bottom-left",
				autoClose: 3000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
				theme: "light",
			});
		}
	};
	return (
		<>
			<main className="container p-4 mt-16 pt-16">
				<section className="my-8 w-full">
					<p className="text-brandPrimary text-3xl">{t("Registration Form")}</p>

					{/* =========== PERSONAL INFORMATION ============= */}
					{/* {userPid && <PersonalInformation userPid={userPid} />} */}

					<div className="my-12 border border-brandLsPrimary rounded-lg w-full p-6">
						<form onSubmit={handleSubmit(onSubmit)}>
							{/* ========= ORGANIZATION INFORMATION ========= */}
							<Title title={t("Organization Information")} />
							<div className="grid grid-cols-1 md:grid-cols-2 gap-x-14 gap-y-4 mt-4">
								<InputField
									inputType="text"
									register={register}
									errors={errors}
									labelName={t("Organization Name")}
									inputName="org_name"
									placeholderText={t("Enter your organization name")}
								/>
								<InputField
									inputType="text"
									register={register}
									errors={errors}
									labelName={t("Designation")}
									inputName="designation"
									placeholderText={t("Enter your designation")}
								/>
								<InputField
									inputType="text"
									register={register}
									errors={errors}
									labelName={t("Organization Address")}
									inputName="org_address"
									placeholderText={t("Enter organization address")}
								/>
								<InputField
									inputType="text"
									register={register}
									errors={errors}
									labelName={t("Organization Type")}
									inputName="org_type"
									placeholderText={t("Enter organization type")}
								/>
								<InputField
									inputType="text"
									register={register}
									errors={errors}
									labelName={t("Organization Website (if any)")}
									inputName="org_website"
									placeholderText={t("Enter organization website url")}
								/>
							</div>
							<div className="flex justify-end">
								<div className="flex gap-6">
									<button
										type="submit"
										className="bg-link hover:bg-linkHover rounded-full py-4 px-10 text-bgPrimary font-medium"
									>
										{t("Submit")}
									</button>
								</div>
							</div>
						</form>
					</div>
					<ToastContainer />
				</section>
			</main>
		</>
	);
};

export default OrganizerRegistration;
