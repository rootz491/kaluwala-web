"use client";

import { COLLECTIONS } from "@/lib/appwrite";
import { Query, useCollection } from "@/lib/swr";
import {
  fmtDate,
  fmtTimeRange,
  isOngoing,
  isUpcoming,
  relativeTime,
  todayRange,
} from "@/lib/time";
import { Line, Schedule } from "@/types/water";
import Link from "next/link";
import { useMemo } from "react";

export default function TodaySchedulePage() {
  // Fetch all active lines
  const { data: lines, isLoading: linesLoading } = useCollection<Line>(
    COLLECTIONS.LINES,
    [Query.equal("isActive", true), Query.orderAsc("name")]
  );

  // Fetch today's schedules
  const { startISO, endISO } = todayRange();
  const {
    data: schedules,
    isLoading: schedulesLoading,
    error,
    mutate: refreshSchedules,
  } = useCollection<Schedule>(COLLECTIONS.SCHEDULES, [
    Query.greaterThanEqual("startAt", startISO),
    Query.lessThanEqual("startAt", endISO),
    Query.orderAsc("startAt"),
    Query.limit(500),
  ]);

  // Group schedules by line
  const groupedSchedules = useMemo(() => {
    if (!lines || !schedules) return [];

    return lines
      .map((line) => {
        const lineSchedules = schedules
          .filter((s) => s.lineId === line.$id && s.status !== "cancelled")
          .sort(
            (a, b) =>
              new Date(a.startAt).getTime() - new Date(b.startAt).getTime()
          );

        return {
          line,
          schedules: lineSchedules,
        };
      })
      .filter((group) => group.schedules.length > 0);
  }, [lines, schedules]);

  // Stats
  const stats = useMemo(() => {
    if (!schedules) return { total: 0, ongoing: 0, upcoming: 0, completed: 0 };

    const activeSchedules = schedules.filter((s) => s.status !== "cancelled");
    return {
      total: activeSchedules.length,
      ongoing: activeSchedules.filter((s) => isOngoing(s.startAt, s.endAt))
        .length,
      upcoming: activeSchedules.filter((s) => isUpcoming(s.startAt)).length,
      completed: activeSchedules.filter(
        (s) => !isOngoing(s.startAt, s.endAt) && !isUpcoming(s.startAt)
      ).length,
    };
  }, [schedules]);

  const isLoading = linesLoading || schedulesLoading;

  if (error) {
    return (
      <div className="min-h-screen p-4 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-500 mb-2">Failed to load schedules</p>
          <button
            onClick={() => refreshSchedules()}
            className="text-sm text-blue-600 hover:underline"
          >
            Try again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-background/95 backdrop-blur border-b px-4 py-3">
        <div className="max-w-2xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold flex items-center gap-2">
              📋 Today&apos;s Schedule
            </h1>
            <p className="text-xs text-muted-foreground">
              {fmtDate(new Date())} • Full Details
            </p>
          </div>
          <Link
            href="/telegram/water"
            className="text-sm text-muted-foreground hover:text-foreground"
          >
            ← Back
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-2xl mx-auto p-4">
        {/* Stats */}
        <div className="grid grid-cols-4 gap-2 mb-6">
          <StatCard label="Total" value={stats.total} />
          <StatCard
            label="Ongoing"
            value={stats.ongoing}
            color="text-green-600 dark:text-green-400"
          />
          <StatCard
            label="Upcoming"
            value={stats.upcoming}
            color="text-blue-600 dark:text-blue-400"
          />
          <StatCard
            label="Done"
            value={stats.completed}
            color="text-muted-foreground"
          />
        </div>

        {isLoading ? (
          // Loading skeleton
          <div className="space-y-6">
            {[1, 2].map((i) => (
              <div key={i}>
                <div className="h-6 w-32 bg-muted rounded animate-pulse mb-3" />
                <div className="space-y-2">
                  {[1, 2].map((j) => (
                    <div
                      key={j}
                      className="h-20 rounded-lg bg-muted animate-pulse"
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : groupedSchedules.length === 0 ? (
          // Empty state
          <div className="text-center py-12">
            <p className="text-4xl mb-4">📭</p>
            <p className="text-muted-foreground mb-2">No schedules for today</p>
            <p className="text-sm text-muted-foreground">
              Check back later or view the water board
            </p>
          </div>
        ) : (
          // Grouped schedules
          <div className="space-y-6">
            {groupedSchedules.map(({ line, schedules }) => (
              <div key={line.$id}>
                {/* Line Header */}
                <div className="flex items-center gap-2 mb-3">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: line.color || "#3b82f6" }}
                  />
                  <h2 className="font-semibold">{line.name}</h2>
                  <span className="text-xs text-muted-foreground">
                    ({schedules.length} schedule
                    {schedules.length !== 1 ? "s" : ""})
                  </span>
                </div>

                {/* Schedule List */}
                <div className="space-y-2">
                  {schedules.map((schedule) => (
                    <ScheduleCard key={schedule.$id} schedule={schedule} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Refresh button */}
        <div className="mt-8 text-center">
          <button
            onClick={() => refreshSchedules()}
            className="text-sm text-blue-600 hover:underline"
          >
            🔄 Refresh
          </button>
        </div>
      </main>
    </div>
  );
}

function StatCard({
  label,
  value,
  color,
}: {
  label: string;
  value: number;
  color?: string;
}) {
  return (
    <div className="p-3 rounded-lg border bg-card text-center">
      <p className={`text-2xl font-bold ${color || ""}`}>{value}</p>
      <p className="text-xs text-muted-foreground">{label}</p>
    </div>
  );
}

function ScheduleCard({ schedule }: { schedule: Schedule }) {
  const ongoing = isOngoing(schedule.startAt, schedule.endAt);
  const upcoming = isUpcoming(schedule.startAt);
  const completed = !ongoing && !upcoming;

  let statusBadge = null;
  if (ongoing) {
    statusBadge = (
      <span className="flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
        </span>
        Ongoing
      </span>
    );
  } else if (upcoming) {
    statusBadge = (
      <span className="px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300">
        {relativeTime(schedule.startAt)}
      </span>
    );
  } else if (completed) {
    statusBadge = (
      <span className="px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400">
        Completed
      </span>
    );
  }

  return (
    <div
      className={`
        p-4 rounded-lg border transition-colors
        ${
          ongoing
            ? "bg-green-50 border-green-200 dark:bg-green-950 dark:border-green-800"
            : "bg-card"
        }
      `}
    >
      <div className="flex items-start justify-between gap-2">
        <div className="flex-1">
          <p className="font-medium text-lg">
            {fmtTimeRange(schedule.startAt, schedule.endAt)}
          </p>
          {schedule.notes && (
            <p className="text-sm text-muted-foreground mt-1">
              {schedule.notes}
            </p>
          )}
        </div>
        {statusBadge}
      </div>
    </div>
  );
}
