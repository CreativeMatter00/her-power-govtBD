"use client";
import Image from "next/image";
import React from "react";
import { format } from "date-fns";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";

// *========== EVENTS TYPE DEFINITION =============
interface IUpcomingEvent {
	banner_file_url: string;
	event_title: string;
	event_schedule: Array<{ start_datetime: string }>;
	venues: Array<{ division_name: string }>;
	event_desc: string;
	event_pid: string;
}

// *=========== PROPS TYPE DEFINITION ============
interface IProps {
	event: IUpcomingEvent;
}

const UpcomingEventCard: React.FC<IProps> = ({ event }) => {
	const locale = useLocale();
	const t = useTranslations("Events");
	// console.log(event);
	// ========== DESTRUCTURING ==============
	const {
		banner_file_url,
		event_title,
		event_schedule,
		venues,
		event_desc,
		event_pid,
	} = event;

	// ! ======= FORMATTING EVENT DATE ========
	let formattedDate = "";

	if (event_schedule[0]?.start_datetime) {
		const dateTime = new Date(event_schedule[0].start_datetime);
		formattedDate = format(dateTime, "d MMMM, yyyy");
	}
	return (
		<div className="flex flex-col gap-2 p-2 border border-brandLsPrimary rounded">
			{/* ========== CARD IMAGE ========== */}
			{banner_file_url ? (
				<Image
					src={banner_file_url}
					alt={`${event_title}`}
					width={244}
					height={165}
					className="w-full h-[165px] rounded-md"
				/>
			) : (
				<Image
					src="/assets/images/events/Images/jakob-dalbjorn-cuKJre3nyYc-unsplash.png"
					alt={`${event_title}`}
					width={244}
					height={165}
					className="w-full h-[165px] rounded-md"
				/>
			)}

			{/* =========== CARD TITLE ========== */}
			<h1 className="text-3xl text-brandPrimary font-normal">{event_title}</h1>

			{/* ============ DATE AND LOCATION ============ */}
			<div className="flex items-center gap-x-2 text-greyPrimary text-sm">
				{event_schedule[0]?.start_datetime ? (
					<>
						<p className="">{formattedDate}</p>
					</>
				) : (
					<>
						<p className="">2 Oct, 2024</p>
					</>
				)}
				<div className="w-1 h-1 bg-brandDs rounded"></div>
				{venues.length > 0 ? (
					<p>{venues[0]?.division_name}, Bangladesh</p>
				) : (
					<p>Rajshahi, Bangladesh</p>
				)}
			</div>

			{/* ============================ EVENT DESCRIPTION ============================== */}
			<div className="text-base font-normal text-brandPrimary line-clamp-2">
				{/* {event_desc ? <p>{event_desc}</p> : <p></p>} */}
				{event_desc ? (
					<div dangerouslySetInnerHTML={{ __html: event_desc }}></div>
				) : (
					<p></p>
				)}
			</div>

			{/* ============================ READ MORE OPTION ======================== */}
			<Link href={`/${locale}/events/event/${event_pid}`}>
				<p className="text-base text-link hover:underline my-3">{t("ReadMore")}</p>
			</Link>
		</div>
	);
};

export default UpcomingEventCard;
