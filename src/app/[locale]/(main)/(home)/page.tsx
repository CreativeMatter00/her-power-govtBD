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
        <div
          className="grid gap-4 mt-16"
          style={{ gridTemplateColumns: "1fr 4fr 1fr" }}
        >
          <Ad1 />
          <div>
            <Sections />
            <LatestNews />
          </div>
          <Ad2 />
        </div>
      </div>
    </div>
  );
};

export default page;
