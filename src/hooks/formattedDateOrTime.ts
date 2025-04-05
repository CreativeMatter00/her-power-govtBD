// Remove useMemo and turn it into a regular function
import { format, parse } from "date-fns";

// Convert hook to regular utility function
export const formattedDateOrTime = (
  dateString: string | null,
  type: "date" | "time" | "both"
): string => {
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
};
