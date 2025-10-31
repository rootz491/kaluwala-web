"use client";

import { TelegramContext } from "@/context/telegram-context";
import { useContext } from "react";

export function useTelegram() {
  const ctx = useContext(TelegramContext);
  if (!ctx) {
    return {
      tg: null,
      user: null,
      themeParams: null,
      sendData: (data: string) => {
        // noop when not available — mark param as used to satisfy lint
        void data;
      },
    };
  }

  return ctx;
}

export default useTelegram;
