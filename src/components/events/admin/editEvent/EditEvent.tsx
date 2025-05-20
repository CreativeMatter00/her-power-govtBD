"use client";

import { useForm, FormProvider } from "react-hook-form";
import GeneralInformation from "./generalInformation/GeneralInformation";
import TimeDate from "./timeDate/TimeDate";
import Tags from "./tags/Tags";
import TicketPricing from "./TicketPricing/TicketPricing";
import Location from "./location/Location";
import Publish from "./publish/Publish";
import Notification from "./notification/Notification";
import {EditEventSchema, IEditEvent} from "./EditEventSchema";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getAllEventsBackendById } from "@/api/api";
interface EventFormValues {
  eventTitle: string;
  eventCategory: string;
  description: string;
  featuredOrNot: boolean;
  thumbnail: File | string;
  eventBanner: File | string | null;
  singleDate: any;
}
const EditEvent = ({ eventId }: { eventId: string }) => {
  const {
    isLoading,
    error,
    data: eventData,
    refetch,
  } = useQuery({
    queryKey: ["eventData", eventId],
    queryFn: () => getAllEventsBackendById(eventId),
    enabled: !!eventId,
  });

  const methods = useForm<IEditEvent>({
    mode: "onChange",
    resolver: yupResolver(EditEventSchema),
  });

  const { handleSubmit, watch, getValues, reset } = methods;

  useEffect(() => {
    if (eventData) {
      reset({
        eventTitle: eventData.event_title,
        eventCategory: eventData.category_pid,
        description: eventData?.event_desc || "",
        featuredOrNot: eventData.featchered_event === 1,
        thumbnail: eventData.thumbnail_file_url,
        eventBanner: eventData.banner_file_url || null,
        
      });
    }
  }, [eventData, reset]);
  console.log(getValues())
  return (
    <FormProvider {...methods}>
      <form>
        <section className="basis-full">
          <div className="border-b border-brandLsPrimary pb-3">
            <h1 className="text-3xl text-brandPrimary">
              Update event information
            </h1>
          </div>
          <GeneralInformation eventData={eventData} />
          <TimeDate eventData={eventData} />
          <Location eventData={eventData} />
          <TicketPricing eventData={eventData} />
          <Notification eventData={eventData} />
          <Tags eventData={eventData} />
          <Publish eventId={eventId} formData={watch()} />
        </section>
      </form>
    </FormProvider>
  );
};

export default EditEvent;
