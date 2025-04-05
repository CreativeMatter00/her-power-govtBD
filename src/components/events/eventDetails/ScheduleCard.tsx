"use client";
import React, { useState } from "react";
import { IoMdTime } from "react-icons/io";
import styles from "@/styles/Events.module.css";
import ScaleLoader from "react-spinners/ScaleLoader";

// **************************** SCHEDULE TYPE DEFINITION ****************************
interface Schedule {
  schedule_id: number;
  schedule_pid: string;
  event_pid: string;
  start_datetime: string;
  end_datetime: string;
  from_time: string;
  to_time: string;
}

// **************************** PROPS TYPE DEFINITION *******************************
interface CardProps {
  schedule: Schedule;
}

interface FormattedDateTime {
  formattedDate: string;
  formattedTime: string;
}

const ScheduleCard: React.FC<CardProps> = ({ schedule }) => {
  // console.log(schedule);

  if (!schedule) {
    return <ScaleLoader />;
  }

  // *************************** FORMAT DATE AND TIME UTILITY *************************
  const formatDate = (dateString: string): FormattedDateTime => {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
      return { formattedDate: "Invalid Date", formattedTime: "Invalid Time" };
    }

    const dateOptions: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "short",
      day: "numeric",
      weekday: "long",
    };

    const timeOptions: Intl.DateTimeFormatOptions = {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    };

    const formattedDate = date.toLocaleDateString("en-US", dateOptions);
    const formattedTime = date.toLocaleTimeString("en-US", timeOptions);

    return { formattedDate, formattedTime };
  };

  // Utility to format plain time strings (like 'from_time' and 'to_time')
  const formatTimeString = (timeString: string): string => {
    const [hour, minute] = timeString.split(":").map(Number);
    const date = new Date();
    date.setHours(hour, minute);

    return date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });
  };

  // **************************** FORMAT THE DATES AND TIMES **************************
  const {
    formattedDate: formattedStartDate,
    formattedTime: formattedStartTime,
  } = formatDate(schedule.start_datetime);

  const { formattedDate: formattedEndDate } = formatDate(schedule.end_datetime);

  // Use the plain `from_time` and `to_time` instead of `start_datetime`/`end_datetime`
  const formattedFromTime = formatTimeString(schedule.from_time);
  const formattedToTime = formatTimeString(schedule.to_time);

  // console.log(formattedFromTime); // Logs formatted from_time
  // console.log(formattedToTime); // Logs formatted to_time

  return (
    <div
      className={` border border-brandLsPrimary rounded ${styles.scheduleCardShadow} my-3 px-3 py-1`}
    >
      <div className="flex flex-col items-center justify-center gap-0.5 py-3">
        {/* ======================== FORMATTED DATE ======================= */}
        <p className={`text-base font-bold "text-brandPrimary `}>
          {formattedStartDate}
        </p>

        {/* ======================= TIME RANGE ============================ */}
        <div className="flex items-center gap-2">
          <IoMdTime className={`w-5 h-5  text-greyPrimary `} />
          <p className="text-sm text-greyPrimary">
            {formattedFromTime} - {formattedToTime}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ScheduleCard;
