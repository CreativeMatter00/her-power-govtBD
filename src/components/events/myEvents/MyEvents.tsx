"use client";
import { useState } from "react";
import MyEventCard from "../eventComponents/eventCards/MyEventCard";
import EventCard from "@/components/events/eventComponents/eventCards/EventCard";
import { useQuery } from "@tanstack/react-query";
import { getEventsParticipantByUser } from "@/api/api";
import { useCookies } from "next-client-cookies";
import ScaleLoader from "react-spinners/ScaleLoader";
import EventsPagination from "@/components/shared/EventsPagination";
import { useTranslations } from "next-intl";

const MyEvents = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const cookies = useCookies();
  const userId = cookies.get("user_pid");
  const t=useTranslations("Events")
  const {
    isLoading,
    error,
    data: allMyEvents,
  } = useQuery({
    queryKey: ["allMyEvents", currentPage],
    queryFn: () => getEventsParticipantByUser(`${userId}?page=${currentPage}`),
    staleTime: 5000,
  });
  
  const handleNextPage = () => {
    if (allMyEvents?.meta?.current_page[0] < allMyEvents?.meta?.last_page) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (allMyEvents?.meta?.current_page[0] > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  if (isLoading)
    return (
      <div className="w-screen h-screen flex justify-center items-center">
        <ScaleLoader color="#421957" height={70} radius={8} width={10} />
      </div>
    );

  return (
    <>
      <section>
        <div className="border-b border-brandLsPrimary mt-14 mb-4"></div>
        <main className="container p-4">
          {/* ======================== MY CURRENT EVENT CARD ======================== */}
          {allMyEvents?.data?.length > 0 ? (
            <>
              <div>
                <h1 className="text-3xl text-brandPrimary font-normal pt-12">
                  {t("My Events")}
                </h1>

                <div className="mt-4">
                  {allMyEvents?.data?.map((event: any, index: number) => (
                    <MyEventCard
                      key={index}
                      eventPid={event?.event_pid}
                      thumbnail={event.thumbnail_file_url || "/event.jpg"}
                      eventTitle={
                        event?.event_info?.event_title || "Business Policy"
                      }
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
                  ))}
                </div>
              </div>
              <EventsPagination
                currentPage={currentPage}
                hasPreviousPage={allMyEvents?.meta?.current_page[0] > 1}
                hasNextPage={
                  allMyEvents?.meta?.current_page[0] <
                  allMyEvents?.meta?.last_page
                }
                onPreviousPage={handlePreviousPage}
                onNextPage={handleNextPage}
              />
            </>
          ) : (
            <div className="mt-10">
              <h1 className="text-3xl text-brandPrimary font-normal pt-12">
                {t("My Events")}
              </h1>
              <div className="flex justify-center items-center w-full min-h-96">
                <p>{t("No events found")}</p>
              </div>
            </div>
          )}
        </main>
      </section>
    </>
  );
};

export default MyEvents;
