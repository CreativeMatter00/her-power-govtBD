"use client";

import styles from "@/styles/Events.module.css";
import DatePicker from "../inputFields/DatePicker";
import EventTimePicker from "../inputFields/EventTimePicker";
import { SubmitHandler, useFormContext } from "react-hook-form"; // Use useFormContext
import axios from "axios";
import { useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import { toast, ToastContainer } from "react-toastify";
import ScaleLoader from "react-spinners/ScaleLoader";
import { useCookies } from "next-client-cookies";
import { url } from "@/api/api";
import { useRouter } from "next/navigation";
import { useLocale } from "next-intl";

const Publish = ({ formData }: { formData: any }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const cookies = useCookies();
  const organizerPid = cookies.get("isOrganizer_pid");
  const local = useLocale();
  const router = useRouter();

  // Use useFormContext to access form methods
  const {
    handleSubmit,
    formState: { errors },
  } = useFormContext();

  const onSubmit: SubmitHandler<any> = async () => {
    const data = formData;
    const { multiDateOrNot, singleDateOrNot, breakDownOrNot } = data;

    const formDataObj = new FormData();

    formDataObj.append("org_pid", organizerPid || "");
    formDataObj.append("event_title", data?.eventTitle || "");
    formDataObj.append("event_desc", data?.description || "");
    formDataObj.append("category_pid", data?.eventCategory || "");
    formDataObj.append(
      "featured_event",
      data?.featuredOrNot ? "true" : "false"
    );

    // Append venue_pid
    const venueId = data?.locationVenue;
    formDataObj.append("venue_pid", venueId || ""); // Append venue_pid, or empty if not present
    formDataObj.append("vanue_name", venueId || ""); // Append venue_pid, or empty if not present

    // Append virtual_event only if venue_pid is not present
    if (!venueId) {
      formDataObj.append(
        "virtual_event",
        data?.virtualEvent === true ? "1" : "0"
      );
    }

    formDataObj.append("ticket_type", data?.ticket_type || "");
    formDataObj.append(
      "ticket_amount",
      data?.ticket_type === "P" ? data?.sections?.[0]?.price || 0 : "0"
    );
    formDataObj.append("tags", data?.tags || "");
    formDataObj.append("zip_code", data?.locationZip || "");

    // Handle single-day event
    if (singleDateOrNot) {
      formDataObj.append(
        "singleday",
        JSON.stringify({
          start_datetime: data?.singleDate?.eventStartDate || "",
          end_datetime: data?.singleDate?.eventEndDate || "",
          from_time: data?.singleDate?.eventStartTime || "",
          to_time: data?.singleDate?.eventEndTime || "",
        })
      );
    }

    // Handle multi-date event
    if (multiDateOrNot) {
      formDataObj.append(
        "multidate",
        JSON.stringify(
          data?.multiDates?.map((multiDate: any) => ({
            start_datetime: multiDate?.startDate || "",
            end_datetime: multiDate?.endDate || "",
            from_time: multiDate?.startTime || "",
            to_time: multiDate?.endTime || "",
          }))
        )
      );
    }

    // Handle breakdown segments
    if (breakDownOrNot) {
      formDataObj.append(
        "breakdown",
        JSON.stringify(
          data?.segments?.map((segment: any) => ({
            segment_name: segment?.segmentName || "",
            speaker_pid: segment?.speaker || "",
            start_datetime: segment?.startDate || "",
            end_datetime: segment?.endDate || "",
            from_time: segment?.startTime || "",
            to_time: segment?.endTime || "",
          }))
        )
      );
    }

    // Handle ticket details
    if (data?.tickets?.length) {
      formDataObj.append(
        "tickets",
        JSON.stringify(
          data?.tickets?.map((ticket: any) => ({
            ticket_amount: ticket?.ticket_price || "0",
            ticket_name: ticket?.ticket_name || "Unnamed Ticket",
            remarks: ticket?.remarks || "unpaid",
          }))
        )
      );
    }

    // Append notification and media data
    formDataObj.append("notification_type", data?.notificationType || "");
    formDataObj.append(
      "notification_schedule",
      data?.notificationSchedule || ""
    );
    if (data?.eventBanner) {
      formDataObj.append("banner", data?.eventBanner); // Ensure `eventBanner` is a File object
    }
    if (data?.thumbnail) {
      formDataObj.append("thumbnail", data?.thumbnail); // Ensure `thumbnail` is a File object
    }

    // Add transaction and remarks
    formDataObj.append("transaction_id", "test");
    formDataObj.append("remarks", "test");

    setIsLoading(true);
    try {
      const response = await axios.post(
        `${url}/api/admin/event/newEvent`,
        formDataObj,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (response?.data?.meta.status === true) {
        toast.success("Event added successfully!", {
          position: "bottom-left",
          autoClose: 3000,
        });
        setTimeout(() => {
          router.push(`/${local}/events/organizer`);
        }, 3000);
      } else {
        toast.error("Failed to add event. Please try again.", {
          position: "bottom-left",
          autoClose: 3000,
        });
      }
    } catch (error) {
      console.error("Error adding event:", error);
      toast.error("An error occurred. Please try again.", {
        position: "bottom-left",
        autoClose: 3000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading)
    return (
      <div className="w-screen h-screen flex justify-center items-center">
        <ScaleLoader color="#421957" height={70} radius={8} width={10} />
      </div>
    );

  return (
    <section className={`my-8 p-4`}>
      <main className="flex flex-col items-center gap-8 w-full">
        <button
          onClick={handleSubmit(onSubmit)} // Use handleSubmit from useFormContext
          className="bg-success hover:bg-successHover rounded-full w-full py-3 text-lg text-bgPrimary font-medium"
        >
          Publish Now
        </button>
      </main>
      <ToastContainer />
    </section>
  );
};

export default Publish;