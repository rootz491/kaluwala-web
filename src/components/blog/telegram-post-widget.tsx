"use client";

import { useEffect } from "react";

interface TelegramPostWidgetProps {
  telegramId: string;
  width?: string;
  showUserPic?: boolean;
}

/**
 * Telegram Post Widget Component
 * Embeds a single Telegram post at the bottom of blog posts
 *
 * This widget displays:
 * - The original post content
 * - User avatar and name
 * - Post metadata
 * - Comments/discussion on the post
 *
 * @param telegramId - Telegram post ID in format "channel/messageId" (e.g., "kaluwaladiscussions/44")
 * @param width - Widget width (default: "100%")
 * @param showUserPic - Show user profile picture (default: true)
 */
export function TelegramPostWidget({
  telegramId,
  width = "100%",
  showUserPic = true,
}: TelegramPostWidgetProps) {
  useEffect(() => {
    // Load the Telegram widget script and trigger processing
    // @ts-expect-error - tgPageData is Telegram's global object
    if (window.tgPageData === undefined) {
      const script = document.createElement("script");
      script.src = "https://telegram.org/js/telegram-widget.js?22";
      script.async = true;

      // After script loads, it will automatically process data-telegram-post elements
      document.head.appendChild(script);
    } else {
      // Widget already loaded, trigger re-processing
      // @ts-expect-error - tgPageData is Telegram's global object
      window.tgPageData?.reset?.();
    }
  }, [telegramId]);

  return (
    <div className="my-12 flex justify-center">
      <div className="w-full" style={{ maxWidth: width }}>
        <script
          async
          src="https://telegram.org/js/telegram-widget.js?22"
          data-telegram-post={`kaluwaladiscussions/${telegramId}`}
          data-width={width}
          data-userpic={showUserPic ? "true" : "false"}
        />
        <div className="mx-auto my-8 text-center text-sm text-muted-foreground">
          Loading post from Telegram...
        </div>
      </div>
    </div>
  );
}
