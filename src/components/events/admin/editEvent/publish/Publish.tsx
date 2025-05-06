"use client";

import { SubmitHandler, useFormContext } from "react-hook-form";
import axios from "axios";
import { useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import { toast, ToastContainer } from "react-toastify";
// import ScaleLoader from "react-spinners/ScaleLoader";
import { useCookies } from "next-client-cookies";
import { url } from "@/api/api";
import { useRouter } from "next/navigation";
import { useLocale } from "next-intl";

const Publish = ({ eventId, formData }: { eventId: string; formData: any }) => {
  const [isLoading, setIsLoading] = useState(false);
  const cookies = useCookies();
  const organizerPid = cookies.get("isOrganizer_pid");
  const local = useLocale();
  const router = useRouter();

  console.log("Form Data------------->", formData);
  // alert(JSON.stringify(formData));

  const {
    handleSubmit,
    formState: { errors },
  } = useFormContext();

  const safeAppend = (form: FormData, key: string, value: any) => {
    if (value !== undefined && value !== null && value !== "") {
      form.append(key, value);
    }
  };

  const onSubmit: SubmitHandler<any> = async () => {
    const data = formData;
    // console.log("Data------------->", data);
    
    const { multiDateOrNot, singleDateOrNot, breakDownOrNot } = data;
    const formDataObj = new FormData();

    safeAppend(formDataObj, "org_pid", organizerPid);
    safeAppend(formDataObj, "event_title", data?.eventTitle);
    safeAppend(formDataObj, "event_desc", data?.description);
    safeAppend(formDataObj, "category_pid", data?.eventCategory);
    formDataObj.append(
      "featured_event",
      data?.featuredOrNot ? "true" : "false"
    );

    // Venue or virtual event
    if (data?.locationVenue) {
      formDataObj.append("venue_pid", data?.locationVenue);
      formDataObj.append("venue_name", data?.locationVenue);
    } else {
      formDataObj.append("virtual_event", data?.virtualEvent ? "1" : "0");
    }

    safeAppend(formDataObj, "ticket_type", data?.ticket_type);
    formDataObj.append(
      "ticket_amount",
      data?.ticket_type === "P" ? data?.sections?.[0]?.price || "0" : "0"
    );

    safeAppend(formDataObj, "tags", data?.tags);
    safeAppend(formDataObj, "zip_code", data?.locationZip);

    if (singleDateOrNot) {
      formDataObj.append(
        "singleDate",
        JSON.stringify({
          schedule_pid:data.singleDate?.schedule_pid,
          start_datetime: data?.singleDate?.eventStartDate,
          end_datetime: data?.singleDate?.eventEndDate,
          from_time: data?.singleDate?.eventStartTime,
          to_time: data?.singleDate?.eventEndTime,
        })
      );
    }
    if (multiDateOrNot) {
      formDataObj.append(
        "multidate",
        JSON.stringify(
          data?.multiDates?.map((d: any) => ({
            schedule_pid:d?.schedule_pid,
            start_datetime: d?.startDate,
            end_datetime: d?.endDate,
            from_time: d?.startTime,
            to_time: d?.endTime,
          }))
        )
      );
    }
    if (breakDownOrNot) {
      formDataObj.append(
        "breakdown",
        JSON.stringify(
          data?.segments?.map((s: any) => ({
            schedule_pid:s?.schedule_pid,
            segment_name: s?.segmentName,
            speaker_pid: s?.speaker,
            start_datetime: s?.startDate,
            end_datetime: s?.endDate,
            from_time: s?.startTime,
            to_time: s?.endTime,
          }))
        )
      );
    }

    if (data?.tickets?.length) {
      formDataObj.append(
        "tickets",
        JSON.stringify(
          data.tickets.map((ticket: any) => ({
            ticket_amount: ticket?.ticket_price,
            ticket_name: ticket?.ticket_name,
            remarks: ticket?.Facilities,
          }))
        )
      );
    }
    safeAppend(formDataObj, "notification_type", data?.notificationType);
    safeAppend(formDataObj, "notification_schedule", data?.notificationSchedule);
    if (data?.eventBanner && typeof data?.eventBanner !== "string") {
      formDataObj.append("banner", data?.eventBanner);
    }
    if (data?.thumbnail && typeof data?.thumbnail !== "string") {
      formDataObj.append("thumbnail", data?.thumbnail);
    }
    formDataObj.append("remarks", data?.description);
    setIsLoading(true);
    try {
      const response = await axios.post(
        `${url}/api/admin/event/newEvent-update/${eventId}`,
        formDataObj,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response?.data?.meta.status === true) {
        toast.success("Event updated successfully!", {
          position: "bottom-left",
          autoClose: 3000,
        });
        setTimeout(() => {
          router.push(`/${local}/events/organizer`);
        }, 3000);
      } else {
        toast.error("Failed to update event.", {
          position: "bottom-left",
          autoClose: 3000,
        });
      }
    } catch (error) {
      console.error("POST error:", error);
      toast.error("Something went wrong.", {
        position: "bottom-left",
        autoClose: 3000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  // if (isLoading)
  //   return (
  //     <div className="w-screen h-screen bg-red-600 flex justify-center items-center">
  //       <ScaleLoader color="#421957" height={70} radius={8} width={10} />
  //     </div>
  //   );

  return (
    <section className="my-8 p-4">
      <main className="flex flex-col items-center gap-8 w-full">
        <button
          type="button"
          onClick={handleSubmit(onSubmit)}
          className="bg-success hover:bg-successHover rounded-full w-full py-3 text-lg text-bgPrimary font-medium"
        >
          Update
        </button>
      </main>
      <ToastContainer />
    </section>
  );
};

export default Publish;
