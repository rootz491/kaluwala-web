"use client";

import { TelegramUser, TelegramWebApp } from "@/context/telegram-context";
import Image from "next/image";
import { useState } from "react";

interface Props {
  user: TelegramUser | null;
  tg: TelegramWebApp | null;
}

export default function ProfileCard({ user, tg }: Props) {
  const [status, setStatus] = useState<"idle" | "sending" | "ok" | "error">(
    "idle"
  );

  const handleSubscribe = async () => {
    setStatus("sending");

    const payloadObj = {
      action: "subscribe",
      topic: "blog:new_posts",
      user: tg?.initDataUnsafe?.user ?? user ?? null,
      ts: Date.now(),
    } as const;
    const payload = JSON.stringify(payloadObj);

    try {
      if (tg?.sendData) {
        tg?.sendData?.(payload);
        setStatus("ok");
      } else {
        setStatus("error");
      }
    } catch (err) {
      console.error(err);
      setStatus("error");
    }
  };

  return (
    <section className="mb-6">
      <h2 className="text-lg font-semibold mb-3">Your profile</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-start">
        <div className="flex flex-col items-center">
          {(() => {
            const u = user as
              | (Record<string, unknown> & { photo_url?: string })
              | null;
            if (u?.photo_url) {
              return (
                <Image
                  src={String(u.photo_url)}
                  alt={`${user?.first_name ?? ""} avatar`}
                  width={96}
                  height={96}
                  className="rounded-full"
                />
              );
            }

            return (
              <div className="w-24 h-24 rounded-full bg-muted flex items-center justify-center text-xl">
                {user?.first_name ? String(user.first_name)[0] : "U"}
              </div>
            );
          })()}

          <div className="text-center mt-3">
            <div className="font-medium">
              {(user?.first_name ?? "") +
                (user?.last_name ? ` ${user.last_name}` : "") || "Unnamed"}
            </div>
            <div className="text-sm text-muted-foreground">
              @{user?.username ?? "-"}
            </div>
          </div>
        </div>

        <div className="mt-4">
          <button
            className="inline-flex items-center px-3 py-2 bg-primary text-white rounded-md text-sm hover:opacity-95"
            onClick={handleSubscribe}
            disabled={status === "sending"}
          >
            {status === "sending"
              ? "Subscribing..."
              : status === "ok"
              ? "Subscribed"
              : "Subscribe to new blog notifications"}
          </button>
          <p className="text-xs text-muted-foreground mt-2">
            {status === "error"
              ? "Failed to subscribe. Try again."
              : "We will send a notification to your Telegram when new posts go live."}
          </p>
        </div>
      </div>
    </section>
  );
}
