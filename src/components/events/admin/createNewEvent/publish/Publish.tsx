"use client";

import { useWatch, useFormContext } from "react-hook-form";
import axios from "axios";
import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { useCookies } from "next-client-cookies";
import { api, url } from "@/api/api";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";
import { useLocale } from "next-intl";

const Publish = () => {
  const [isLoading, setIsLoading] = useState(false);
  const cookies = useCookies();
  const organizerPid = cookies.get("isOrganizer_pid");
  const router = useRouter();
  const locale = useLocale();
  const { handleSubmit } = useFormContext();
  const formData = useWatch(); // Always up-to-date

  const onSubmit = async () => {
    const data = formData;
    const formDataObj = new FormData();

    formDataObj.append("org_pid", organizerPid || "");
    formDataObj.append("event_title", data?.eventTitle || "");
    formDataObj.append("event_desc", data?.description || "");
    formDataObj.append("category_pid", data?.eventCategory || "");
    formDataObj.append("featured_event", data?.featuredOrNot ? "true" : "false");

    if (data?.locationVenue) {
      formDataObj.append("venue_pid", data?.locationVenue);
      formDataObj.append("vanue_name", data?.locationVenue); // typo: "vanue" if backend expects it
    } else {
      formDataObj.append("virtual_event", data?.virtualEvent ? "1" : "0");
    }

    formDataObj.append("ticket_type", data?.ticket_type || "");
    formDataObj.append(
      "ticket_amount",
      data?.ticket_type === "P" ? data?.sections?.[0]?.price || 0 : "0"
    );
    formDataObj.append("tags", data?.tags || "");
    formDataObj.append("zip_code", data?.locationZip || "");

    // Date handling
    if (data?.singleDateOrNot) {
      formDataObj.append("singleday", JSON.stringify({
        start_datetime: data?.singleDate?.eventStartDate || "",
        end_datetime: data?.singleDate?.eventEndDate || "",
        from_time: data?.singleDate?.eventStartTime || "",
        to_time: data?.singleDate?.eventEndTime || "",
      }));
    }

    if (data?.multiDateOrNot) {
      formDataObj.append("multidate", JSON.stringify(
        data?.multiDates?.map((d: any) => ({
          start_datetime: d.startDate,
          end_datetime: d.endDate,
          from_time: d.startTime,
          to_time: d.endTime,
        }))
      ));
    }

    if (data?.breakDownOrNot) {
      formDataObj.append("breakdown", JSON.stringify(
        data?.segments?.map((s: any) => ({
          segment_name: s.segmentName || "",
          speaker_pid: s.speaker || "",
          start_datetime: s.startDate || "",
          end_datetime: s.endDate || "",
          from_time: s.startTime || "",
          to_time: s.endTime || "",
        }))
      ));
    }

    if (data?.tickets?.length) {
      formDataObj.append("tickets", JSON.stringify(
        data.tickets.map((ticket: any) => ({
          ticket_amount: ticket?.ticket_price || "0",
          ticket_name: ticket?.ticket_name || "Unnamed Ticket",
          remarks: ticket?.remarks || "unpaid",
        }))
      ));
    }

    formDataObj.append("notification_type", data?.notificationType || "");
    formDataObj.append("notification_schedule", data?.notificationSchedule || "");

    if (data?.eventBanner) formDataObj.append("banner", data?.eventBanner);
    if (data?.thumbnail) formDataObj.append("thumbnail", data?.thumbnail);

    // formDataObj.append("transaction_id", "test");
    formDataObj.append("remarks", data?.remarks || "");

    setIsLoading(true);
    try {
      const response = await api.post(`/api/admin/event/newEvent`, formDataObj, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response?.data?.meta.status) {
        toast.success("Event added successfully!", {
          position: "bottom-left",
          autoClose: 3000,
        });
        setTimeout(() => {
          router.push(`/${locale}/events/organizer`);
        }, 3000);
      } else {
        toast.error("Failed to add event. Please try again.", {
          position: "bottom-left",
          autoClose: 3000,
        });
      }
    } catch (error) {
      console.error("Submission error:", error);
      toast.error("An error occurred. Please try again.", {
        position: "bottom-left",
        autoClose: 3000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="my-8 p-4">
      <main className="flex flex-col items-center gap-8 w-full">
        <button
          type="button"
          onClick={handleSubmit(onSubmit)}
          className="bg-success hover:bg-successHover rounded-full w-full py-3 text-lg text-bgPrimary font-medium"
          disabled={isLoading}
        >
          {isLoading ? "Publishing..." : "Publish Now"}
        </button>
      </main>
      <ToastContainer />
    </section>
  );
};

export default Publish;
