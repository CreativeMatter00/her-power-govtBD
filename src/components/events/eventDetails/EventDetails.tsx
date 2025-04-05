import React from "react";
import LocationMap from "./LocationMap";
interface EventDetailsType {
  detailsTopic: string;
  detailsDescription: string;
}

interface Props {
  eventDetails: EventDetailsType[];
}

const EventDetails: React.FC<Props> = ({ eventDetails }) => {
  return (
    <>
      <section className="my-8">
        <h1 className="text-xl text-brandDs">Event details:</h1>
        <ul className="flex flex-col gap-2 ml-4 my-4">
          {eventDetails.map((event, index) => (
            <li key={index} className="list-disc text-brandDs">
              <div className="">
                <span className="text-sm text-greyPrimary font-bold mr-2">
                  {event.detailsTopic}:
                </span>

                <span
                  className={`text-brandPrimary text-base ${event.detailsTopic === "Location" ? "" : ""
                    }`}
                >
                  {event.detailsDescription}
                  {event.detailsTopic === "Location" && (

                    <LocationMap />
                  )}
                </span>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
};

export default EventDetails;
