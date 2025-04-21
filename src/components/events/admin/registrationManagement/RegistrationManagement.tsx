"use client";
import { useQuery } from "@tanstack/react-query";
import DownloadOption from "./downloadOption/DownloadOption";
import EventTable from "./eventTable/EventTable";
import Pagination from "./pagination/Pagination";
import RegistrationOverview from "./registrationOverview/RegistrationOverview";
import SearchEvent from "./searchEvent/SearchEvent";
import { getEventsByOrganizer, getOverViewData } from "@/api/api";
import ScaleLoader from "react-spinners/ScaleLoader";
import { useCookies } from "next-client-cookies";
import { useState } from "react";

// ================================ COMPONENT ============================

const RegistrationManagement = () => {
  const cookies = useCookies();
  const organizerId = cookies.get("isOrganizer_pid") || "";
  const userId=cookies.get("user_pid")
  const [searchEvents, setSearchEvents] = useState(null);

  const {
    isLoading,
    error,
    data: eventsByOrganizer,
    refetch,
  } = useQuery({
    queryKey: ["eventsByOrganizer"],
    queryFn: () => getEventsByOrganizer(organizerId),
  });
  const {
    isLoading:overViewLoading,
    error:overViewError,
    data: overViewData,
    refetch:overViewRefetch,
  } = useQuery({
    queryKey: ["overViewData"],
    queryFn: () => getOverViewData(userId as string),
  });

  if (isLoading)
    return (
      <div className="w-screen h-screen flex justify-center items-center">
        <ScaleLoader color="#421957" height={70} radius={8} width={10} />
      </div>
    );
  const handleSearch = (searchTerm: any) => {
    // console.log("search term", searchTerm);
    if (!searchTerm) {
      setSearchEvents(eventsByOrganizer?.data);
      return;
    }

    const filteredEvents = eventsByOrganizer?.data.filter((event: any) =>
      event?.event_title?.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setSearchEvents(filteredEvents);
  };

  return (
    <main className="w-full">
      <h1 className="text-3xl text-brandPrimary">Registration Management</h1>
      <RegistrationOverview overviews={overViewData?.data} />
      <SearchEvent onSearch={handleSearch} /> {/* Pass onSearch handler */}
      <DownloadOption />
      <EventTable allEvents={searchEvents || eventsByOrganizer?.data} />{" "}
      {/* Display filtered or all events */}
    </main>
  );
};

export default RegistrationManagement;
