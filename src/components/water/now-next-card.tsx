"use client";

import { fmtTimeRange, relativeTime } from "@/lib/time";
import { Schedule } from "@/types/water";

interface NowNextCardProps {
  lineName: string;
  lineColor?: string;
  now?: Schedule;
  next?: Schedule;
}

export function NowNextCard({
  lineName,
  lineColor,
  now,
  next,
}: NowNextCardProps) {
  return (
    <div className="rounded-xl border bg-card p-4 shadow-sm">
      {/* Line Header */}
      <div className="flex items-center gap-2 mb-3">
        <div
          className="w-3 h-3 rounded-full"
          style={{ backgroundColor: lineColor || "#3b82f6" }}
        />
        <h3 className="font-semibold text-lg">{lineName}</h3>
      </div>

      {/* Now Section */}
      <div className="mb-3">
        <div className="text-xs uppercase text-muted-foreground font-medium mb-1">
          Now
        </div>
        {now ? (
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            <span className="text-green-600 dark:text-green-400 font-medium">
              {fmtTimeRange(now.startAt, now.endAt)}
            </span>
          </div>
        ) : (
          <span className="text-muted-foreground">—</span>
        )}
      </div>

      {/* Next Section */}
      <div>
        <div className="text-xs uppercase text-muted-foreground font-medium mb-1">
          Next
        </div>
        {next ? (
          <div className="flex flex-col">
            <span className="font-medium">
              {fmtTimeRange(next.startAt, next.endAt)}
            </span>
            <span className="text-xs text-muted-foreground">
              {relativeTime(next.startAt)}
            </span>
          </div>
        ) : (
          <span className="text-muted-foreground">—</span>
        )}
      </div>

      {/* Notes */}
      {(now?.notes || next?.notes) && (
        <div className="mt-3 pt-3 border-t">
          <p className="text-xs text-muted-foreground">
            {now?.notes || next?.notes}
          </p>
        </div>
      )}
    </div>
  );
}

/**
 * Compact version for list view
 */
export function NowNextCardCompact({
  lineName,
  lineColor,
  now,
  next,
}: NowNextCardProps) {
  const hasSchedule = now || next;

  return (
    <div className="flex items-center justify-between p-3 rounded-lg border bg-card">
      <div className="flex items-center gap-2">
        <div
          className="w-2 h-2 rounded-full"
          style={{ backgroundColor: lineColor || "#3b82f6" }}
        />
        <span className="font-medium">{lineName}</span>
      </div>

      {hasSchedule ? (
        <div className="flex items-center gap-3 text-sm">
          {now && (
            <div className="flex items-center gap-1 text-green-600 dark:text-green-400">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
              <span>Now</span>
            </div>
          )}
          {next && !now && (
            <span className="text-muted-foreground">
              {relativeTime(next.startAt)}
            </span>
          )}
        </div>
      ) : (
        <span className="text-sm text-muted-foreground">No schedule</span>
      )}
    </div>
  );
}

export default NowNextCard;
