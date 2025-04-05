// "use client";
import { DateTimePickerIcon } from "@/components/ui/icon/EventsIcon";
import React from "react";
import ScheduleCard from "./ScheduleCard";
import ScaleLoader from "react-spinners/ScaleLoader";
import { useTranslations } from "next-intl";

// ******************************** SCHEDULE TYPE =============================
// Update this interface to match the schedule structure
interface Schedule {
  schedule_id: number;
  schedule_pid: string;
  event_pid: string;
  start_datetime: string;
  end_datetime: string;
  from_time: string;
  to_time: string;
}

interface Venue {
  venue_id: number;
  venue_pid: string;
  venue_name: string;
  venue_title: string;
  capacity: number;
  venue_address: string;
  ud_serialno: string | null;
  remarks: string | null;
  pid_currdate: string;
  pid_prefix: string;
  cre_date: string;
  cre_by: string | null;
  upd_date: string;
  upd_by: string | null;
  active_status: number;
  unit_no: number;
  per_day_rent: string;
  division_code: string;
  division_name: string;
  bn_division_name: string;
}

// ******************************** PROPS TYPE DEFINITION =========================
interface Props {
  schedules: Schedule | Schedule[];
  venueDetails: Venue;
}

const DateTimeSelection: React.FC<Props> = ({ schedules, venueDetails }) => {
  const t = useTranslations("Events");

  const scheduleArray = Array.isArray(schedules) ? schedules : [schedules];
  // console.log("schedules", schedules);

  const sortedScheduleArray = scheduleArray.sort((a, b) => {
    const dateA = new Date(a.start_datetime);
    const dateB = new Date(b.start_datetime);
    return dateA.getTime() - dateB.getTime(); // Ascending order
  });

  if (!scheduleArray) {
    return <ScaleLoader />;
  }
  return (
    <>
      <section className="my-12">
        {venueDetails?.venue_name && venueDetails.division_name && (
          <>
            {" "}
            <h1 className="text-xl text-link">
              {t("Venue_Name")}:{" "}
              <span className="text-black">{venueDetails?.venue_name}</span>
            </h1>
            <h1 className="text-xl text-link">
              {t("Venue_Location")}:{" "}
              <span className="text-black">{venueDetails?.division_name}</span>
            </h1>
          </>
        )}
        <main className="my-6 border border-brandDs rounded w-fit max-lg:w-full p-4">
          {/* ========================== SELECTED TIME ======================= */}
          <div className="flex items-start gap-2">
            {/* ===================== CALENDAR ICON ========================= */}
            <DateTimePickerIcon />
            {sortedScheduleArray.length > 0 && (
              <h1 className="text-base text-brandPrimary">
                {new Date(
                  sortedScheduleArray[0]?.start_datetime
                ).toLocaleString("en-US", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}{" "}
                {new Date(
                  `1970-01-01T${sortedScheduleArray[0]?.from_time}`
                ).toLocaleString("en-US", {
                  hour: "numeric",
                  minute: "numeric",
                  hour12: true,
                })}{" "}
                -{" "}
                {new Date(
                  sortedScheduleArray[
                    sortedScheduleArray.length - 1
                  ]?.end_datetime
                ).toLocaleString("en-US", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}{" "}
                {new Date(
                  `1970-01-01T${
                    sortedScheduleArray[sortedScheduleArray.length - 1]?.to_time
                  }`
                ).toLocaleString("en-US", {
                  hour: "numeric",
                  minute: "numeric",
                  hour12: true,
                })}
              </h1>
            )}
          </div>

          {/* ====================== SCHEDULE OPTIONS ============================ */}
          <div className="grid grid-cols-3 gap-4">
            {sortedScheduleArray?.map((schedule, index) => (
              <ScheduleCard key={index} schedule={schedule} />
            ))}
          </div>
        </main>
      </section>
    </>
  );
};

export default DateTimeSelection;
