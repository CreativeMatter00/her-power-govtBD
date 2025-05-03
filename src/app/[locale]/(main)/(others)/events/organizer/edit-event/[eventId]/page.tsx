

import EditEvent from "@/components/events/admin/editEvent/EditEvent";
import React from "react";

const Page = ({ params }:{params:{eventId:string}}) => {
  const { eventId } = params;
  
  return (
    <div>
      <EditEvent eventId = {eventId} />
    </div>
  );
};

export default Page;