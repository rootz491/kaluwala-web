"use client";

import useTelegram from "@/hooks/useTelegram";
import Image from "next/image";
import React from "react";

export function TelegramPageUI() {
  const { tg, user, themeParams } = useTelegram();

  const containerStyle: React.CSSProperties = {
    backgroundColor: themeParams?.bg_color || "transparent",
    color: themeParams?.text_color || undefined,
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center p-8 pt-20"
      style={containerStyle}
    >
      <div className="max-w-4xl w-full bg-background/80 rounded-lg p-8 shadow">
        {user ? (
          <section className="mb-6">
            <h2 className="text-lg font-semibold mb-3">User information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <dl className="text-sm text-muted-foreground">
                  <dt className="font-medium">ID</dt>
                  <dd className="mb-2">{String(user.id)}</dd>

                  <dt className="font-medium">First name</dt>
                  <dd className="mb-2">{user.first_name ?? "-"}</dd>

                  <dt className="font-medium">Last name</dt>
                  <dd className="mb-2">{user.last_name ?? "-"}</dd>
                </dl>
              </div>

              <div>
                <dl className="text-sm text-muted-foreground">
                  <dt className="font-medium">Username</dt>
                  <dd className="mb-2">{user.username ?? "-"}</dd>

                  <dt className="font-medium">Raw initDataUnsafe</dt>
                  <dd className="mb-2 whitespace-pre-wrap text-xs">
                    {JSON.stringify(tg?.initDataUnsafe ?? {}, null, 2)}
                  </dd>
                </dl>
              </div>
            </div>
          </section>
        ) : (
          <section className="mb-6">
            <h2 className="text-lg font-semibold mb-3">Open inside Telegram</h2>
            <p className="text-muted-foreground mb-4">
              To use this website as a Telegram Mini App, open the Kaluwala bot
              and send <code>/start</code>. The bot will provide a button to
              launch this site as a Mini App.
            </p>

            <p className="text-sm text-muted-foreground my-4">
              visit{" "}
              <a href="https://t.me/kaluwala_bot" className="text-primary">
                https://t.me/kaluwala_bot
              </a>
            </p>

            <div className="grid md:grid-cols-2 gap-4 items-start">
              <div className="rounded border p-3 bg-card">
                <h3 className="font-medium mb-2">Chat &amp; open</h3>
                <p className="text-sm text-muted-foreground mb-2">
                  Open chat with our bot and send <code>/start</code>.
                </p>
                <Image
                  src="/images/telegram/chat-opened.jpg"
                  alt="Chat opened"
                  width={560}
                  height={315}
                  className="rounded"
                />
              </div>

              <div className="rounded border p-3 bg-card">
                <h3 className="font-medium mb-2">Mini-app launched</h3>
                <p className="text-sm text-muted-foreground mb-2">
                  When you tap the button, the mini-app opens inside Telegram.
                </p>
                <Image
                  src="/images/telegram/mini-app-opened.jpg"
                  alt="Mini app opened"
                  width={560}
                  height={315}
                  className="rounded"
                />
              </div>
            </div>
          </section>
        )}
      </div>
    </div>
  );
}

export default TelegramPageUI;
