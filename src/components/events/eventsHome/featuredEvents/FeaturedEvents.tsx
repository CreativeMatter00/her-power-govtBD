"use client";

import Image from "next/image";
import { IoMdArrowForward } from "react-icons/io";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import FeaturedAllEventCard from "../../eventComponents/eventCards/FeaturedAllEventCard";
import { useQuery } from "@tanstack/react-query";
import { getFeaturedEventsHome } from "@/api/api";
import ScaleLoader from "react-spinners/ScaleLoader";

// ******************************* FEATURED EVENT TYPE DEFINITION ===========================
interface FeaturedEventInfo {
	event_pid: string;
	eventImage: string;
	eventTitle: string;
	eventDate: string;
	eventTime: string;
	eventPlace: string;
	eventPrice: string;
}

// ******************************** PROPS TYPE DEFINITION ===========================
interface Props {
	featuredEvents: FeaturedEventInfo[];
}

const FeaturedEvents = () => {
	const locale = useLocale();
	const t = useTranslations("Events");

	// =========== DATA FETCHING =========
	const { isLoading, error, data } = useQuery({
		queryKey: ["getFeaturedEventsHome"],
		queryFn: () => getFeaturedEventsHome(),
	});

	// console.log("featured", data);

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

	return (
		<>
			<section>
				<div className="flex items-center justify-between">
					{/* =========================== FEATURED EVENTS HEADING ========================= */}
					<div className="flex items-center gap-2">
						{/* ======================= HEADING ICON ====================== */}
						<Image
							src={"/assets/images/events/Icons/star.png"}
							alt="star"
							width={30}
							height={30}
							className="w-auto h-8"
						/>
						{/* ============================== HEADING TITLE ======================= */}
						<h1 className="font-bold text-xl text-brandDs">{t("FeaturedEvents")}</h1>
					</div>

					{/* =========================== SEE ALL FEATURED EVENTS ========================= */}

					<Link href={`/${locale}/events/featured-events`}>
						<div className="flex items-center gap-2 text-brandPrimary cursor-pointer group ">
							<p className="text-base hover:underline underline-offset-2">
								{t("SeeAll")}
							</p>
							<IoMdArrowForward className="w-5 h-5" />
						</div>
					</Link>
				</div>

				{/* ======================== FEATURED EVENT CARDS ======================= */}

				{isLoading ? (
					<div className="flex items-center justify-center">
						<ScaleLoader color="#421957" height={70} radius={8} width={10} />
					</div>
				) : (
					<div className="grid 2xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 grid-cols-1 gap-x-8 gap-y-8 my-6">
						{data?.data?.map((event: any, index: number) => (
							// <EventCard key={index} event={featuredEvent} />
							<FeaturedAllEventCard
								key={index}
								event_pid={event.event_pid}
								eventImage={event.thumbnail_file_url}
								eventTitle={event.event_title}
								eventDate={event?.event_schedule}
								eventTime={event?.event_schedule}
								eventPlace={event?.venues}
								eventPrice={event?.tricket_info}
							/>
						))}
					</div>
				)}
				{/* <div className="grid grid-cols-4 gap-x-24 gap-y-8 my-6">
          {featuredEvents.map((featuredEvent, index) => (
            <EventCard key={index} event={featuredEvent} />
          ))}
        </div> */}
			</section>
		</>
	);
};

export default FeaturedEvents;
