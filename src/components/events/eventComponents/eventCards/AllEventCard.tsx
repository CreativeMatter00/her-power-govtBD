import Image from "next/image";
import React from "react";
import styles from "@/styles/Events.module.css";
import { useLocale, useTranslations } from "next-intl";
import Link from "next/link";
import { format } from "date-fns";

//* ============ EVENT TYPE DEFINITION ===========
interface IAllEvent {
  event_pid: string;
  thumbnail_file_url: string | null | undefined;
  event_title: string | null | undefined;
  event_schedule: Array<{ start_datetime: string | null | undefined }>;
  venues: Array<{ division_name: string | null | undefined }>;
  tricket_info: Array<{ ticket_amount: number | null | undefined }>;
}

//* ============= PROPS TYPE DEFINITION ============
interface IProps {
  event: IAllEvent;
}

const AllEventCard: React.FC<IProps> = ({ event }) => {


  //* ============= DESTRUCTURING FEATURED EVENT OBJECT ===============
  const locale = useLocale();
  const t = useTranslations("Events");
  const {
    event_pid,
    thumbnail_file_url,
    event_title,
    event_schedule,
    venues,
    tricket_info,
  } = event;

  let formattedDate = "";
  let formattedTime = "";

  if (event_schedule[0]?.start_datetime) {
    const dateTime = new Date(event_schedule[0].start_datetime);
    formattedDate = format(dateTime, "d MMMM, yyyy");
    formattedTime = format(dateTime, "hh:mm a");
  }

  return (
    <Link href={`/${locale}/events/event/${event_pid}`}>
      <div
        className={`flex flex-col gap-2 ${styles.cardShadowHover} group cursor-pointer rounded h-full`}
      >
        <div className="relative">
          {/* //*====== CARD IMAGE ========== */}
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

          {/* //!========= FAVOURITE & SHARE OPTION ON IMAGE ============ */}
          <div className="hidden group-hover:block">
            <div className={`flex justify-end absolute top-28 right-6`}>
              <div className="flex items-center gap-3 text-brandPrimary "></div>
            </div>
          </div>
        </div>

        <div
          className={`flex flex-col justify-between gap-2 px-3 h-full break-words`}
        >
          {/* ========================= FEATURED EVENT CARD TITLE ========================= */}
          <div className="flex flex-col gap-2 ">
            <h1 className="text-xl text-brandPrimary font-normal ">
              {event_title}
            </h1>
            {/* ========================== DATE & TIME =================================== */}
            <div className="flex items-center gap-2 text-sm text-link font-normal">
              {event_schedule[0]?.start_datetime ? (
                <>
                  <p className="">{formattedDate}</p>
                  <p className="bg-link w-1 h-1 rounded "></p>
                  <p className="">{formattedTime}</p>
                </>
              ) : (
                <>
                  <p className="">2 Oct, 2024</p>
                  <p className="bg-link w-1 h-1 rounded "></p>
                  <p className="">8:00 pm</p>
                </>
              )}
            </div>
            {/* ============================= EVENT LOCATION ================================ */}
            <div className="text-base font-normal text-brandPrimary">
              {venues.length > 0 ? (
                <p>{venues[0]?.division_name}, {t("Bangladesh")}</p>
              ) : (
                <p>{t("Bangladesh")}</p>
              )}
            </div>
          </div>
          {/* =================================== FREE & PERCENTAGE ======================== */}
          <p className="text-base text-success font-bold mt-4 mb-6">
            {tricket_info !== null ? (
              <>
                {tricket_info[0]?.ticket_amount === null ||
                tricket_info[0]?.ticket_amount === 0 ||
                tricket_info[0]?.ticket_amount === undefined ? (
                  <p>{t("Free")}</p>
                ) : (
                  <p>{t("From")} ৳ {tricket_info[0]?.ticket_amount}</p>
                )}
              </>
            ) : (
              <p>{t("Free")}</p>
            )}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default AllEventCard;
