"use client";

import { NowNextCard } from "@/components/water";
import { COLLECTIONS } from "@/lib/appwrite";
import { Query, useCollection } from "@/lib/swr";
import { fmtDate, isOngoing, isUpcoming, todayRange } from "@/lib/time";
import { Line, LineWithSchedule, Schedule } from "@/types/water";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

export default function WaterBoardPage() {
  const [currentTime, setCurrentTime] = useState(new Date());

  // Update current time every minute for status recalculation
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  // Fetch all active lines
  const {
    data: lines,
    error: linesError,
    isLoading: linesLoading,
  } = useCollection<Line>(COLLECTIONS.LINES, [
    Query.equal("isActive", true),
    Query.orderAsc("name"),
  ]);

  // Fetch today's schedules
  const { startISO, endISO } = todayRange();
  const {
    data: schedules,
    error: schedulesError,
    isLoading: schedulesLoading,
    mutate: refreshSchedules,
  } = useCollection<Schedule>(COLLECTIONS.SCHEDULES, [
    Query.greaterThanEqual("startAt", startISO),
    Query.lessThanEqual("startAt", endISO),
    Query.orderAsc("startAt"),
    Query.limit(500),
  ]);

  // Process lines with their schedules
  const linesWithSchedules = useMemo((): LineWithSchedule[] => {
    if (!lines) return [];

    return lines.map((line) => {
      const lineSchedules = (schedules || []).filter(
        (s) => s.lineId === line.$id && s.status !== "cancelled"
      );

      // Find current ongoing schedule
      const now = lineSchedules.find((s) => isOngoing(s.startAt, s.endAt));

      // Find next upcoming schedule
      const upcoming = lineSchedules
        .filter((s) => isUpcoming(s.startAt))
        .sort(
          (a, b) =>
            new Date(a.startAt).getTime() - new Date(b.startAt).getTime()
        );
      const next = upcoming[0];

      return {
        ...line,
        now,
        next,
      };
    });
  }, [lines, schedules, currentTime]);

  const isLoading = linesLoading || schedulesLoading;
  const error = linesError || schedulesError;

  if (error) {
    return (
      <div className="min-h-screen p-4 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-500 mb-2">Failed to load water schedule</p>
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
              💧 Water Schedule
            </h1>
            <p className="text-xs text-muted-foreground">
              {fmtDate(new Date())} • Kaluwala
            </p>
          </div>
          <Link
            href="/telegram"
            className="text-sm text-muted-foreground hover:text-foreground"
          >
            ← Back
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-2xl mx-auto p-4">
        {isLoading ? (
          // Loading skeleton
          <div className="grid gap-4">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="rounded-xl border bg-card p-4 animate-pulse"
              >
                <div className="h-4 bg-muted rounded w-1/3 mb-3" />
                <div className="h-3 bg-muted rounded w-1/4 mb-2" />
                <div className="h-4 bg-muted rounded w-1/2 mb-3" />
                <div className="h-3 bg-muted rounded w-1/4 mb-2" />
                <div className="h-4 bg-muted rounded w-1/2" />
              </div>
            ))}
          </div>
        ) : linesWithSchedules.length === 0 ? (
          // Empty state
          <div className="text-center py-12">
            <p className="text-4xl mb-4">💧</p>
            <p className="text-muted-foreground">
              No water lines configured yet
            </p>
          </div>
        ) : (
          // Water schedule cards
          <div className="grid gap-4">
            {linesWithSchedules.map((line) => (
              <NowNextCard
                key={line.$id}
                lineName={line.name}
                lineColor={line.color}
                now={line.now}
                next={line.next}
              />
            ))}
          </div>
        )}

        {/* Quick Actions */}
        <div className="mt-8 pt-6 border-t">
          <h2 className="text-sm font-medium text-muted-foreground mb-3">
            Quick Actions
          </h2>
          <div className="grid grid-cols-2 gap-3">
            <Link
              href="/telegram/subscriptions"
              className="p-3 rounded-lg border bg-card hover:bg-accent transition-colors text-center"
            >
              <span className="text-xl">🔔</span>
              <p className="text-sm font-medium mt-1">Notifications</p>
            </Link>
            <Link
              href="/telegram/today"
              className="p-3 rounded-lg border bg-card hover:bg-accent transition-colors text-center"
            >
              <span className="text-xl">📋</span>
              <p className="text-sm font-medium mt-1">Full Schedule</p>
            </Link>
          </div>
        </div>

        {/* Footer info */}
        <p className="text-center text-xs text-muted-foreground mt-8">
          Schedule updates automatically • Last refreshed{" "}
          {currentTime.toLocaleTimeString()}
        </p>
      </main>
    </div>
  );
}
