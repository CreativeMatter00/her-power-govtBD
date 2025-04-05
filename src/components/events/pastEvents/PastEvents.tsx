"use client";
import { getPastEvents } from "@/api/api";
import MyEventCard from "../eventComponents/eventCards/MyEventCard";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import ScaleLoader from "react-spinners/ScaleLoader";
import EventsPagination from "@/components/shared/EventsPagination";

const PastEvents = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const {
    isLoading: allPastEventsIsLoading,
    error: allPastEventsError,
    data: allPastEvents,
  } = useQuery({
    queryKey: ["allPastEvents", currentPage],
    queryFn: () => getPastEvents(currentPage),
    staleTime: 5000,
  });
  const handleNextPage = () => {
    if (allPastEvents?.meta?.current_page[0] < allPastEvents?.meta?.last_page) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };
  const handlePreviousPage = () => {
    if (allPastEvents?.meta?.current_page[0] > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };
  if (allPastEventsIsLoading)
    return (
      <div className="w-screen h-screen flex justify-center items-center">
        <ScaleLoader color="#421957" height={70} radius={8} width={10} />
      </div>
    );

  return (
    <section className="container p-4">
      <main className="pt-24">
        <p className="text-3xl text-brandPrimary">Past Events</p>
        <div className="mt-4">
          {allPastEvents?.data?.events.map(
            (currentEvent: any, index: number) => (
              <MyEventCard
                key={index}
                eventPid={currentEvent?.event_pid}
                thumbnail={currentEvent.thumbnail_file_url || "/event.jpg"}
                eventTitle={currentEvent?.event_title}
                location={currentEvent?.venues?.division_name || "Dhaka"}
                date={currentEvent?.event_schedule?.start_datetime}
                fromTime={currentEvent?.event_schedule?.from_time}
                description={currentEvent?.event_desc}
                ticketPrice={currentEvent?.tricket_info?.ticket_amount}
              />
            )
          )}
        </div>

        {/* Pagination Component */}
        <EventsPagination
          currentPage={currentPage}
          hasPreviousPage={allPastEvents?.meta?.current_page[0] > 1}
          hasNextPage={
            allPastEvents?.meta?.current_page[0] <
            allPastEvents?.meta?.last_page
          }
          onPreviousPage={handlePreviousPage}
          onNextPage={handleNextPage}
        />
      </main>
    </section>
  );
};

export default PastEvents;

