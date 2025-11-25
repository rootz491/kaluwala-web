"use client";

import { RequireAuth } from "@/components/auth";
import { ScheduleForm } from "@/components/water/schedule-form";
import { useAuth } from "@/context/auth-context";
import { COLLECTIONS } from "@/lib/appwrite";
import { Query, useCollection } from "@/lib/swr";
import { fmtDate, fmtTimeRange, todayRange } from "@/lib/time";
import { Line, Schedule } from "@/types/water";
import Link from "next/link";

export default function DistributorSchedulePage() {
  return (
    <RequireAuth requiredRole="distributor" redirectTo="/telegram/water">
      <DistributorScheduleContent />
    </RequireAuth>
  );
}

function DistributorScheduleContent() {
  const { user } = useAuth();

  // Fetch all active lines
  const { data: lines, isLoading: linesLoading } = useCollection<Line>(
    COLLECTIONS.LINES,
    [Query.equal("isActive", true), Query.orderAsc("name")]
  );

  // Fetch today's schedules (to show recent additions)
  const { startISO, endISO } = todayRange();
  const {
    data: todaySchedules,
    isLoading: schedulesLoading,
    mutate: refreshSchedules,
  } = useCollection<Schedule>(COLLECTIONS.SCHEDULES, [
    Query.greaterThanEqual("startAt", startISO),
    Query.lessThanEqual("startAt", endISO),
    Query.orderDesc("$createdAt"),
    Query.limit(10),
  ]);

  const isLoading = linesLoading || schedulesLoading;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-background/95 backdrop-blur border-b px-4 py-3">
        <div className="max-w-2xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold flex items-center gap-2">
              📝 Create Schedule
            </h1>
            <p className="text-xs text-muted-foreground">
              Distributor Panel • {fmtDate(new Date())}
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
        {/* User info */}
        {user && (
          <div className="mb-6 p-4 rounded-lg bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800">
            <p className="text-sm text-blue-700 dark:text-blue-300">
              Logged in as <span className="font-medium">{user.name}</span>
              <span className="ml-2 px-2 py-0.5 rounded-full text-xs bg-blue-200 dark:bg-blue-800">
                {user.role}
              </span>
            </p>
          </div>
        )}

        {/* Schedule Form */}
        <section className="mb-8">
          <h2 className="font-semibold mb-4">New Water Schedule</h2>
          {isLoading ? (
            <div className="space-y-4">
              <div className="h-12 rounded-lg bg-muted animate-pulse" />
              <div className="grid grid-cols-2 gap-4">
                <div className="h-12 rounded-lg bg-muted animate-pulse" />
                <div className="h-12 rounded-lg bg-muted animate-pulse" />
              </div>
              <div className="h-20 rounded-lg bg-muted animate-pulse" />
              <div className="h-12 rounded-lg bg-muted animate-pulse" />
            </div>
          ) : !lines || lines.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              No water lines available. Please contact admin.
            </div>
          ) : (
            <ScheduleForm
              lines={lines}
              userId={user?.telegramId?.toString() || ""}
              onSuccess={() => refreshSchedules()}
            />
          )}
        </section>

        {/* Today's Schedules */}
        <section>
          <h2 className="font-semibold mb-4">Today&apos;s Schedules</h2>
          {schedulesLoading ? (
            <div className="space-y-2">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="h-16 rounded-lg bg-muted animate-pulse"
                />
              ))}
            </div>
          ) : !todaySchedules || todaySchedules.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground border rounded-lg">
              No schedules created for today yet
            </div>
          ) : (
            <div className="space-y-2">
              {todaySchedules.map((schedule) => (
                <ScheduleItem key={schedule.$id} schedule={schedule} />
              ))}
            </div>
          )}
        </section>

        {/* Help text */}
        <div className="mt-8 p-4 rounded-lg border bg-card">
          <h3 className="font-medium mb-2 flex items-center gap-2">
            <span>ℹ️</span> Tips
          </h3>
          <ul className="text-sm text-muted-foreground space-y-1">
            <li>• Schedules appear immediately on the water board</li>
            <li>• Subscribers will be notified via Telegram</li>
            <li>• Times are in IST (India Standard Time)</li>
          </ul>
        </div>
      </main>
    </div>
  );
}

function ScheduleItem({ schedule }: { schedule: Schedule }) {
  const statusColors = {
    upcoming:
      "bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300",
    ongoing:
      "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300",
    completed: "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300",
    cancelled: "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300",
  };

  return (
    <div className="p-3 rounded-lg border bg-card flex items-center justify-between">
      <div>
        <p className="font-medium">{schedule.lineName || "Unknown Line"}</p>
        <p className="text-sm text-muted-foreground">
          {fmtTimeRange(schedule.startAt, schedule.endAt)}
        </p>
      </div>
      <span
        className={`px-2 py-1 rounded-full text-xs font-medium ${
          statusColors[schedule.status]
        }`}
      >
        {schedule.status}
      </span>
    </div>
  );
}
