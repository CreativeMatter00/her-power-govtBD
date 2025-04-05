"use client";
import Image from "next/image";
import styles from "@/styles/Events.module.css";
import React from "react";
import PastEventCard from "../../eventComponents/eventCards/PastEventCard";
import { LuArrowRight } from "react-icons/lu";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import ScaleLoader from "react-spinners/ScaleLoader";
import { useQuery } from "@tanstack/react-query";
import { getLimitedPastEvents } from "@/api/api";

//* ========= EVENTS TYPE DEFINITION ==========
interface IEvent {
  thumbnail_file_url: string | null | undefined;
  event_title: string | null | undefined;
  event_schedule: Array<{ start_datetime: string | null | undefined }>;
  venues: Array<{ division_name: string | null | undefined }>;
  event_pid: string;
}

const PastEvents = () => {
  const locale = useLocale();
  const t = useTranslations("Events");
  // * ========== DATA FETCHING ==========
  const {
    isLoading: getPastEventsLoading,
    error: pastEventsError,
    data: pastEvents,
    refetch: pastEventsRefetch,
  } = useQuery({
    queryKey: ["getPastEvents"],
    queryFn: () => getLimitedPastEvents(),
  });

  // console.log(pastEvents?.data);

  if (getPastEventsLoading)
    return (
      <div className="min-h-[600px]">
        <div className="flex items-center justify-center">
          <ScaleLoader color="#421957" height={70} radius={8} width={10} />
        </div>
      </div>
    );

  if (pastEventsError) {
    // console.log("data fetching past event error");
    console.log(pastEventsError);
  }

  return (
    <>
      <section className="my-12">
        {/* ======================= PAST EVENTS HEADING ========================= */}
        <header>
          <div className="flex items-center gap-2">
            {/* ======================= HEADING ICON ====================== */}
            <Image
              src={"/assets/images/events/Icons/pastEvents.png"}
              alt="past events"
              width={31}
              height={31}
            />
            {/* ======================= HEADING TITLE ======================== */}
            <h1 className="font-bold text-xl text-brandDs">{t("PastEvents")}</h1>
          </div>
        </header>

        {/* ======================== PAST EVENTS CONTENT ======================== */}
        <main
          className={`${styles.pastEventsShadow} border border-brandLsPrimary my-4 rounded-md `}
        >
          <div className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-8 ">
              {/* ============================== PAST EVENT CARDS ========================= */}
              {pastEvents?.data?.map((event: IEvent, index: number) => (
                <PastEventCard key={index} event={event} />
              ))}

              {/* =============================== SEE ALL PAST EVENT ============================== */}
              <div className="flex justify-center items-center bg-brandDs rounded-lg text-bgPrimary">
                <Link href={`/${locale}/events/past-events`} className="w-full">
                  <div className="flex items-center gap-2 group w-full cursor-pointer">
                    <h1 className="text-end text-lg font-medium hover:underline underline-offset-2 basis-1/2 ">
                      {t("SeeAll")}
                    </h1>
                    <LuArrowRight className="w-5 h-5 duration-300 ml-0 group-hover:ml-2" />
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </main>
      </section>
    </>
  );
};

export default PastEvents;
