// "use client";
import Image from "next/image";
import styles from "@/styles/Events.module.css";
import { useLocale, useTranslations } from "next-intl";
import Link from "next/link";

// ********************************** FEATURED CARD TYPE DEFINITION ========================
interface FeaturedEventCardProps {
  event_pid: string;
  eventImage: string;
  eventTitle: string;
  eventDate: any;
  eventTime: any;
  eventPlace: any;
  eventPrice: any;
}

const placeholderImg =
  "/assets/images/events/Images/beth-jnr-0h-FN7oByyw-unsplash.png";

const FeaturedAllEventCard: React.FC<FeaturedEventCardProps> = ({
  event_pid,
  eventImage,
  eventTitle,
  eventDate,
  eventTime,
  eventPlace,
  eventPrice,
}) => {
  // ======================= DESTRUCTURING FEATURED EVENT OBJECT =============================
  const locale = useLocale();
  const t=useTranslations("Events");

  return (
    <Link href={`/${locale}/events/event/${event_pid}`}>
      <div
        className={`flex flex-col gap-2  ${styles.cardShadowHover} group cursor-pointer rounded h-full`}
      >
        <div className="relative">
          {/* ========================== CARD IMAGE ========================= */}
          <Image
            src={eventImage || placeholderImg}
            alt={eventTitle}
            width={244}
            height={165}
            className="w-full h-[165px] rounded-md"
          />

          {/* ========================= FAVOURITE & SHARE OPTION ON IMAGE ========================== */}
          <div className="hidden group-hover:block">
            <div className={`flex justify-end absolute top-28 right-6`}>
              <div className="flex items-center gap-3 text-brandPrimary"></div>
            </div>
          </div>
        </div>

        <div
          className={`flex flex-col justify-between gap-2 px-3 h-full break-words`}
        >
          {/* ========================= FEATURED EVENT CARD TITLE ========================= */}
          <div className="flex flex-col gap-2 ">
            <h1 className="text-xl text-brandPrimary font-normal ">
              {eventTitle}
            </h1>
            {/* ========================== DATE & TIME =================================== */}
            <div className="flex items-center gap-2 text-sm text-link font-normal">
              {eventTime.length > 0 && (
                <p>
                  {new Date(eventDate[0]?.start_datetime).toLocaleDateString(
                    "en-GB",
                    {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    }
                  )}
                </p>
              )}

              <p className="bg-link w-1 h-1 rounded"></p>
              <p>
                {new Date(eventTime[0]?.start_datetime).toLocaleTimeString([], {
                  hour: "numeric",
                  minute: "numeric",
                  hour12: true,
                })}
              </p>
            </div>

            {/* ============================= EVENT LOCATION ================================ */}
            <p className="text-base font-normal text-brandPrimary">
              {/* {eventPlace[0]?.division_name} */}
              {eventPlace[0]?.division_name ? (
                <>{eventPlace[0]?.division_name}</>
              ) : (
                <>{t("Virtual Event")}</>
              )}
            </p>
          </div>
          {/* =================================== FREE & PERCENTAGE ======================== */}
          <div className="text-base text-success font-bold mt-4 mb-6">
            {eventPrice.length > 0 ? (
              <p>{t("From")} ৳ {eventPrice[0]?.ticket_amount}</p>
            ) : (
              <p> {t("Free")} </p>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default FeaturedAllEventCard;
