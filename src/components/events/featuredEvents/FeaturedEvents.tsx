"use client";
import MyEventCard from "../eventComponents/eventCards/MyEventCard";
import { getAllFeaturedEvents } from "@/api/api";
import { useQuery } from "@tanstack/react-query";
import ScaleLoader from "react-spinners/ScaleLoader";
import { useState } from "react";
import EventsPagination from "@/components/shared/EventsPagination";

const FeaturedEvents = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const {
    isLoading: allFeaturedEventsLoading,
    error: allFeaturedEventsError,
    data: allFeaturedEvents,
    refetch: allFeaturedEventsRefetch,
  } = useQuery({
    queryKey: ["allFeaturedEvents", currentPage],
    queryFn: () => getAllFeaturedEvents(currentPage),
    staleTime: 5000,
  });

  const handleNextPage = () => {
    if (
      allFeaturedEvents?.meta?.current_page[0] <
      allFeaturedEvents?.meta?.last_page
    ) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (allFeaturedEvents?.meta?.current_page[0] > 1) {
      setCurrentPage((prevPage) => -prevPage - 1);
    }
  };

  if (allFeaturedEventsLoading)
    return (
      <div className="w-screen h-screen flex justify-center items-center">
        <ScaleLoader color="#421957" height={70} radius={8} width={10} />
      </div>
    );

  return (
    <>
      <section className="container p-4">
        <main className="pt-24">
          <p className="text-3xl text-brandPrimary">Featured Events</p>
          <div className="mt-4">
            {allFeaturedEvents?.data?.events.map(
              (event: any, index: number) => (
                <MyEventCard
                  key={index}
                  eventPid={event?.event_pid}
                  thumbnail={event.thumbnail_file_url || "/event.jpg"}
                  eventTitle={event.event_title}
                  location={event?.venues?.division_name || "Virtual"}
                  date={event?.event_schedule?.start_datetime}
                  description={event.event_desc}
                  ticketPrice={
                    event?.tricket_info && event?.tricket_info.length > 0
                      ? event.tricket_info[0].ticket_amount
                      : event?.tricket_info?.ticket_amount
                  }
                  fromTime={event?.event_schedule?.from_time || ""}
                />
              )
            )}
          </div>
          <EventsPagination
            currentPage={currentPage}
            hasPreviousPage={allFeaturedEvents?.meta?.current_page[0] > 1}
            hasNextPage={
              allFeaturedEvents?.meta?.current_page[0] <
              allFeaturedEvents?.meta?.last_page
            }
            onPreviousPage={handlePreviousPage}
            onNextPage={handleNextPage}
          />
        </main>
      </section>
    </>
  );
};

export default FeaturedEvents;
