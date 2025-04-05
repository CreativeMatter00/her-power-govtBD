import Image from "next/image";
import { PiMapPinArea } from "react-icons/pi";
import { CiCalendar } from "react-icons/ci";
import { IoMdTime } from "react-icons/io";
import { MyEventsTicketIcon, TKIcon } from "@/components/ui/icon/EventsIcon";
import styles from "@/styles/Events.module.css";
import React from "react";
import { useFormattedDateOrTime } from "@/hooks/useFormattedDateOrTime";
import Link from "next/link";
import { useLocale } from "next-intl";

interface MyEventCardProps {
  eventPid: string;
  thumbnail: string;
  eventTitle?: string;
  location?: string;
  date: string;
  fromTime?: string;
  description?: string;
  ticketPrice?: string | undefined | null;
}

const MyEventCard: React.FC<MyEventCardProps> = ({
	eventPid,
	thumbnail,
	eventTitle,
	location,
	date,
	fromTime,
	description,
	ticketPrice,
}) => {
  const locale = useLocale();
  const eventDate = date ? new Date(date) : null;
  const today = new Date();
  
  const isToday = eventDate?.toDateString() === today.toDateString();
  const isTomorrow = eventDate && 
                      new Date(today.getTime() + 24 * 60 * 60 * 1000).toDateString() === eventDate.toDateString();
  const isPastEvent = eventDate ? eventDate < today : false;

  const eventStatus = isToday
    ? "Today"
    : isTomorrow
    ? "Tomorrow"
    : "Coming Soon";

  return (
    <div
      className={`w-full border border-brandLsPrimary rounded-md ${styles.myEventsCardShadow} p-4 mb-12`}
    >
      <div className="w-full flex items-start gap-8 h-full">
        <div className="basis-2/6">
          <Image
            src={thumbnail}
            alt="event image"
            width={300}
            height={202}
            className="w-full h-52"
          />
        </div>

        <div className="basis-4/6 w-full">
          <div className="border-b border-greyPrimary w-full pb-2">
            <div className="flex flex-col gap-1">
              <div className="flex justify-between items-baseline">
                <h1 className="text-3xl text-brandPrimary font-normal">
                  {eventTitle}
                </h1>
              </div>

              <div className="flex justify-between items-start">
                <div className="flex items-start gap-2">
                  <PiMapPinArea className="w-4 h-5 text-greyPrimary" />
                  <p className="text-sm text-link font-normal">{location}</p>
                </div>
              </div>

              <div className="flex items-center gap-6 text-base text-brandDs">
                <div className="flex items-center gap-1">
                  <CiCalendar className="w-5 h-5 text-greyPrimary" />
                  <p>{eventStatus}</p>
                </div>
                <div className="w-1.5 h-1.5 bg-brandPrimary rounded-full"></div>

                <div className="flex items-center gap-1">
                  <IoMdTime className="w-5 h-5 text-greyPrimary" />
                  <p>{useFormattedDateOrTime(date, "both")}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-7">
            <p
              className="text-base text-brandPrimary line-clamp-1"
              dangerouslySetInnerHTML={{ __html: description || "" }}
            ></p>
          </div>
        </div>
      </div>

      <div className="flex justify-end w-full pl-8 mt-10">
        <div className="basis-4/6 space-y-2">
          {isPastEvent && (
            <p className="text-sm font-bold text-dangerPrimary">
              This event has already ended.
            </p>
          )}
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              <MyEventsTicketIcon />
              <div className={`relative ${ticketPrice ? "bg-[#1E90FF]" : "bg-[#dfbd07]"} flex items-center gap-2`}>
                <p className="absolute bg-bgPrimary h-4 w-4 rounded-full -left-2 overflow-hidden"></p>
                <div className="px-4 text-base text-bgPrimary capitalize">
                  {ticketPrice ? <p>Paid</p> : <p>Free</p>}
                </div>
                <p className="absolute bg-bgPrimary h-4 w-4 rounded-full -right-2 overflow-hidden"></p>
              </div>
              {ticketPrice && (
                <div className="flex items-center gap-2">
                  <TKIcon tkWidth={13} tkHeight={16} />
                  <p className="text-2xl text-success font-normal">{ticketPrice}</p>
                </div>
              )}
            </div>

            <Link
              href={`/${locale}/events/event/${eventPid}`}
              className="text-base text-link cursor-pointer hover:underline"
            >
              View Detail
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyEventCard;
