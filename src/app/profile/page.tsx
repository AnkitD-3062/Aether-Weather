"use client";

import { FormEvent } from "react";

import { MoodBackdrop } from "@/components/mood-backdrop";
import { GlassCard } from "@/components/ui/glass-card";
import { PillButton } from "@/components/ui/pill-button";
import { moodLabels, moodOrder } from "@/lib/moods";
import { useMood } from "@/providers/mood-provider";

export default function ProfilePage() {
  const { preferences, updatePreferences } = useMood();
  const displayName = "Ankit";
  const displayEmail = "ankit@moodplayer.local";

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
  }

  return (
    <main className="screen-container">
      <MoodBackdrop mood={preferences.defaultMood} />
      <div className="relative mx-auto max-w-xl space-y-6">
        <GlassCard className="ambient-panel space-y-4 pt-8">
          <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full border border-white/10 bg-white/8 text-3xl">
            {displayName.charAt(0).toUpperCase()}
          </div>
          <div className="text-center">
            <p className="display-copy text-3xl text-white">{displayName}</p>
            <p className="mt-2 text-sm text-white/56">{displayEmail}</p>
          </div>
        </GlassCard>

        <form onSubmit={handleSubmit} className="space-y-4">
          <GlassCard className="space-y-4">
            <p className="text-lg font-semibold text-white">Preferences</p>
            <label className="block space-y-2">
              <span className="text-sm text-white/62">Default mood</span>
              <select
                value={preferences.defaultMood}
                onChange={(event) => updatePreferences({ defaultMood: event.target.value as typeof preferences.defaultMood })}
                className="w-full rounded-[20px] border border-white/10 bg-black/14 px-4 py-4 text-sm text-white outline-none"
              >
                {moodOrder.map((mood) => (
                  <option key={mood} value={mood}>
                    {moodLabels[mood]}
                  </option>
                ))}
              </select>
            </label>
            <label className="flex items-center justify-between rounded-[20px] border border-white/8 bg-white/4 px-4 py-4">
              <span className="text-sm text-white/70">Adaptive theme</span>
              <input
                type="checkbox"
                checked={preferences.adaptiveTheme}
                onChange={(event) => updatePreferences({ adaptiveTheme: event.target.checked })}
              />
            </label>
          </GlassCard>

          <GlassCard className="space-y-4">
            <p className="text-lg font-semibold text-white">Settings</p>
            <label className="flex items-center justify-between rounded-[20px] border border-white/8 bg-white/4 px-4 py-4">
              <span className="text-sm text-white/70">Notifications</span>
              <input
                type="checkbox"
                checked={preferences.notifications}
                onChange={(event) => updatePreferences({ notifications: event.target.checked })}
              />
            </label>
            <label className="flex items-center justify-between rounded-[20px] border border-white/8 bg-white/4 px-4 py-4">
              <span className="text-sm text-white/70">Privacy mode</span>
              <input
                type="checkbox"
                checked={preferences.privacyMode}
                onChange={(event) => updatePreferences({ privacyMode: event.target.checked })}
              />
            </label>
          </GlassCard>

          <PillButton type="button" variant="secondary" className="w-full" onClick={() => window.location.assign("/mood")}>
            Pick a new mood
          </PillButton>
        </form>
      </div>
    </main>
  );
}
