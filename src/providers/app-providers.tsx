"use client";

import { MoodProvider } from "@/providers/mood-provider";
import { PlayerProvider } from "@/providers/player-provider";

export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <MoodProvider>
      <PlayerProvider>{children}</PlayerProvider>
    </MoodProvider>
  );
}
