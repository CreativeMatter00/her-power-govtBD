"use client";

import { usePathname } from "next/navigation";
import BreadCrumbEvents from "../../BreadCrumbEvents/BreadCrumbEvents";
import Banner from "../Banner";
import EventSummary from "../EventSummary";
import DateTimeSelection from "../DateTimeSelection";
import { useQuery } from "@tanstack/react-query";
import { getAllEventsBackendById } from "../../../../api/api";
import ScaleLoader from "react-spinners/ScaleLoader";
import EventDescription from "../EventDescription";
import { useCookies } from "next-client-cookies";
import { useState, useEffect } from "react";
interface EventsInfo {
  eventImage: string;
  eventTitle: string;
  eventDate: string;
  eventTime: string;
  eventPlace: string;
  eventPrice: string;
}

const EventDetails = () => {
  const cookies = useCookies();
  const pathName = usePathname().toString();
  const lastSegment: string = decodeURIComponent(
    pathName.split("/").pop() || ""
  );
  const [query, setQuery] = useState<string>("");

  useEffect(() => {
    const userId = cookies.get("user_pid");
    if (userId) {
      setQuery(`${lastSegment}/${userId}`);
    } else {
      setQuery(lastSegment);
    }
  }, [lastSegment, cookies]);

  const {
    isLoading,
    error,
    data: eventsById,
    refetch,
  } = useQuery({
    queryKey: ["eventsById", query],
    queryFn: () => getAllEventsBackendById(query),
    enabled: !!query,
  });

  // console.log("events details", eventsById);

  if (isLoading)
    return (
      <div className="w-screen h-screen flex justify-center items-center">
        <ScaleLoader color="#421957" height={70} radius={8} width={10} />
      </div>
    );

  return (
    <div className="container p-4">
      <div className="pt-16">
        <BreadCrumbEvents
          title1="Events"
          link1="events"
          title2={eventsById?.event_title}
        />
      </div>
      <section className="border-t border-brandLsPrimary mb-4">
        <main className="container p-4">
          {/* banner */}
          <Banner bannerEventInfo={eventsById} />
          {/* even summary  */}
          <EventSummary eventSummary={eventsById} refetch={refetch} />
          {/* event time and selection */}
          <DateTimeSelection
            schedules={eventsById?.event_schedule}
            venueDetails={eventsById?.venues}
          />
          {/* description */}
          <EventDescription eventDetails={eventsById?.event_desc} />
          <br />
        </main>
      </section>
    </div>
  );
};

export default EventDetails;
