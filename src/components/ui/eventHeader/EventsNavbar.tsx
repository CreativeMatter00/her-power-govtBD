"use client";
import { useCookies } from "next-client-cookies";
import { useLocale, useTranslations } from "next-intl";
import Link from "next/link";

const navItems = [
  { navItem: "My Events", link: "events/my-events" },
  { navItem: "Event Calendar", link: "events/event-calendar" },
];

const EventsNavBar = () => {
  const locale = useLocale();
  const cookies = useCookies();
  const isOrganizer = cookies.get("isOrganizer") === "true";
  const userId = cookies.get("user_pid");
  const t = useTranslations("EventsNavbar");
  return (
    <>
      <ul className="flex justify-evenly items-center gap-4 max-md:text-sm text-base text-bgPrimary font-normal h-full">
      <li className="list-none">
            <Link
              href={`/${locale}/events`}
              className="cursor-pointer hover:underline underline-offset-8 decoration-2"
            >
              {t("Home")}
            </Link>
          </li>
        {userId && (
          <li className="list-none">
            <Link
              href={`/${locale}/events/my-events`}
              className="cursor-pointer hover:underline underline-offset-8 decoration-2"
            >
              {t("MyEvents")}
            </Link>
          </li>
        )}

        <li className="list-none">
          <Link
            href={`/${locale}/events/event-calendar`}
            className="cursor-pointer hover:underline underline-offset-8 decoration-2"
          >
            {t("EventCalendar")}
          </Link>
        </li>

        {userId && (
          <>
            {!isOrganizer && (
              <li className="list-none">
                <Link
                  href={`/${locale}/events/profile`}
                  className="cursor-pointer hover:underline underline-offset-8 decoration-2"
                >
                  {t("Profile")}
                </Link>
              </li>
            )}
          </>
        )}
        {isOrganizer ? (
          <li className="list-none">
            <Link
              href={`/${locale}/events/organizer`}
              className="cursor-pointer hover:underline underline-offset-8 decoration-2"
            >
              {t("Organizer")}
            </Link>
          </li>
        ) : (
          <li className="list-none">
            <Link
              href={`/${locale}/events/organizer-registration`}
              className="cursor-pointer hover:underline underline-offset-8 decoration-2"
            >
              
              {t("BecomeAnOrganizer")}
            </Link>
          </li>
        )}
      </ul>
    </>
  );
};

export default EventsNavBar;
