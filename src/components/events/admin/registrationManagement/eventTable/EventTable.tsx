import { Dialog, DialogContent } from "@/components/ui/dialog";
import { formattedDateOrTime } from "@/hooks/formattedDateOrTime";
import { useLocale } from "next-intl";
import Link from "next/link";
import React, { useState } from "react";
import ParticipantList from "./ParticipantList";

interface TEventInfo {
  event_pid: string;
  event_title: string;
  start_datetime: string;
  status: string;
  total_register: number;
  division_code?: string;
}

// Array structure for the entire dataset
type IProps = {
  allEvents: TEventInfo[];
};

const EventTable: React.FC<IProps> = ({ allEvents }) => {
  const locale = useLocale();
  const [view, setView] = useState<boolean>();
  const [selectedEvent, setSelectedEvent] = useState<string>();
  const [selectedEventName, setSelectedEventName] = useState<string>();
  // console.log("all events", allEvents);

  const handleClick = (event_pid: string, title: string) => {
    // console.log("title", title);
    setSelectedEvent(event_pid);
    setSelectedEventName(title);
    setView(true);
  };
  return (
    <>
      <section className="w-full my-8">
        <table className="w-full table-auto">
          {/* =========================== COLUMN NAMES =================================== */}
          <thead>
            <tr className="text-base text-greyPrimary font-normal">
              <th className="text-start">SL no.</th>
              <th className="text-start">Event Title</th>
              {/* <th className="text-start">Members</th> */}
              <th className="text-start">Event Date</th>
              <th className="text-start">Status</th>
              <th className="text-start">Action</th>
            </tr>
          </thead>

          {/* ==================================== CONTENT ================================ */}
          <tbody>
            {allEvents?.map((event: TEventInfo, index: number) => (
              <tr
                key={index}
                className="border-t border-[##DDDDDD] text-brandPrimary py-3"
              >
                {/* ------------------------------ INDEX ------------ */}
                <td className="py-3">{index + 1}</td>
                {/* ------------------------------ TITLE ------------------------ */}
                <td className="py-3">{event.event_title}</td>
                {/* -------------------------- TOTAL MEMBERS ---------------- */}
                {/* <td className="py-3">{event.totalMembers}</td> */}
                {/* ------------------------------------ DATE ------------------ */}
                <td className="py-3">
                  {formattedDateOrTime(event.start_datetime, "date")}
                </td>
                {/* -------------------------------- STATUS ---------------------------- */}
                <td
                  className={`py-3 ${
                    event.status === "Past"
                      ? "text-dangerPrimary"
                      : event.status === "Today"
                      ? "text-success"
                      : "text-warning"
                  }`}
                >
                  {event.status}
                </td>
                {/* -------------------------- LINKS --------------------------- */}
                <td className="py-3 text-link text-base">
                  <Link href={`/${locale}/events/event/${event.event_pid}`}>
                    <p className="hover:underline underline-offset-2 ">
                      View event
                    </p>
                  </Link>
                  <p
                    onClick={() =>
                      handleClick(event.event_pid, event.event_title)
                    }
                    className="cursor-pointer hover:underline underline-offset-2 "
                  >
                    View member list
                  </p>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {selectedEvent && (
          <Dialog open={view} onOpenChange={setView}>
            <DialogContent className="bg-white w-[80vw]">
              <ParticipantList
                eventId={selectedEvent}
                title={selectedEventName}
              />
            </DialogContent>
          </Dialog>
        )}
      </section>
    </>
  );
};

export default EventTable;
