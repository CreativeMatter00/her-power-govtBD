"use client";

import { useLocale, useTranslations } from "next-intl";
import Link from "next/link";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { FaAngleRight, FaCaretRight } from "react-icons/fa";
import { useQuery } from "@tanstack/react-query";
import { getNews } from "@/api/api";
import PuffLoader from "react-spinners/PuffLoader";

const LatestNews = () => {
  // ? Transtation

  const locale = useLocale();
  const t = useTranslations("Home");

  // ? API Call

  const { isLoading, error, data } = useQuery({
    queryKey: ["LatestNews"],
    queryFn: () => getNews(),
  });

  if (error)
    return (
      <div className="text-center text-xl font-md py-8">
        {t("Something went wrong. Please reload")}
      </div>
    );

  return (
    <div className="bg-white rounded-lg overflow-hidden relative h-fit mb-8">
      <div className="bg-[#9747FF] text-white text-xl px-4 py-2">
        {t("latestNews")}
      </div>

      {isLoading ? (
        <div className=" flex items-center justify-center py-8">
          <PuffLoader color="#421957" size={80} />
        </div>
      ) : (
        <div className="px-5 pt-6 pb-12">
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            plugins={[
              Autoplay({
                delay: 2000,
              }),
            ]}
            orientation="vertical"
            className="w-full"
          >
            <CarouselContent className="-mt-1 h-[200px]">
              {data.map((news: any) => (
                <CarouselItem
                  key={news.news_pid}
                  className="pt-1 basis-1/3 md:basis-1/6"
                >
                  <div className="flex gap-2 mb-2">
                    <p className="pt-[4px]">
                      <FaCaretRight color="#2D0C3E" />
                    </p>
                    <p>
                      {news.news_title} -{" "}
                      {new Date(news.publish_date).toLocaleDateString("en-US")}
                    </p>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            {/* <CarouselPrevious />
					<CarouselNext /> */}
          </Carousel>
        </div>
      )}

      <Link href={`${locale}/latest-news`}>
        <button className="px-4 py-2.5 bg-brandDs text-white absolute bottom-0 right-0 flex items-center gap-4">
          {t("seeAll")} <FaAngleRight size={20} />
        </button>
      </Link>
    </div>
  );
};

export default LatestNews;
