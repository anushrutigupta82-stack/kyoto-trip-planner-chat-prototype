const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const parse = (iso: string) => {
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(Date.UTC(y, m - 1, d));
};

/** "11 – 13 Apr 2025" (or "30 Apr – 2 May 2025" across months). */
export function formatRange(checkIn: string, checkOut: string) {
  const a = parse(checkIn);
  const b = parse(checkOut);
  const end = `${b.getUTCDate()} ${MONTHS[b.getUTCMonth()]} ${b.getUTCFullYear()}`;
  if (a.getUTCMonth() === b.getUTCMonth() && a.getUTCFullYear() === b.getUTCFullYear()) {
    return `${a.getUTCDate()} – ${end}`;
  }
  return `${a.getUTCDate()} ${MONTHS[a.getUTCMonth()]} – ${end}`;
}

/** "Fri – Sun · 2 nights" */
export function formatSpan(checkIn: string, checkOut: string) {
  const a = parse(checkIn);
  const b = parse(checkOut);
  const nights = Math.round((b.getTime() - a.getTime()) / 86_400_000);
  return `${DAYS[a.getUTCDay()]} – ${DAYS[b.getUTCDay()]} · ${nights} ${nights === 1 ? "night" : "nights"}`;
}

/** "SAT 12 APR" */
export function formatDayLabel(iso: string) {
  const d = parse(iso);
  return `${DAYS[d.getUTCDay()]} ${d.getUTCDate()} ${MONTHS[d.getUTCMonth()]}`.toUpperCase();
}
