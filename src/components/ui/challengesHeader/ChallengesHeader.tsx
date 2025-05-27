import ChallengesNavbar from "./ChallengesNavbar";



const ChallengesHeader = () => {
  return (
    <header className="bg-brandDs fixed z-[9999] w-full">
      {/* ****************************** NAVBAR AND SEARCH BAR *************************** */}
      <main className="container p-4">
        <div className="flex flex-wrap max-md:flex-col justify-between items-center gap-2 max-md:gap-4">
          {/* =================================== HEADER NAVBAR ======================== */}
          <ChallengesNavbar/>
        </div>
      </main>
    </header>
  );
};

export default ChallengesHeader;
