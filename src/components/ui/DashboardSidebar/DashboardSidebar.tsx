"use client";
import styles from "@/styles/Events.module.css";
import { TbBrandGoogleAnalytics } from "react-icons/tb";
import { RiInboxArchiveLine } from "react-icons/ri";
import { IoSpeedometerOutline } from "react-icons/io5";
import { MdOutlineCreateNewFolder } from "react-icons/md";
import { IoCreate } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useLocale } from "next-intl";
import { usePathname } from "next/navigation";

const DashboardSidebar = () => {
	const locale = useLocale();
	const path = usePathname();
	const lastWord = path.split("/").filter(Boolean).pop();

	const [activeItem, setActiveItem] = useState<string>("dashboard");

	useEffect(() => {
		if (lastWord === "my-profile") {
			setActiveItem("myProfile");
		} else if (lastWord === "create-events") {
			setActiveItem("createEvent");
		} else if (lastWord === "registration-management") {
			setActiveItem("registrationManagement");
		} else if (lastWord === "events-archive") {
			setActiveItem("eventArchive");
		} else {
			setActiveItem("dashboard");
		}
	}, [lastWord]);

	return (
		<aside className={`${styles.dashboardSidebarShadow} min-w-fit mt-16`}>
			<div className="">
				<div className="flex flex-col gap-3 text-base text-brandPrimary bg-bgPrimary pb-12">
					{/* ==================================== DASHBOARD ============================= */}
					<Link href={`/${locale}/events/organizer/`}>
						<div
							className={`flex items-center gap-3 p-4 hover:cursor-pointer hover:bg-brandLsSecondary ${
								activeItem === "dashboard" ? "bg-brandLsPrimary" : ""
							}`}
						>
							<IoSpeedometerOutline
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
								Dashboard
							</p>
						</div>
					</Link>

					{/* ============================ MY PROFILE ======================================= */}
					<Link href={`/${locale}/events/organizer/my-profile`}>
						<div
							className={`flex items-center gap-3 p-4 hover:cursor-pointer hover:bg-brandLsSecondary ${
								activeItem === "myProfile" ? "bg-brandLsPrimary" : ""
							}`}
						>
							<CgProfile
								className={`w-6 h-6 ${
									activeItem === "myProfile"
										? "text-brandDs"
										: "text-brandPrimary"
								}`}
							/>
							<p
								className={`${
									activeItem === "myProfile" ? "text-brandDs" : ""
								}`}
							>
								My Profile
							</p>
						</div>
					</Link>
					{/* =============================== CREATE EVENT ================================= */}
					<Link href={`/${locale}/events/organizer/create-events`}>
						<div
							className={`flex items-center gap-3 p-4 hover:cursor-pointer hover:bg-brandLsSecondary ${
								activeItem === "createEvent" ? "bg-brandLsPrimary" : ""
							}`}
						>
							<MdOutlineCreateNewFolder
								className={`w-6 h-6 ${
									activeItem === "createEvent"
										? "text-brandDs"
										: "text-brandPrimary"
								}`}
							/>
							<p
								className={`${
									activeItem === "createEvent" ? "text-brandDs" : ""
								}`}
							>
								Create Event
							</p>
						</div>
					</Link>
					{/* ============================= REGISTRATION MANAGEMENT ===================================== */}
					<Link href={`/${locale}/events/organizer/registration-management`}>
						<div
							className={`flex items-center gap-3 p-4 hover:cursor-pointer hover:bg-brandLsSecondary ${
								activeItem === "registrationManagement"
									? "bg-brandLsPrimary"
									: ""
							}`}
						>
							<IoCreate
								className={`w-6 h-6 ${
									activeItem === "registrationManagement"
										? "text-brandDs"
										: "text-brandPrimary"
								}`}
							/>
							<p
								className={`${
									activeItem === "registrationManagement" ? "text-brandDs" : ""
								}`}
							>
								Registration Management
							</p>
						</div>
					</Link>

					{/* ================================ EVENT ARCHIVE =================================== */}
					{/* <Link href={`/${locale}/events/organizer/events-archive`}>
						<div
							className={`flex items-center gap-3 p-4 hover:cursor-pointer hover:bg-brandLsSecondary ${
								activeItem === "eventArchive" ? "bg-brandLsPrimary" : ""
							}`}
						>
							<RiInboxArchiveLine
								className={`w-6 h-6 ${
									activeItem === "eventArchive"
										? "text-brandDs"
										: "text-brandPrimary"
								}`}
							/>
							<p
								className={`${
									activeItem === "eventArchive" ? "text-brandDs" : ""
								}`}
							>
								Event Archive
							</p>
						</div>
					</Link> */}
				</div>
			</div>
		</aside>
	);
};

export default DashboardSidebar;
