import { format, parse } from "date-fns";
import { useMemo } from "react";

export const useFormattedDateOrTime = (
  dateString: string | null,
  type: "date" | "time" | "both"
): string => {
  const formattedValue = useMemo(() => {
    if (!dateString) {
      return "";
    }

    const date = parse(dateString, "yyyy-MM-dd HH:mm:ss", new Date());

    if (isNaN(date.getTime())) {
      return "";
    }

    if (type === "date") {
      return format(date, "dd MMM yyyy");
    } else if (type === "time") {
      return format(date, "hh:mm a");
    } else if (type === "both") {
      const formattedDate = format(date, "dd MMM yyyy");
      const formattedTime = format(date, "hh:mm a");
      return `${formattedDate}, ${formattedTime}`;
    }

    return "";
  }, [dateString, type]);

  return formattedValue;
};
