/**
 * Time utilities for water scheduling
 * All displays in IST (Asia/Kolkata), storage in ISO UTC
 */

const DEFAULT_TZ = process.env.NEXT_PUBLIC_TIMEZONE || "Asia/Kolkata";

/**
 * Get the start and end of today in the configured timezone
 * Returns ISO strings for Appwrite queries
 */
export function todayRange(tz: string = DEFAULT_TZ) {
  const now = new Date();
  
  // Get today's date string in the target timezone
  const dateStr = now.toLocaleDateString("en-CA", { timeZone: tz }); // YYYY-MM-DD format
  
  // Create start of day (00:00:00) in that timezone
  const start = new Date(`${dateStr}T00:00:00`);
  const end = new Date(`${dateStr}T23:59:59.999`);
  
  return {
    start,
    end,
    startISO: start.toISOString(),
    endISO: end.toISOString(),
  };
}

/**
 * Format a date/ISO string to display time (HH:MM)
 */
export function fmtTime(date: Date | string, tz: string = DEFAULT_TZ): string {
  const d = typeof date === "string" ? new Date(date) : date;
  return d.toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
    timeZone: tz,
  });
}

/**
 * Format a date/ISO string to display date (DD MMM)
 */
export function fmtDate(date: Date | string, tz: string = DEFAULT_TZ): string {
  const d = typeof date === "string" ? new Date(date) : date;
  return d.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    timeZone: tz,
  });
}

/**
 * Format a time range (e.g., "10:00 AM – 12:00 PM")
 */
export function fmtTimeRange(
  startAt: Date | string,
  endAt: Date | string,
  tz: string = DEFAULT_TZ
): string {
  return `${fmtTime(startAt, tz)} – ${fmtTime(endAt, tz)}`;
}

/**
 * Convert local time (HH:MM) to ISO string for today
 */
export function localTimeToISO(
  timeStr: string, // "HH:MM" format
  tz: string = DEFAULT_TZ
): string {
  const [hours, minutes] = timeStr.split(":").map(Number);
  const now = new Date();
  const dateStr = now.toLocaleDateString("en-CA", { timeZone: tz });
  
  const local = new Date(`${dateStr}T${timeStr}:00`);
  return local.toISOString();
}

/**
 * Check if a schedule is currently ongoing
 */
export function isOngoing(startAt: string, endAt: string): boolean {
  const now = new Date();
  const start = new Date(startAt);
  const end = new Date(endAt);
  return now >= start && now <= end;
}

/**
 * Check if a schedule is upcoming (hasn't started yet)
 */
export function isUpcoming(startAt: string): boolean {
  return new Date(startAt) > new Date();
}

/**
 * Get relative time string (e.g., "in 2 hours", "30 mins ago")
 */
export function relativeTime(date: Date | string): string {
  const d = typeof date === "string" ? new Date(date) : date;
  const now = new Date();
  const diffMs = d.getTime() - now.getTime();
  const diffMins = Math.round(diffMs / 60000);
  
  if (Math.abs(diffMins) < 1) return "now";
  
  const absMins = Math.abs(diffMins);
  const suffix = diffMins > 0 ? "" : " ago";
  const prefix = diffMins > 0 ? "in " : "";
  
  if (absMins < 60) {
    return `${prefix}${absMins} min${absMins !== 1 ? "s" : ""}${suffix}`;
  }
  
  const hours = Math.round(absMins / 60);
  if (hours < 24) {
    return `${prefix}${hours} hr${hours !== 1 ? "s" : ""}${suffix}`;
  }
  
  const days = Math.round(hours / 24);
  return `${prefix}${days} day${days !== 1 ? "s" : ""}${suffix}`;
}
