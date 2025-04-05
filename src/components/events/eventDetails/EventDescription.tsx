import React from "react";
import LocationMap from "./LocationMap";

// ************************** PROPS TYPE DEFINITION ====================
interface Props {
  eventDetails: any;
}

const EventDescription: React.FC<Props> = ({ eventDetails }) => {
  // console.log("eventDetails", eventDetails);

  return (
    <>
      <section className="my-8">
        <h1 className="text-xl text-brandDs">Event details:</h1>
        <div
          contentEditable="true"
          dangerouslySetInnerHTML={{ __html: eventDetails || "" }}
        ></div>
      </section>
    </>
  );
};

export default EventDescription;
