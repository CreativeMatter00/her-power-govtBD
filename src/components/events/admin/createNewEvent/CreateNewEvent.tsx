"use client";

import { useForm, FormProvider } from "react-hook-form";
import GeneralInformation from "./generalInformation/GeneralInformation";
import TimeDate from "./timeDate/TimeDate";
import Tags from "./tags/Tags";
import TicketPricing from "./TicketPricing/TicketPricing";
import Location from "./location/Location";
import Publish from "./publish/Publish";
import Notification from "./notification/Notification";
import Schema from "./Schema";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from "react";

const CreateNewEvent = () => {
  const methods = useForm({
    resolver: yupResolver(Schema),
  });
  const { handleSubmit, watch } = methods;

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit((data) => console.log(data))}>
        <section className="basis-full">
          <div className="border-b border-brandLsPrimary pb-3">
            <h1 className="text-3xl text-brandPrimary">Create a new event</h1>
          </div>
          <GeneralInformation />
          <TimeDate />
          <Location />
          <TicketPricing />
          <Notification />
          <Tags />
          <Publish formData={watch()} />
        </section>
      </form>
    </FormProvider>
  );
};

export default CreateNewEvent;
