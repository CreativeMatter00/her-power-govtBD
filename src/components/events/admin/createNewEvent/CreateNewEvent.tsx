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

const CreateNewEvent = () => {
  const methods = useForm({
    resolver: yupResolver(Schema),
    defaultValues: {
      virtualEvent: false,
      locationVenue: "",
    },
  });

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit((data) => console.log("Form submitted:", data))}>
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
          <Publish />
        </section>
      </form>
    </FormProvider>
  );
};

export default CreateNewEvent;
