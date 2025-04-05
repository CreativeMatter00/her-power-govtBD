"use client";
import React, { useState } from "react";
import BrowsingEvents from "./browsingEvents/BrowsingEvents";
import { getEventsDivisionId } from "@/api/api";
import { useQuery } from "@tanstack/react-query";
import AllEventCard from "../../eventComponents/eventCards/AllEventCard";
interface EventFilteringInfo {
	eventName: string;
	isSelected: boolean;
}
interface Props {
	eventFiltering: EventFilteringInfo[];
}

const EventFiltering: React.FC<Props> = ({ eventFiltering }) => {
	const [selectedDivision, setSelectedDivision] = useState("");
	const [currentPage, setCurrentPage] = useState(1);
	const {
		isLoading,
		error,
		data: allEventsByDivision,
		refetch: allFeaturedEventsRefetch,
	} = useQuery({
		queryKey: ["allEventsByDivision", selectedDivision, currentPage],
		queryFn: () =>
			getEventsDivisionId(`${selectedDivision}?page=${currentPage}`),
		enabled: !!(selectedDivision && currentPage),
	});

	// console.log("allEventsByDivision", allEventsByDivision);
	return (
		<>
			{/* <section>
        <BrowsingEvents setSelectedDivision={setSelectedDivision} />
        <main className="container p-4">
          <div className="grid xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-8">
            {allEventsByDivision?.data?.events.map(
              (event: any, index: number) => (
                <AllEventCard key={index} event={event} />
              )
            )}
          </div>
        </main>
      </section> */}
		</>
	);
};

export default EventFiltering;
