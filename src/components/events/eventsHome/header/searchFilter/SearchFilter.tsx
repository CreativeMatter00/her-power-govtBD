import { RxCross2 } from "react-icons/rx";
import SearchBar from "./searchBar/SearchBar";
import EventFiltering from "./eventFiltering/EventFiltering";
import RecentPopularSearch from "./recentPopularSearch/RecentPopularSearch";

// ******************************************* Modal **************************************

// ************************************ EVENT FILTERING OPTION TYPE DEFINITION =========================
interface EventFilteringType {
  eventName: string;
}

// ****************************** RECENTLY OR POPULAR SEARCH TOPIC TYPE ***********************
interface SearchesType {
  searchTopic: string;
}

// ******************************** EVENT FILTERING OPTION ITEM ==============================
const filteredEvents: EventFilteringType[] = [
  {
    eventName: "All",
  },
  {
    eventName: "For you",
  },
  {
    eventName: "Online",
  },
  {
    eventName: "Today",
  },
  {
    eventName: "This weekend",
  },
  {
    eventName: "Free",
  },
  {
    eventName: "Hackathon",
  },
  {
    eventName: "Data Innovation",
  },
  {
    eventName: "Digital Marketing Fest",
  },
  {
    eventName: "BCS Mela",
  },
  {
    eventName: "Women Entrepreneur Fair",
  },
  {
    eventName: "Workshops",
  },
  {
    eventName: "Webinars",
  },
  {
    eventName: "Networking Events",
  },
  {
    eventName: "Training Sessions",
  },
  {
    eventName: "Charity Events",
  },
];

// ****************************** RECENTLY OR POPULAR SEARCH TOPIC STATIC DATA ***********************
const allSearches: SearchesType[] = [
  {
    searchTopic: "Technology events 2024",
  },
  {
    searchTopic: "Women entrepreneur",
  },
  {
    searchTopic: "Digital marketing",
  },
  {
    searchTopic: "Ongoing events list",
  },
  {
    searchTopic: "BCS related events",
  },
];

const SearchFilter = () => {
  return (
    <>
      <section className="rounded-lg">
        <div className="p-4 pb-16  border-b-2 border-brandLsPrimary">
          {/* ============================== UPPER RIGHT CROSS BUTTON =========================== */}
          {/* <div className="flex justify-end">
            <button>
              <RxCross2 className="text-brandPrimary w-6 h-6 cursor-pointer" />
            </button>
          </div> */}
          {/* ============================ SEARCH BAR SECTION ================================= */}
          <SearchBar />
          {/* ============================== FILTERING ============================== */}
          <EventFiltering events={filteredEvents} />
        </div>

        {/* ============================ RECENT & POPULAR SEARCH ==================== */}
        <div className="p-4">
          <RecentPopularSearch searches={allSearches} />
        </div>
      </section>
    </>
  );
};

export default SearchFilter;
