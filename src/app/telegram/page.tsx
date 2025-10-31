"use client";

import useTelegram from "@/hooks/useTelegram";
import React from "react";

export default function TelegramPage() {
  const { tg, user, themeParams } = useTelegram();

  const firstName = user?.first_name ?? user?.username ?? "Guest";

  const style: React.CSSProperties = {
    backgroundColor: themeParams?.bg_color || "transparent",
    color: themeParams?.text_color || undefined,
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center p-8"
      style={style}
    >
      <div className="max-w-md w-full bg-background/80 rounded-lg p-8 shadow">
        <h1 className="text-2xl font-bold mb-4">Hello, {firstName}!</h1>
        <p className="text-muted-foreground mb-6">
          This page demonstrates Telegram WebApp integration. If you opened this
          inside Telegram, the WebApp SDK was initialized.
        </p>

        <div className="flex gap-3">
          <button
            className="btn btn-primary px-4 py-2 rounded bg-primary text-primary-foreground"
            onClick={() => tg?.close?.()}
          >
            Close App
          </button>

          <button
            className="btn btn-outline px-4 py-2 rounded"
            onClick={() =>
              tg?.sendData?.(JSON.stringify({ hello: "from-webapp" }))
            }
          >
            Send Data
          </button>
        </div>
      </div>
    </div>
  );
}
