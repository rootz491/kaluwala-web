"use client";

import Image from "next/image";

export default function OpenInTelegramInfo() {
  return (
    <section className="mb-6">
      <h2 className="text-lg font-semibold mb-3">Open inside Telegram</h2>
      <p className="text-muted-foreground mb-4">
        To use this website as a Telegram Mini App, open the Kaluwala bot and
        send <code>/start</code>. The bot will provide a button to launch this
        site as a Mini App.
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
  );
}
