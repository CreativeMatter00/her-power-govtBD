"use client";
import React from "react";
// import Pagination from "../../eventComponents/pagination/Pagination";
import { useLocale, useTranslations } from "next-intl";
import Link from "next/link";
import ScaleLoader from "react-spinners/ScaleLoader";
import { useQuery } from "@tanstack/react-query";
import { getLimitedAllEvents } from "@/api/api";
import AllEventCard from "../../eventComponents/eventCards/AllEventCard";

// * ========= EVENTS TYPE DEFINITION ============
interface IEvent {
	event_pid: string;
	thumbnail_file_url: string | null | undefined;
	event_title: string | null | undefined;
	event_schedule: Array<{ start_datetime: string | null | undefined }>;
	venues: Array<{ division_name: string | null | undefined }>;
	tricket_info: Array<{ ticket_amount: number | null | undefined }>;
}

const AllEvents = () => {
	const locale = useLocale();
	const t = useTranslations("Events");
	const {
		isLoading: getAllEventsLoading,
		error: allEventsError,
		data: allEvents,
	} = useQuery({
		queryKey: ["getAllEvents"],
		queryFn: () => getLimitedAllEvents(),
	});

	if (getAllEventsLoading)
		return (
			<div className="min-h-[600px]">
				<div className="flex items-center justify-center">
					<ScaleLoader color="#421957" height={70} radius={8} width={10} />
				</div>
			</div>
		);

	if (allEventsError) {
		// console.log("data fetching past event error");
		console.log(allEventsError);
	}

	return (
		<>
			<section className="my-8">
				{/* =========== FILTERED EVENT HEADING ============= */}
				<h1 className="text-3xl text-brandPrimary my-4">{t("AllEvents")}</h1>

				{/* ========= LIMITED ALL EVENT CARDS ============ */}
				<div className="grid xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-8">
					{allEvents?.data?.map((event: IEvent, index: number) => (
						<AllEventCard key={index} event={event} />
					))}
				</div>

				{/* //*========== PAGINATION ============== */}
				{/* <Pagination /> */}
				<div className="mt-16">
					<div className="flex justify-center items-center">
						<button className="border py-4 px-10 rounded-full text-white font-medium bg-link hover:bg-linkHover">
							<Link href={`/${locale}/events/all-events`}>{t("SeeMore")}</Link>
						</button>
					</div>
				</div>
			</section>
		</>
	);
};

export default AllEvents;