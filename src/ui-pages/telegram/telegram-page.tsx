"use client";

import useTelegram from "@/hooks/useTelegram";
import BackButton from "./components/BackButton";
import OpenInTelegramInfo from "./components/OpenInTelegramInfo";
import ProfileCard from "./components/ProfileCard";

export function TelegramPageUI() {
  const { tg, user } = useTelegram();

  return (
    <div className="relative min-h-screen flex items-center justify-center p-8 pt-20">
      <BackButton />

      <div className="max-w-4xl w-full bg-background/80 rounded-lg p-8 shadow">
        {user ? <ProfileCard user={user} tg={tg} /> : <OpenInTelegramInfo />}
      </div>
    </div>
  );
}

export default TelegramPageUI;
