"use client";

import Link from "next/link";
import UpcomingEventCard from "../../eventComponents/eventCards/UpcomingEventCard";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { IoMdArrowForward } from "react-icons/io";
import { useLocale, useTranslations } from "next-intl";
import { useQuery } from "@tanstack/react-query";
import ScaleLoader from "react-spinners/ScaleLoader";
import { getLimitedUpcomingEvents } from "@/api/api";

// *=========== UPCOMING TYPE DEFINITION ===========
interface IUpcomingEvent {
  banner_file_url: string;
  event_title: string;
  event_schedule: Array<{ start_datetime: string }>;
  venues: Array<{ division_name: string }>;
  event_desc: string;
  event_pid: string;
}

const UpcomingEvents = () => {
  const locale = useLocale();
  const t = useTranslations("Events");
  // =========== DATA FETCHING =========

  const {
    isLoading: upcomingEventsLoading,
    error: upcomingEventsError,
    data: upcomingEvents,
  } = useQuery({
    queryKey: ["getUpcomingEvents"],
    queryFn: () => getLimitedUpcomingEvents(),
  });

  // console.log("upcomingEvents", upcomingEvents?.data);

  if (upcomingEventsLoading)
    return (
      <div className="w-screen h-screen flex justify-center items-center">
        <ScaleLoader color="#421957" height={70} radius={8} width={10} />
      </div>
    );

  if (upcomingEventsError) {
    console.log("data fetching past event error");
  }

  return (
    <>
      <section className="mt-6">
        <h1 className="text-brandDs text-3xl font-normal">{t("FeaturedEvents")}</h1>

        {/* ======================= UPCOMING EVENT SLIDER ======================== */}

        <div>
          <Carousel
            opts={{
              align: "start",
            }}
            className="w-full"
          >
            <CarouselContent className="pt-8">
              {upcomingEvents?.data?.map(
                (event: IUpcomingEvent, index: number) => (
                  <CarouselItem key={index} className="basis-full md:basis-1/2">
                    <div>
                      <UpcomingEventCard key={index} event={event} />
                    </div>
                  </CarouselItem>
                )
              )}
            </CarouselContent>
            <CarouselPrevious className="top-0 left-full -translate-x-20 rounded-none" />
            <CarouselNext className="top-0 right-0 rounded-none" />
          </Carousel>
          {/* =============================   SEE ALL ======================== */}
          <div className="flex justify-end mt-6">
            <Link href={`/${locale}/events/upcoming-events`}>
              <div className="flex items-center gap-2 text-brandPrimary cursor-pointer group ">
                <p className="text-base hover:underline underline-offset-2">
                  {t("SeeAll")}
                </p>
                <IoMdArrowForward className="w-5 h-5" />
              </div>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default UpcomingEvents;
