import BreadCrumbEvents from "@/components/events/BreadCrumbEvents/BreadCrumbEvents";
import EventCalender from "@/components/events/eventCalender/EventCalender";

const page = () => {
  return (
    <div>
      <div className="border-b border-brandLsPrimary">
        <BreadCrumbEvents
          title1="Events"
          link1="events"
          title2="Event Calender"
        />
      </div>

      <div>
        <EventCalender />
      </div>
    </div>
  );
};

export default page;
