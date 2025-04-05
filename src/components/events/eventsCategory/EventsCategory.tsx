"use client";
import MyEventCard from "../eventComponents/eventCards/MyEventCard";
import { useQuery } from "@tanstack/react-query";
import { getAllEventByCategory } from "@/api/api";
import { useParams } from "next/navigation";
import { useLocale } from "next-intl";
import ScaleLoader from "react-spinners/ScaleLoader";
import { useState, useEffect } from "react";
import EventsPagination from "@/components/shared/EventsPagination";

const EventsCategory = () => {
  const locale = useLocale();
  const params = useParams();
  const id = params.id as string;
  const [apiQuery, setApiQuery] = useState<string>("");
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    if (id === "all") {
      setApiQuery(`frontend/get-all-events?page=${currentPage}`);
    } else {
      setApiQuery(`admin/event-by-category/${id}?page=${currentPage}`);
    }
  }, [id, currentPage]);

  const {
    isLoading: eventsByCategoryLoading,
    error: eventsByCategoryError,
    data: eventsByCategory,
  } = useQuery({
    queryKey: ["eventsByCategory", id, apiQuery],
    queryFn: () => getAllEventByCategory(apiQuery),
    enabled: !!apiQuery,
  });

  // console.log("eventsByCategory", eventsByCategory);

  const handleNextPage = () => {
    if (
      eventsByCategory?.meta?.current_page[0] <
      eventsByCategory?.meta?.last_page
    ) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (eventsByCategory?.meta?.current_page[0] > 1) {
      setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
    }
  };

  if (eventsByCategoryError)
    return (
      <div className="text-center text-xl font-md py-8">
        Something went wrong. Please reload
      </div>
    );

  if (eventsByCategoryLoading)
    return (
      <div className="w-[80%] h-screen flex justify-center items-center">
        <ScaleLoader color="#421957" height={70} radius={8} width={10} />
      </div>
    );

  return (
    <>
      {eventsByCategory?.data?.events?.length === 0 ? (
        <div className="text-center text-xl font-md py-8">
          No events found for this category.
        </div>
      ) : (
        <>
          {eventsByCategory?.data?.events.map(
            (currentEvent: any, index: number) => (
              <MyEventCard
                key={index}
                eventPid={currentEvent?.event_pid}
                thumbnail={currentEvent.thumbnail_file_url || "/event.jpg"}
                eventTitle={currentEvent?.event_title}
                location={currentEvent?.venues?.division_name || ""}
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
            )
          )}
          <EventsPagination
            currentPage={currentPage}
            hasPreviousPage={eventsByCategory?.meta?.current_page[0] > 1}
            hasNextPage={
              eventsByCategory?.meta?.current_page[0] <
              eventsByCategory?.meta?.last_page
            }
            onPreviousPage={handlePreviousPage}
            onNextPage={handleNextPage}
          />
        </>
      )}
    </>
  );
};

export default EventsCategory;
