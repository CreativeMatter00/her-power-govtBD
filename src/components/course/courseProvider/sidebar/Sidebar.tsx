"use client";
import styles from "@/styles/Events.module.css";
import { CgProfile } from "react-icons/cg";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { usePathname } from "next/navigation";
import { BsPersonWorkspace } from "react-icons/bs";
import { FaTasks } from "react-icons/fa";
import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import { getCourseProviderInfoById, getProviderInfo } from "@/api/api";
import { useCookies } from "next-client-cookies";

const Sidebar = () => {
	const t=useTranslations("providerInfo")
	const locale = useLocale();
	const path = usePathname();
	const cookies = useCookies();
	const lastWord = path.split("/").filter(Boolean).pop();
	const userId = cookies.get("user_pid");
	const [activeItem, setActiveItem] = useState<string>("dashboard");

	useEffect(() => {
		if (lastWord === "dashboard") {
			setActiveItem("dashboard");
		} else if (lastWord === "courses") {
			setActiveItem("courses");
		}
	}, [lastWord]);

	const { isLoading, data, error } = useQuery({
		queryKey: ["getCourseProviderInfoById", userId],
		queryFn: () => getCourseProviderInfoById(userId as string),
	});
	return (
		<aside className={`${styles.dashboardSidebarShadow} min-w-fit`}>
			<div className="">
				<div className="flex flex-col gap-3 text-base text-brandPrimary bg-bgPrimary pb-12">
					<div className="w-full flex flex-col justify-center items-center p-3 border-b border-b-brandLsPrimary ">
						<div className="flex justify-center items-center rounded-full overflow-hidden">
							<Image
								src={data?.profile_photo || "/assets/images/profile/avatar-profile.jpg"}
								width={100}
								height={100}
								alt="profile images"
								className="h-32 w-32 object-cover rounded-full border-2 border-brandDs z-10"
							/>
						</div>
						<h1>{data?.providor_name}</h1>
					</div>

					{/* ==================================== DASHBOARD ============================= */}
					<Link href={`/${locale}/course/course-provider/dashboard`}>
						<div
							className={`flex items-center gap-3 p-4 hover:cursor-pointer hover:bg-brandLsSecondary ${
								activeItem === "dashboard" ? "bg-brandLsPrimary" : ""
							}`}
						>
							<CgProfile
								className={`w-6 h-6 ${
									activeItem === "dashboard"
										? "text-brandDs"
										: "text-brandPrimary"
								}`}
							/>
							<p
								className={`${
									activeItem === "dashboard" ? "text-brandDs" : ""
								}`}
							>
								{t("Provider Information")}
							</p>
						</div>
					</Link>

					{/* ============================ MY PROFILE ======================================= */}
					<Link href={`/${locale}/course/course-provider/courses`}>
						<div
							className={`flex items-center gap-3 p-4 hover:cursor-pointer hover:bg-brandLsSecondary ${
								activeItem === "courses" ? "bg-brandLsPrimary" : ""
							}`}
						>
							<BsPersonWorkspace
								className={`w-6 h-6 ${
									activeItem === "courses"
										? "text-brandDs"
										: "text-brandPrimary"
								}`}
							/>
							<p
								className={`${activeItem === "courses" ? "text-brandDs" : ""}`}
							>
								{t("Courses")}
							</p>
						</div>
					</Link>
				</div>
			</div>
		</aside>
	);
};

export default Sidebar;
