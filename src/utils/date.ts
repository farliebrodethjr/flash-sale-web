import { parseISO, format, differenceInMilliseconds } from "date-fns";

export function formatAsReadableDate(dateString: string) {
  const dateObj = parseISO(dateString);
  return format(dateObj, "MMMM d, yyyy h:mm a");
}

export function formatSaleDate(dateStr: string): string {
  const d = parseISO(dateStr);

  return format(d, "eee, MMM d, h:mm a");
}

export function isEndingSoon(endDateStr: string): boolean {
  const endDate = parseISO(endDateStr);
  const diff = differenceInMilliseconds(endDate, new Date());
  const twoHours = 2 * 60 * 60 * 1000;

  return diff > 0 && diff <= twoHours;
}
