"use client";

import { useFormattedDateOrTime } from "@/hooks/useFormattedDateOrTime";
import { useLocale } from "next-intl";
import Link from "next/link";
import React from "react";
import { GrLocation } from "react-icons/gr";
import { LuCalendarClock } from "react-icons/lu";

type IEventCardProps = {
	id: string;
	location: string;
	date: string;
	title: string;
};

const EventCard: React.FC<IEventCardProps> = ({
	location,
	id,
	date,
	title,
}) => {
	const locale = useLocale();

	return (
		<div className="border-2 border-link rounded-md py-4 px-10 mb-4">
			<div className="flex justify-between gap-8">
				<div>
					<div className="flex items-center gap-4 mb-4">
						{/* <GrLocation className="text-greyPrimary" /> */}
						{/* <p className="text-link"> {location} </p> */}
						<LuCalendarClock className="text-greyPrimary" />
						<p className="text-link"> {useFormattedDateOrTime(date, "both")}</p>
					</div>

					<div className="text-brandPrimary text-2xl">{title}</div>
				</div>

				<Link
					href={`/${locale}/events/event/${id}`}
					className="flex flex-col justify-end hover:underline text-link"
				>
					View Detail
				</Link>
			</div>
		</div>
	);
};

export default EventCard;
