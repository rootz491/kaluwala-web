"use client";

import { useEffect } from "react";

interface TelegramDiscussionProps {
  telegramId: string;
}

/**
 * Telegram Discussion Widget Component
 * Embeds a Telegram discussion/topic widget for blog posts
 * Requires telegramId in format: "channelId/topicId"
 */
export function TelegramDiscussion({ telegramId }: TelegramDiscussionProps) {
  useEffect(() => {
    // Load Telegram widget script
    const script = document.createElement("script");
    script.src = "https://telegram.org/js/telegram-widget.js?22";
    script.async = true;
    script.defer = true;

    // Find the telegram discussion container and append script
    const container = document.getElementById("telegram-discussion-container");
    if (container) {
      container.appendChild(script);
    }

    return () => {
      // Cleanup: remove script on unmount
      const existingScript = document.getElementById("telegram-widget-script");
      if (existingScript) {
        existingScript.remove();
      }
    };
  }, [telegramId]);

  // telegramId format should be: "channelId/topicId" or "@channelHandle/topicId"
  const telegramDiscussionUrl = `https://t.me/kaluwaladiscussions/${telegramId}`;

  return (
    <div id="telegram-discussion-container" className="my-8">
      <div className="rounded-lg border border-border bg-card p-6">
        <h3 className="text-lg font-semibold mb-4">Join the Discussion</h3>
        <script
          id="telegram-widget-script"
          async
          defer
          src="https://telegram.org/js/telegram-widget.js?22"
          data-telegram-post={telegramId}
          data-width="100%"
        />
        <div className="mt-4 text-center">
          <a
            href={telegramDiscussionUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center px-4 py-2 rounded-md bg-blue-500 hover:bg-blue-600 text-white font-medium transition-colors"
          >
            Discuss on Telegram →
          </a>
        </div>
      </div>
    </div>
  );
}
