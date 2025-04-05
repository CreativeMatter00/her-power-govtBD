import { useLocale } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { format } from "date-fns";

//* ========= EVENTS TYPE DEFINITION ==========
interface IEvent {
  thumbnail_file_url: string | null | undefined;
  event_title: string | null | undefined;
  event_schedule: Array<{ start_datetime: string | null | undefined }>;
  venues: Array<{ division_name: string | null | undefined }>;
  event_pid: string;
}
//* ============= PROPS TYPE DEFINITION ============
interface IProps {
  event: IEvent;
}

const PastEventCard: React.FC<IProps> = ({ event }) => {
  const locale = useLocale();
  // console.log(event);

  //* ========== DESTRUCTURING EVENT OBJECT =========
  const { thumbnail_file_url, event_title, event_schedule, venues, event_pid } =
    event;

  // ! ======= FORMATTING EVENT DATE ========
  let formattedDate = "";
  if (event_schedule[0]?.start_datetime) {
    const dateTime = new Date(event_schedule[0].start_datetime);
    formattedDate = format(dateTime, "dd MMMM, yyyy");
  }
  // console.log(formattedDate)

  //! ========== CHECKING VENUES ====
  // if (event.venues) {
  // 	console.log(event.venues);
  // }

  return (
    <Link href={`/${locale}/events/event/${event_pid}`}>
      <div className="relative group overflow-hidden cursor-pointer rounded-lg">
        {/* ======================= CARD IMAGE ==================== */}
        {thumbnail_file_url ? (
          <Image
            src={thumbnail_file_url}
            alt={`${event_title}`}
            width={244}
            height={165}
            className="w-full h-[165px] rounded-md"
          />
        ) : (
          <Image
            src="/assets/images/events/Images/jakob-dalbjorn-cuKJre3nyYc-unsplash.png"
            alt={`${event_title}`}
            width={244}
            height={165}
            className="w-full h-[165px] rounded-md"
          />
        )}
        {/* ============================ GRADIENT ON THE IMAGE =========================== */}
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-brandPrimary  to-transparent opacity-85 rounded-lg">
          {/* ============================= TEXT POSITION ON IMAGE ========================= */}
          <div className="absolute bottom-2 w-full text-bgPrimary max-w-fit p-2">
            {/* ====================== CARD TITLE ====================== */}
            <div className="text-base font-bold truncate break-words">
              {event_title ? <p>{event_title}</p> : <p>Static Title</p>}
            </div>
            {/* ====================== TIME & PLACE ==================== */}
            <div className="flex items-center text-sm font-normal gap-3">
              <div>
                {formattedDate ? <p>{formattedDate}</p> : <p>2 Oct, 2024</p>}
              </div>
              <div className="font-bold">
                {event.venues.length > 0 ? (
                  <p>{venues[0]?.division_name}</p>
                ) : (
                  <p>Virtual Event</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default PastEventCard;
