"use client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import EventCard from "./EventCard";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { getAllEventByMonthYear } from "@/api/api";
import ScaleLoader from "react-spinners/ScaleLoader";
import EventsPagination from "@/components/shared/EventsPagination";
import { useTranslations } from "next-intl";

const EventCalender = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedMonth, setSelectedMonth] = useState<string | null>(null);
  const [selectedYear, setSelectedYear] = useState<string | null>(null);

  const {
    isLoading: eventMonthYearLoading,
    error: eventMonthYearError,
    data: eventsByMonthYear,
    refetch,
  } = useQuery({
    queryKey: ["eventCalender", selectedMonth, selectedYear, currentPage],
    queryFn: () =>
      getAllEventByMonthYear(
        `${selectedMonth}/${selectedYear}?page=${currentPage}`
      ),
    enabled: !!(selectedMonth && selectedYear),
  });

  const handleSearch = () => {
    if (selectedMonth && selectedYear) {
      refetch();
    } else {
      // alert("Please select both a month and a year");
    }
  };

  const handleNextPage = () => {
    if (
      eventsByMonthYear?.meta?.current_page[0] <
      eventsByMonthYear?.meta?.last_page
    ) {
      setCurrentPage((prevPage) => prevPage + 1);
      refetch();
    }
  };

  const handlePreviousPage = () => {
    if (eventsByMonthYear?.meta?.current_page[0] > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
      refetch();
    }
  };
  const t=useTranslations("career")
  return (
    <>
      <div className="py-6 container mx-auto">
        <div className="mb-10">
          <p className="text-3xl text-brandPrimary"> {t("Event Calendar")} </p>
        </div>

        <div className="mb-6">
          <div className="flex items-center gap-4">
            <Select onValueChange={(value) => setSelectedMonth(value)}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Month" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="01">{t("January")}</SelectItem>
                <SelectItem value="02">{t("February")}</SelectItem>
                <SelectItem value="03">{t("March")}</SelectItem>
                <SelectItem value="04">{t("April")}</SelectItem>
                <SelectItem value="05">{t("May")}</SelectItem>
                <SelectItem value="06">{t("June")}</SelectItem>
                <SelectItem value="07">{t("July")}</SelectItem>
                <SelectItem value="08">{t("August")}</SelectItem>
                <SelectItem value="09">{t("September")}</SelectItem>
                <SelectItem value="10">{t("October")}</SelectItem>
                <SelectItem value="11">{t("November")}</SelectItem>
                <SelectItem value="12">{t("December")}</SelectItem>
              </SelectContent>
            </Select>

            <Select onValueChange={(value) => setSelectedYear(value)}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Year" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="2024">2024</SelectItem>
                <SelectItem value="2025">2025</SelectItem>
                <SelectItem value="2026">2026</SelectItem>
              </SelectContent>
            </Select>

            <button
              onClick={handleSearch}
              className="bg-success text-white py-2 px-6 rounded-md hover:bg-successHover"
            >
              {t("Search")}
            </button>
          </div>
        </div>

        {eventMonthYearLoading ? (
          <div className="flex items-center justify-center">
            <ScaleLoader color="#421957" height={70} radius={8} width={10} />
          </div>
        ) : (
          <div>
            {eventsByMonthYear &&
            eventsByMonthYear?.data?.events?.length > 0 ? (
              eventsByMonthYear?.data?.events?.map(
                (event: any, index: number) => (
                  <EventCard
                    key={index}
                    id={event.event_pid}
                    location={""}
                    date={event.event_schedule.start_datetime}
                    title={event.event_title}
                  />
                )
              )
            ) : (
              <p>{t("No events found for the selected month and year")}</p>
            )}
            <EventsPagination
              currentPage={currentPage}
              hasPreviousPage={eventsByMonthYear?.meta?.current_page[0] > 1}
              hasNextPage={
                eventsByMonthYear?.meta?.current_page[0] <
                eventsByMonthYear?.meta?.last_page
              }
              onPreviousPage={handlePreviousPage}
              onNextPage={handleNextPage}
            />
          </div>
        )}
      </div>
    </>
  );
};

export default EventCalender;
