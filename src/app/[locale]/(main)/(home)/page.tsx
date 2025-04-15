import Ad1 from "@/components/home/Ad1";
import Ad2 from "@/components/home/Ad2";
import Hero from "@/components/home/Hero";
import LatestNews from "@/components/home/LatestNews";
import Sections from "@/components/home/Sections";

const page = () => {
  return (
    <div className="bg-bgSecondary">
      <Hero />
      <div className="container mx-auto px-4">
        <div className="grid gap-4 mt-4 md:mt-16 grid-cols-1 md:grid-cols-[1fr_4fr_1fr]">
          <div className="hidden md:block">
            <Ad1 />
          </div>
          <div>
            <Sections />
            <LatestNews />
          </div>
          <div className="hidden md:block">
            <Ad2 />
          </div>
        </div>
        <div className="grid gap-4 my-4 grid-cols-2 md:hidden ">
          <Ad1/>
          <Ad2/>
        </div>
      </div>
    </div>
  );
};

export default page;
