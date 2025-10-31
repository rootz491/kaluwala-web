"use client";

import React, { createContext, useEffect, useState } from "react";

export interface TelegramUser {
  id?: number | string;
  first_name?: string;
  last_name?: string;
  username?: string;
  [key: string]: unknown;
}

export interface TelegramWebApp {
  initDataUnsafe?: { user?: TelegramUser };
  themeParams?: Record<string, string>;
  ready?: () => void;
  expand?: () => void;
  close?: () => void;
  sendData?: (data: string) => void;
}

export interface TelegramContextValue {
  tg: TelegramWebApp | null;
  user: TelegramUser | null;
  themeParams: Record<string, string> | null;
  sendData: (data: string) => void;
}

export const TelegramContext = createContext<TelegramContextValue | null>(null);

export function TelegramProvider({ children }: { children: React.ReactNode }) {
  const [tg, setTg] = useState<TelegramWebApp | null>(null);
  const [user, setUser] = useState<TelegramUser | null>(null);
  const [themeParams, setThemeParams] = useState<Record<string, string> | null>(
    null
  );

  useEffect(() => {
    if (typeof window === "undefined") return;

    const initFromWindow = () => {
      const win = window as unknown as {
        Telegram?: { WebApp?: TelegramWebApp };
      };
      const webapp: TelegramWebApp | undefined = win.Telegram?.WebApp;
      if (!webapp) return;

      try {
        webapp.ready?.();
      } catch {
        // ignore
      }

      try {
        webapp.expand?.();
      } catch {
        // ignore
      }

      setTg(webapp);
      setUser(webapp.initDataUnsafe?.user ?? null);
      setThemeParams(webapp.themeParams ?? null);
    };

    // If script already present/loaded
    const wcheck = (
      window as unknown as {
        Telegram?: { WebApp?: TelegramWebApp };
      }
    ).Telegram?.WebApp;
    if (wcheck) {
      initFromWindow();
      return;
    }

    // Inject script client-side only
    const existing = document.querySelector(
      'script[src="https://telegram.org/js/telegram-web-app.js"]'
    );
    if (existing) {
      // script present but WebApp may not be ready yet
      existing.addEventListener("load", initFromWindow);
      return () => existing.removeEventListener("load", initFromWindow);
    }

    const script = document.createElement("script");
    script.src = "https://telegram.org/js/telegram-web-app.js";
    script.async = true;
    script.onload = initFromWindow;
    document.head.appendChild(script);

    return () => {
      // don't remove the script; leave it for other pages
    };
  }, []);

  const sendData = (data: string) => {
    try {
      tg?.sendData?.(data);
    } catch {
      // ignore
    }
  };

  return (
    <TelegramContext.Provider value={{ tg, user, themeParams, sendData }}>
      {children}
    </TelegramContext.Provider>
  );
}

export default TelegramProvider;
