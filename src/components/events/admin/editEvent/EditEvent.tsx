"use client";

import { useForm, FormProvider } from "react-hook-form";
import GeneralInformation from "./generalInformation/GeneralInformation";
import TimeDate from "./timeDate/TimeDate";
import Tags from "./tags/Tags";
import TicketPricing from "./TicketPricing/TicketPricing";
import Location from "./location/Location";
import Publish from "./publish/Publish";
import Notification from "./notification/Notification";
import EditEventSchema from "./EditEventSchema";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getAllEventsBackendById } from "@/api/api";

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

  const methods = useForm({
    resolver: yupResolver(EditEventSchema)
  });
  const { handleSubmit, watch } = methods;
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
