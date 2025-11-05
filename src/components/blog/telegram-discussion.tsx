"use client";

import { useEffect } from "react";

interface TelegramDiscussionProps {
  telegramId: string;
  postSlug?: string;
  commentsLimit?: number;
  colorful?: boolean;
}

/**
 * Telegram Discussion Widget Component
 * Embeds the official Telegram discussion widget
 *
 * How it works:
 * 1. If using topicId format: Embeds discussions from a specific Telegram topic
 * 2. If using channel link format: Shows all discussions from that channel
 *    (discussions are matched to this page via canonical URL)
 *
 * For channel-based discussions to work:
 * - Your Telegram channel must post links to your blog articles
 * - The page must have a canonical URL in the <head>
 * - Next.js automatically adds this via metadata.alternates.canonical
 * - Telegram widget will show discussions posted for this URL
 *
 * @param telegramId - Telegram discussion ID (topicId format: "channel/123")
 *                     or channel link format: "@channelname"
 * @param postSlug - Blog post slug (for reference, not used by widget)
 * @param commentsLimit - Maximum number of comments to display (default: 5)
 * @param colorful - Use colorful theme (default: true)
 */
export function TelegramDiscussion({
  telegramId,
  postSlug,
  commentsLimit = 5,
  colorful = true,
}: TelegramDiscussionProps) {
  useEffect(() => {
    // Load or reload the Telegram widget
    // This script will process data-telegram-discussion attributes
    const script = document.createElement("script");
    script.src = "https://telegram.org/js/telegram-widget.js?22";
    script.async = true;
    script.defer = true;

    // Append to body
    document.body.appendChild(script);

    return () => {
      // Cleanup is handled by Telegram widget
    };
  }, [telegramId]);

  return (
    <div id={`telegram-discussion-${postSlug}`} className="my-8">
      <div className="rounded-lg border border-border bg-card overflow-hidden">
        {/* Telegram Discussion Widget */}
        <script
          async
          src="https://telegram.org/js/telegram-widget.js?22"
          data-telegram-discussion={telegramId}
          data-comments-limit={commentsLimit}
          data-colorful={colorful ? "1" : "0"}
        />
      </div>
    </div>
  );
}
