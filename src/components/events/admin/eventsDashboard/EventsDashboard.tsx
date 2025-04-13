"use client";

import { DownloadArrowIcon } from "@/components/ui/icon/EventsIcon";
import DashboardTable from "./DashboardTable";
import { getEventsByOrganizer } from "@/api/api";
import { useQuery } from "@tanstack/react-query";
import ScaleLoader from "react-spinners/ScaleLoader";
import { useCookies } from "next-client-cookies";

const EventsDashboard = () => {
	const cookies = useCookies();
	const organizerId = cookies.get("isOrganizer_pid") || "";

	const {
		isLoading,
		error,
		data: eventsByOrganizer,
		refetch,
	} = useQuery({
		queryKey: ["eventsByOrganizer"],
		queryFn: () => getEventsByOrganizer(organizerId),
	});

	if (isLoading)
		return (
			<div className="w-screen h-screen flex justify-center items-center">
				<ScaleLoader color="#421957" height={70} radius={8} width={10} />
			</div>
		);

	// if (error)
	// 	return (
	// 		<div className="text-center text-xl font-md py-8">
	// 			Something went wrong. Please reload
	// 		</div>
	// 	);

	return (
		<>
			<aside className="basis-full">
				{/* ========================== TITLE ============================= */}
				<h1 className="text-3xl text-brandPrimary font-normal">Dashboard</h1>
				<div className="border-t border-brandLsPrimary mt-4">
					<div className="flex justify-between items-center pt-6">
						{/* =========================== EVENT LIST ============================ */}
						<p className="text-base text-brandPrimary font-bold">Event List</p>
					</div>
				</div>

				{/* ========================== TABLE =================================== */}
				<DashboardTable
					allEvents={eventsByOrganizer?.data}
					refetchEvents={refetch}
				/>
			</aside>
		</>
	);
};

export default EventsDashboard;
