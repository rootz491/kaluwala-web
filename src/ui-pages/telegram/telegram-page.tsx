"use client";

import useTelegram from "@/hooks/useTelegram";
import Image from "next/image";
import Link from "next/link";

export function TelegramPageUI() {
  const { user, sendData } = useTelegram();

  return (
    <div className="relative min-h-screen flex items-center justify-center p-8 pt-20">
      <Link
        href="/"
        className="absolute left-4 top-4 inline-flex items-center gap-2 px-3 py-2 rounded-md bg-card/80 hover:bg-card"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          className="w-4 h-4"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M15 19l-7-7 7-7"
          />
        </svg>
        <span className="text-sm">Back</span>
      </Link>

      <div className="max-w-4xl w-full bg-background/80 rounded-lg p-8 shadow">
        {user ? (
          <section className="mb-6">
            <h2 className="text-lg font-semibold mb-3">Your profile</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-start">
              <div className="flex flex-col items-center">
                {/* Photo if available */}
                {(() => {
                  const u = user as
                    | (Record<string, unknown> & {
                        photo_url?: string;
                        language_code?: string;
                        allows_write_to_pm?: boolean;
                        auth_date?: number | string;
                      })
                    | null;
                  if (u?.photo_url) {
                    return (
                      <Image
                        src={String(u.photo_url)}
                        alt={`${user.first_name ?? ""} avatar`}
                        width={96}
                        height={96}
                        className="rounded-full"
                      />
                    );
                  }

                  return (
                    <div className="w-24 h-24 rounded-full bg-muted flex items-center justify-center text-xl">
                      {user.first_name ? String(user.first_name)[0] : "U"}
                    </div>
                  );
                })()}

                <div className="text-center mt-3">
                  <div className="font-medium">
                    {(user.first_name ?? "") +
                      (user.last_name ? ` ${user.last_name}` : "") || "Unnamed"}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    @{user.username ?? "-"}
                  </div>
                </div>
              </div>

              <div className="md:col-span-2">
                {(() => {
                  const u = user as
                    | (Record<string, unknown> & {
                        language_code?: string;
                        allows_write_to_pm?: boolean;
                        auth_date?: number | string;
                      })
                    | null;
                  return (
                    <>
                      <dl className="text-sm text-muted-foreground grid grid-cols-2 gap-y-2 gap-x-6">
                        <div>
                          <dt className="font-medium">ID</dt>
                          <dd className="mb-1">{String(user.id ?? "-")}</dd>
                        </div>

                        <div>
                          <dt className="font-medium">Language</dt>
                          <dd className="mb-1">{u?.language_code ?? "-"}</dd>
                        </div>

                        <div>
                          <dt className="font-medium">Allows write to PM</dt>
                          <dd className="mb-1">
                            {u?.allows_write_to_pm ? "Yes" : "No"}
                          </dd>
                        </div>

                        <div>
                          <dt className="font-medium">Auth date</dt>
                          <dd className="mb-1">
                            {(() => {
                              const d = u?.auth_date;
                              if (!d) return "-";
                              try {
                                const n = Number(d) * 1000;
                                return new Date(n).toLocaleString();
                              } catch {
                                return String(d);
                              }
                            })()}
                          </dd>
                        </div>
                      </dl>

                      <div className="mt-4">
                        <button
                          className="inline-flex items-center px-3 py-2 bg-primary text-white rounded-md text-sm hover:opacity-95"
                          onClick={() => {
                            // send a simple subscribe payload to Telegram if available
                            const payload = JSON.stringify({
                              action: "subscribe",
                              topic: "blog:new_posts",
                            });
                            try {
                              sendData(payload);
                            } catch {
                              // noop
                            }
                          }}
                        >
                          Subscribe to new blog notifications
                        </button>
                        <p className="text-xs text-muted-foreground mt-2">
                          We will send a notification to your Telegram when new
                          posts go live (demo button — requires Telegram WebApp
                          support).
                        </p>
                      </div>
                    </>
                  );
                })()}
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
