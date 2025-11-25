"use client";

import { RequireAuth } from "@/components/auth";
import { LineCheckList } from "@/components/water/line-chips";
import { useAuth } from "@/context/auth-context";
import { COLLECTIONS, databases, DB_ID } from "@/lib/appwrite";
import { Query, useCollection, useDocument } from "@/lib/swr";
import { Line, LineSubscriber } from "@/types/water";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";

export default function SubscriptionsPage() {
  return (
    <RequireAuth>
      <SubscriptionsContent />
    </RequireAuth>
  );
}

function SubscriptionsContent() {
  const { user } = useAuth();
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  // Fetch all active lines
  const { data: lines, isLoading: linesLoading } = useCollection<Line>(
    COLLECTIONS.LINES,
    [Query.equal("isActive", true), Query.orderAsc("name")]
  );

  // Fetch user's subscription document
  const subscriberDocId = user?.telegramId?.toString() || null;
  const {
    data: subscription,
    isLoading: subLoading,
    mutate: refreshSubscription,
  } = useDocument<LineSubscriber>(
    COLLECTIONS.LINE_SUBSCRIBERS,
    subscriberDocId
  );

  // Initialize selected IDs from subscription
  useEffect(() => {
    if (subscription?.lineIds) {
      setSelectedIds(subscription.lineIds);
    }
  }, [subscription]);

  // Toggle line selection (optimistic update)
  const handleToggle = useCallback(
    async (lineId: string) => {
      if (!user?.telegramId) return;

      const wasSelected = selectedIds.includes(lineId);
      const newIds = wasSelected
        ? selectedIds.filter((id) => id !== lineId)
        : [...selectedIds, lineId];

      // Optimistic update
      setSelectedIds(newIds);
      setIsSaving(true);
      setSaveMessage(null);

      try {
        const docId = user.telegramId.toString();

        if (subscription) {
          // Update existing document
          await databases.updateDocument(
            DB_ID,
            COLLECTIONS.LINE_SUBSCRIBERS,
            docId,
            { lineIds: newIds, updatedAt: new Date().toISOString() }
          );
        } else {
          // Create new document
          await databases.createDocument(
            DB_ID,
            COLLECTIONS.LINE_SUBSCRIBERS,
            docId,
            {
              telegramId: user.telegramId,
              lineIds: newIds,
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString(),
            }
          );
        }

        // Refresh subscription data
        refreshSubscription();

        setSaveMessage({
          type: "success",
          text: wasSelected ? "Unsubscribed" : "Subscribed!",
        });

        // Clear message after 2 seconds
        setTimeout(() => setSaveMessage(null), 2000);
      } catch (err) {
        // Revert on error
        setSelectedIds(subscription?.lineIds || []);
        setSaveMessage({
          type: "error",
          text: "Failed to save. Please try again.",
        });
      } finally {
        setIsSaving(false);
      }
    },
    [user, selectedIds, subscription, refreshSubscription]
  );

  const isLoading = linesLoading || subLoading;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-background/95 backdrop-blur border-b px-4 py-3">
        <div className="max-w-2xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold flex items-center gap-2">
              🔔 Notifications
            </h1>
            <p className="text-xs text-muted-foreground">
              Get alerts when water is available
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
          <div className="mb-6 p-4 rounded-lg bg-muted/50">
            <p className="text-sm">
              Logged in as <span className="font-medium">{user.name}</span>
            </p>
          </div>
        )}

        {/* Instructions */}
        <div className="mb-6">
          <h2 className="font-semibold mb-2">Select your water lines</h2>
          <p className="text-sm text-muted-foreground">
            You&apos;ll receive Telegram notifications when water supply starts
            for your selected lines.
          </p>
        </div>

        {/* Save status */}
        {saveMessage && (
          <div
            className={`mb-4 p-3 rounded-lg text-sm ${
              saveMessage.type === "success"
                ? "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300"
                : "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300"
            }`}
          >
            {saveMessage.text}
          </div>
        )}

        {/* Line selection */}
        {isLoading ? (
          <div className="space-y-2">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-16 rounded-lg bg-muted animate-pulse" />
            ))}
          </div>
        ) : !lines || lines.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-4xl mb-4">💧</p>
            <p className="text-muted-foreground">No water lines available</p>
          </div>
        ) : (
          <LineCheckList
            lines={lines}
            selectedIds={selectedIds}
            onToggle={handleToggle}
            disabled={isSaving}
          />
        )}

        {/* Summary */}
        {selectedIds.length > 0 && (
          <div className="mt-6 p-4 rounded-lg bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800">
            <p className="text-sm text-blue-700 dark:text-blue-300">
              ✓ You&apos;re subscribed to{" "}
              <span className="font-semibold">{selectedIds.length}</span> water
              line{selectedIds.length !== 1 ? "s" : ""}
            </p>
          </div>
        )}

        {/* Info box */}
        <div className="mt-8 p-4 rounded-lg border bg-card">
          <h3 className="font-medium mb-2 flex items-center gap-2">
            <span>ℹ️</span> How notifications work
          </h3>
          <ul className="text-sm text-muted-foreground space-y-1">
            <li>• You&apos;ll get a message when supply starts</li>
            <li>• Notifications are sent via Telegram bot</li>
            <li>• Make sure you&apos;ve started the bot</li>
          </ul>
        </div>
      </main>
    </div>
  );
}
