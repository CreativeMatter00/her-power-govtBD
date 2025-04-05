"use client";
import { useQuery } from "@tanstack/react-query";
import DownloadOption from "./downloadOption/DownloadOption";
import EventTable from "./eventTable/EventTable";
import Pagination from "./pagination/Pagination";
import RegistrationOverview from "./registrationOverview/RegistrationOverview";
import SearchEvent from "./searchEvent/SearchEvent";
import { getEventsByOrganizer } from "@/api/api";
import ScaleLoader from "react-spinners/ScaleLoader";
import { useCookies } from "next-client-cookies";
import { useState } from "react";

// ================================= TYPE DEFINITION ===========================
type TOverviewInfo = {
  title: string;
  total: number;
};

// =========================== STATIC DATA ==================
const overviews: TOverviewInfo[] = [
  {
    title: "Total Registrations",
    total: 334,
  },
  {
    title: "Registrations Today",
    total: 27,
  },
  {
    title: "Scheduled Events",
    total: 7,
  },
];

// ================================ COMPONENT ============================

const RegistrationManagement = () => {
  const cookies = useCookies();
  const organizerId = cookies.get("isOrganizer_pid") || "";
  const [searchEvents, setSearchEvents] = useState(null); // Store filtered events

  const {
    isLoading,
    error,
    data: eventsByOrganizer,
    refetch,
  } = useQuery({
    queryKey: ["eventsByOrganizer"],
    queryFn: () => getEventsByOrganizer(organizerId),
  });

  if (isLoading)
    return (
      <div className="w-screen h-screen flex justify-center items-center">
        <ScaleLoader color="#421957" height={70} radius={8} width={10} />
      </div>
    );

  // if (error)
  //   return (
  //     <div className="text-center text-xl font-md py-8">
  //       Something went wrong. Please reload
  //     </div>
  //   );

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
      <RegistrationOverview overviews={overviews} />
      <SearchEvent onSearch={handleSearch} /> {/* Pass onSearch handler */}
      <DownloadOption />
      <EventTable allEvents={searchEvents || eventsByOrganizer?.data} />{" "}
      {/* Display filtered or all events */}
    </main>
  );
};

export default RegistrationManagement;
