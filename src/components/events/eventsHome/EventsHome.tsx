"use client";

import AllEvents from "./allEvents/AllEvents";
import FeaturedEvents from "./featuredEvents/FeaturedEvents";
import UpcomingEvents from "./upcomingEvents/UpcomingEvents";
import PastEvents from "./pastEvents/PastEvents";
import EventFiltering from "./eventFiltering/EventFiltering";
import Image from "next/image";
import EventSearch from "./header/EventSearch";
import EventCategories from "./eventCategories/EventCategories";
import { useTranslations } from "next-intl";

// ************************************** TYPE DEFINITIONS *********************************

// ================================= EVENT FILTERING OPTION TYPE DEFINITION =========================
interface EventFilteringInfo {
  eventName: string;
  isSelected: boolean;
}

// *************** STATIC DATA (ARRAY OF OBJECTS) *****************

// ================================= EVENT FILTERING OPTION ITEM ==============================
const eventFiltering: EventFilteringInfo[] = [
  {
    eventName: "All",
    isSelected: true,
  },
  {
    eventName: "For you",
    isSelected: false,
  },
  {
    eventName: "Online",
    isSelected: false,
  },
  {
    eventName: "Today",
    isSelected: false,
  },
  {
    eventName: "This weekend",
    isSelected: false,
  },
  {
    eventName: "Free",
    isSelected: false,
  },
  {
    eventName: "Hackathon",
    isSelected: false,
  },
  {
    eventName: "Data Innovation",
    isSelected: false,
  },
  {
    eventName: "Digital Marketing Fest",
    isSelected: false,
  },
  {
    eventName: "BCS Mela",
    isSelected: false,
  },
  {
    eventName: "Women Entrepreneur Fair",
    isSelected: false,
  },
  {
    eventName: "Workshops",
    isSelected: false,
  },
  {
    eventName: "Webinars",
    isSelected: false,
  },
  {
    eventName: "Networking Events",
    isSelected: false,
  },
  {
    eventName: "Training Sessions",
    isSelected: false,
  },
  {
    eventName: "Charity Events",
    isSelected: false,
  },
];
const EventsHome = () => {
  const t=useTranslations("Events");
  return (
    <section>
      <div className="pt-16">
        <div className="h-80 flex mx-auto justify-center">
          <Image
            src={"/assets/images/events/banner.jpg"}
            alt={t("Events Banner")}
            width={1920}
            height={300}
            className="object-cover object-center h-80"
          />
        </div>
      </div>
      {/* ================================= EVENT SEARCH =============================== */}
      {/* <EventSearch /> */}

      {/* ============================ DIFFERENT EVENTS =============================== */}

      <div className="container p-4">
        {/* ============================== UPCOMING EVENTS ========================== */}
        <UpcomingEvents />
      </div>

      {/* ================================== BORDER ============================== */}
      <div className="border-b border-brandLsPrimary w-full my-6"></div>

      {/* ============================ DIFFERENT EVENTS =============================== */}
      <main className="container p-4">
        {/* ========================== FEATURED EVENTS ============================== */}
        <FeaturedEvents />

        {/* ========================== EVENT CATEGORIES =================================== */}
        <EventCategories />

        {/* ========================== PAST EVENTS ================================== */}
        <PastEvents />
      </main>

      {/* ================================== EVENT FILTERING ========================== */}
      {/* ================================== BROWSING EVENTS ============================== */}
      <EventFiltering eventFiltering={eventFiltering} />

      <main className="container p-4">
        {/* ============= SHOW LIMITED ALL EVENTS ON HOME ============== */}
        <AllEvents />
      </main>
    </section>
  );
};

export default EventsHome;
