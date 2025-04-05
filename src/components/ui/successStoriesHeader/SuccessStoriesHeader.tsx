import SuccessStoriesNavbar from "./SuccessStoriesNavbar";


const SuccessStoriesHeader = () => {
  return (
    <header className="bg-brandDs fixed z-[9999] w-full">
      {/* ****************************** NAVBAR AND SEARCH BAR *************************** */}
      <main className="container p-4">
        <div className="flex max-md:flex-col justify-between items-center max-md:gap-4">
          {/* =================================== HEADER NAVBAR ======================== */}
          <SuccessStoriesNavbar/>
        </div>
      </main>
    </header>
  );
};

export default SuccessStoriesHeader;
