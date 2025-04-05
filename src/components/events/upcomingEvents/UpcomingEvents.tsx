"use client";

import { useQuery } from "@tanstack/react-query";
import { getUpcomingEventsAll } from "@/api/api";
import ScaleLoader from "react-spinners/ScaleLoader";
import { useState } from "react";
import MyEventCard from "../eventComponents/eventCards/MyEventCard";
import EventsPagination from "@/components/shared/EventsPagination";

const UpcomingEvents = () => {
  const [page, setPage] = useState(1);
  const { isLoading, data, error } = useQuery({
    queryKey: ["getUpcomingEventsAll", page],
    queryFn: () => getUpcomingEventsAll(page),
    staleTime: 5000,
  });

  // console.log("data ", data);

  const handleNextPage = () => {
    if (data?.meta?.current_page[0] < data?.meta?.last_page) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (data?.meta?.current_page[0] > 1) {
      setPage((prevPage) => prevPage - 1);
    }
  };

  if (error)
    return (
      <div className="text-center text-xl font-md py-8">
        Something went wrong. Please reload
      </div>
    );

  if (isLoading)
    return (
      <div className="w-screen h-screen flex justify-center items-center">
        <ScaleLoader color="#421957" height={70} radius={8} width={10} />
      </div>
    );

  return (
    <section className="container p-4">
      <main className="pt-24">
        <p className="text-3xl text-brandPrimary">Upcoming Events</p>
        <div className="mt-4">
          {data?.data?.events?.map((event: any, index: number) => (
            <MyEventCard
              key={index}
              eventPid={event?.event_pid}
              thumbnail={event.thumbnail_file_url || "/event.jpg"}
              eventTitle={event.event_title}
              location={event?.venues?.division_name || "Virtual"}
              date={event?.event_schedule?.start_datetime || "date"}
              description={event.event_desc}
              ticketPrice={
                event?.tricket_info && event?.tricket_info.length > 0
                  ? event.tricket_info[0].ticket_amount
                  : event?.tricket_info?.ticket_amount
              }
              fromTime={event?.event_schedule?.from_time || ""}
            />
          ))}
        </div>
      </main>

      <EventsPagination
        currentPage={page}
        hasPreviousPage={data?.meta?.current_page[0] > 1}
        hasNextPage={data?.meta?.current_page[0] < data?.meta?.last_page}
        onPreviousPage={handlePreviousPage}
        onNextPage={handleNextPage}
      />
    </section>
  );
};

export default UpcomingEvents;
