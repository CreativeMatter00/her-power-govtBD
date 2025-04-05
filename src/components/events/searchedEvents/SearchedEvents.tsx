"use client";
import { useSearchParams } from "next/navigation";
import MyEventCard from "../eventComponents/eventCards/MyEventCard";
import ScaleLoader from "react-spinners/ScaleLoader";
import { useQuery } from "@tanstack/react-query";
import { getSearchEvents } from "@/api/api";
import { useState } from "react";
import EventsPagination from "@/components/shared/EventsPagination";

const SearchedEvents = () => {
  const searchParams = useSearchParams();
  const queryParams = searchParams.toString();
  const eventName = searchParams.get("search");
  const [currentPage, setCurrentPage] = useState(1);

  const { isLoading: searchEventsIsLoading, data: searchEvents } = useQuery({
    queryKey: ["searchEvents", queryParams, currentPage],
    queryFn: () => getSearchEvents(`${queryParams}&page=${currentPage}`),
  });

  const handleNextPage = () => {
    if (searchEvents?.meta?.current_page[0] < searchEvents?.meta?.last_page) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handlePreviousPage = () => {
    if (searchEvents?.meta?.current_page[0] > 1) {
      setCurrentPage((prev) => Math.max(prev - 1, 1));
    }
  };

  if (searchEventsIsLoading)
    return (
      <div className="w-screen h-screen flex justify-center items-center">
        <ScaleLoader color="#421957" height={70} radius={8} width={10} />
      </div>
    );

  return (
    <section className="container p-4">
      <p className="pt-24">You searched for: {eventName}</p>
      <div className="mt-4">
        {searchEvents?.data?.events.length > 0 ? (
          searchEvents.data.events.map((currentEvent: any, index: number) => (
            <MyEventCard
              key={index}
              eventPid={currentEvent?.event_pid}
              thumbnail={currentEvent.thumbnail_file_url || "/event.jpg"}
              eventTitle={currentEvent?.event_title}
              location={currentEvent?.venues?.division_name || "Dhaka"}
              date={currentEvent?.event_schedule?.start_datetime}
              fromTime={currentEvent?.event_schedule?.from_time}
              description={currentEvent?.event_desc}
              ticketPrice={
                currentEvent?.tricket_info &&
                currentEvent?.tricket_info.length > 0
                  ? currentEvent.tricket_info[0].ticket_amount
                  : currentEvent?.tricket_info?.ticket_amount
              }
            />
          ))
        ) : (
          <p>No events found for {`"${eventName}"`}</p>
        )}
      </div>
      <EventsPagination
        currentPage={currentPage}
        hasPreviousPage={searchEvents?.links?.prev !== null}
        hasNextPage={searchEvents?.links?.next !== null}
        onPreviousPage={handlePreviousPage}
        onNextPage={handleNextPage}
      />
    </section>
  );
};

export default SearchedEvents;
