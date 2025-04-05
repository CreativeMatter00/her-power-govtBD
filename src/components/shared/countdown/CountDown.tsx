"use client";

import { useTranslations } from "next-intl";
import React, { useEffect, useState } from "react";

interface CountdownProps {
  endDatetime: string; // Event end date-time
}

const Countdown: React.FC<CountdownProps> = ({ endDatetime }) => {
  const t = useTranslations("Events");

  const [timeLeft, setTimeLeft] = useState<{
    days: number;
    hours: number;
    minutes: number;
    ended: boolean;
  }>({
    days: 0,
    hours: 0,
    minutes: 0,
    ended: false,
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      const eventEnd = new Date(endDatetime);
      const timeDiff = eventEnd.getTime() - now.getTime();

      if (timeDiff <= 0) {
        // Event has ended
        setTimeLeft({ days: 0, hours: 0, minutes: 0, ended: true });
        return;
      }

      const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));

      setTimeLeft({ days, hours, minutes, ended: false });
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 60000); // Update every minute

    return () => clearInterval(timer); // Clean up on component unmount
  }, [endDatetime]);

  if (timeLeft.ended) {
    return (
      <div className="mt-8">
        <h1 className="text-dangerPrimary font-bold text-sm">
          {t("Event_has_ended")}
        </h1>
      </div>
    );
  }

  return (
    <div className="mt-8">
      <h1 className="text-dangerPrimary font-bold text-sm">{t("Ends_in")}</h1>
      <div className="flex items-center gap-6 mt-1">
        <div className="flex flex-col gap-2">
          <h1 className="text-sm text-greyPrimary">{t("Days")}</h1>
          <p className="text-2xl font-bold text-dangerPrimary">
            {timeLeft.days}
          </p>
        </div>
        <div className="flex flex-col gap-2">
          <h1 className="text-sm text-greyPrimary">{t("Hours")}</h1>
          <p className="text-2xl font-bold text-dangerPrimary">
            {timeLeft.hours}
          </p>
        </div>
        <div className="flex flex-col gap-2">
          <h1 className="text-sm text-greyPrimary">{t("Minutes")}</h1>
          <p className="text-2xl font-bold text-dangerPrimary">
            {timeLeft.minutes}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Countdown;
