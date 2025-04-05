import { useMemo } from "react";
import { parse, format } from "date-fns";

export const useFormattedTime = (timeString: string | null | undefined): string => {
  const formattedTime = useMemo(() => {
    if (!timeString) {
      return ""; // Handle null or empty strings
    }

    // Parse time string "HH:mm:ss"
    const parsedTime = parse(timeString, "HH:mm:ss", new Date());

    if (isNaN(parsedTime.getTime())) {
      return ""; // Handle invalid time strings
    }

    // Format to "hh:mm a" (e.g., "10:00 AM")
    return format(parsedTime, "hh:mm a");
  }, [timeString]);

  return formattedTime;
};
