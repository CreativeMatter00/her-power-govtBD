import MeetPartnerNavbar from "./MeetPartnerNavbar";
import SearchBar from "./SearchBar";

const MeetPartnerHeader = () => {
  return (
    <header className="bg-brandDs fixed z-[9999] w-full">
      {/* ****************************** NAVBAR AND SEARCH BAR *************************** */}
      <main className="container p-4">
        <div className="flex max-md:flex-col justify-between items-center max-md:gap-4">
          {/* =================================== HEADER NAVBAR ======================== */}
          <MeetPartnerNavbar />
          {/* ================================ HEADER SEARCH BAR ====================== */}
          {/* <div className="max-md:basis-full basis-1/2">
              <SearchBar />
            </div> */}
        </div>
      </main>
    </header>
  );
};

export default MeetPartnerHeader;
