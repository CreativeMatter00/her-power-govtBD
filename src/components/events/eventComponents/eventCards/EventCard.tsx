// "use client";
import Image from "next/image";
import { PiHeartThin } from "react-icons/pi";
import { PiShareNetworkThin } from "react-icons/pi";
import styles from "@/styles/Events.module.css";
import Link from "next/link";
import { useLocale } from "next-intl";

// ********************************** FEATURED CARD TYPE DEFINITION ========================
interface FeaturedEventInfo {
  eventImage: string;
  eventTitle: string;
  eventDate: string;
  eventTime: string;
  eventPlace: string;
  eventPrice: string;
}

// ****************************** PROPS TYPE DEFINITION ==============================
interface CardProps {
  event: FeaturedEventInfo;
}

const EventCard: React.FC<CardProps> = ({ event }) => {
  const locale = useLocale();
  // console.log(event);
  // ======================= DESTRUCTURING FEATURED EVENT OBJECT =============================
  const {
    eventImage,
    eventTitle,
    eventDate,
    eventTime,
    eventPlace,
    eventPrice,
  } = event;

  return (
    <Link href={`/${locale}/events/event/${eventTitle}`}>
      <div
        className={`flex flex-col gap-2  ${styles.cardShadowHover} group cursor-pointer rounded h-full`}
      >
        <div className="relative">
          {/* ========================== CARD IMAGE ========================= */}
          <Image
            src={eventImage}
            alt={`${eventTitle}`}
            width={244}
            height={165}
            className="w-full h-[165px] rounded-md"
          />

          {/* ========================= FAVOURITE & SHARE OPTION ON IMAGE ========================== */}
          <div className="hidden group-hover:block">
            <div className={`flex justify-end absolute top-28 right-6`}>
              <div className="flex items-center gap-3 text-brandPrimary ">
                {/* =======================  ADD TO FAVOURITE LIST ============================ */}
                <div className="bg-brandLsSecondary p-1.5 rounded-full hover:bg-brandDs hover:text-brandLsSecondary">
                  <PiHeartThin className="w-6 h-6" />
                </div>
                {/* ======================== SHARE FEATURED EVENT ============================ */}
                <div className="bg-brandLsSecondary p-1.5 rounded-full hover:bg-brandDs hover:text-brandLsSecondary">
                  <PiShareNetworkThin className="w-6 h-6" />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div
          className={`flex flex-col justify-between gap-2 px-3 h-full break-words `}
        >
          {/* ========================= FEATURED EVENT CARD TITLE ========================= */}
          <div className="flex flex-col gap-2 ">
            <h1 className="text-xl text-brandPrimary font-normal ">
              {eventTitle}
            </h1>
            {/* ========================== DATE & TIME =================================== */}
            <div className="flex items-center gap-2 text-sm text-link font-normal">
              <p>{eventDate}</p>
              <p className="bg-link w-1 h-1 rounded "></p>
              <p>{eventTime}</p>
            </div>
            {/* ============================= EVENT LOCATION ================================ */}
            <p className="text-base font-normal text-brandPrimary">
              {eventPlace}
            </p>
          </div>
          {/* =================================== FREE & PERCENTAGE ======================== */}
          <p className="text-base text-success font-bold mt-4 mb-6">
            {eventPrice}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default EventCard;
