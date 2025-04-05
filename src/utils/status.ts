export const statusColors: Record<number, string> = {
  0: "text-red-500", // CANCELLED (Red)
  1: "text-orange-500", // PENDING (Orange)
  2: "text-blue-500", // PROCESSING (Blue)
  3: "text-green-500", // DELIVERED (Green)
};

export const statusLabels: Record<number, string> = {
  0: "CANCELLED",
  1: "PENDING",
  2: "PROCESSING",
  3: "DELIVERED",
};
