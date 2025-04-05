"use client";
import { getAllEvents } from "@/api/api";
import MyEventCard from "../eventComponents/eventCards/MyEventCard";
import { useQuery } from "@tanstack/react-query";
import ScaleLoader from "react-spinners/ScaleLoader";
import { useState } from "react";
import EventsPagination from "@/components/shared/EventsPagination";

const AllEvents = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const {
    isLoading: allEventsIsLoading,
    error: allEventsError,
    data: allEvents,
    refetch: allEventCategoriesRefetch,
  } = useQuery({
    queryKey: ["allEvents", currentPage],
    queryFn: () => getAllEvents(currentPage),
  });

  // console.log("all events", allEvents);

  const handleNextPage = () => {
    if (allEvents?.meta?.current_page[0] < allEvents?.meta?.last_page) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (allEvents?.meta?.current_page[0] > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  if (allEventsIsLoading)
    return (
      <div className="w-screen h-screen flex justify-center items-center">
        <ScaleLoader color="#421957" height={70} radius={8} width={10} />
      </div>
    );
  return (
    <section className="container p-4">
      <main className="pt-24">
        <p className="text-3xl text-brandPrimary">All Events</p>
        <div className="mt-4">
          {allEvents?.data?.events.map((currentEvent: any, index: number) => (
            <MyEventCard
              key={index}
              eventPid={currentEvent?.event_pid}
              thumbnail={currentEvent.thumbnail_file_url || "/event.jpg"}
              eventTitle={currentEvent?.event_title}
              location={currentEvent?.venues?.division_name || "Virtual"}
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
          ))}
        </div>

        <EventsPagination
          currentPage={currentPage}
          hasPreviousPage={allEvents?.meta?.current_page[0] > 1}
          hasNextPage={
            allEvents?.meta?.current_page[0] < allEvents?.meta?.last_page
          }
          onPreviousPage={handlePreviousPage}
          onNextPage={handleNextPage}
        />
      </main>
    </section>
  );
};

export default AllEvents;
