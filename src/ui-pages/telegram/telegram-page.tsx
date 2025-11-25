"use client";

import useTelegram from "@/hooks/useTelegram";
import Link from "next/link";
import BackButton from "../../components/ui/BackButton";
import OpenInTelegramInfo from "./components/OpenInTelegramInfo";
import ProfileCard from "./components/ProfileCard";

export function TelegramPageUI() {
  const { tg, user } = useTelegram();

  return (
    <div className="relative min-h-screen flex items-center justify-center p-8 pt-20">
      <BackButton />

      <div className="max-w-4xl w-full bg-background/80 rounded-lg p-8 shadow">
        {user ? (
          <div className="space-y-6">
            <ProfileCard user={user} tg={tg} />
            
            {/* Water Distribution Quick Link */}
            <div className="border-t pt-6">
              <Link
                href="/telegram/water"
                className="flex items-center justify-between w-full p-4 rounded-lg bg-blue-50 hover:bg-blue-100 dark:bg-blue-950 dark:hover:bg-blue-900 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">💧</span>
                  <div>
                    <h3 className="font-semibold text-blue-900 dark:text-blue-100">
                      Water Schedule
                    </h3>
                    <p className="text-sm text-blue-700 dark:text-blue-300">
                      View today&apos;s water supply timings
                    </p>
                  </div>
                </div>
                <span className="text-blue-600 dark:text-blue-400">→</span>
              </Link>
            </div>
          </div>
        ) : (
          <OpenInTelegramInfo />
        )}
      </div>
    </div>
  );
}

export default TelegramPageUI;
