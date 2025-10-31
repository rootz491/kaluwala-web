"use client";

import useTelegram from "@/hooks/useTelegram";
import Link from "next/link";

export function TelegramLink() {
  const { tg } = useTelegram();

  if (!tg) return null;

  return (
    <li>
      <Link
        href="/telegram"
        className="text-muted-foreground hover:text-foreground transition-colors"
      >
        Telegram
      </Link>
    </li>
  );
}

export default TelegramLink;
