"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";

import { moodThemes } from "@/lib/moods";
import {
  getOnboarded,
  getPreferences,
  getStoredMood,
  setOnboarded,
  setPreferences,
  setStoredMood,
  appendMoodHistory,
} from "@/lib/storage";
import { ActiveMoodResult, Mood, UserPreferences } from "@/lib/types";
import { createId } from "@/lib/utils";

interface MoodContextValue {
  activeMood: ActiveMoodResult | null;
  preferences: UserPreferences;
  onboarded: boolean;
  setMood: (value: ActiveMoodResult, note?: string) => void;
  updatePreferences: (value: Partial<UserPreferences>) => void;
  completeOnboarding: () => void;
}

const MoodContext = createContext<MoodContextValue | null>(null);

function applyMoodToDocument(mood: Mood) {
  if (typeof document === "undefined") return;
  document.documentElement.dataset.mood = mood;
  document.documentElement.style.setProperty("--mood-accent", moodThemes[mood].accent);
  document.documentElement.style.setProperty("--mood-accent-soft", moodThemes[mood].accentSoft);
  document.documentElement.style.setProperty("--mood-glow", moodThemes[mood].glow);
  document.documentElement.style.setProperty("--mood-gradient", moodThemes[mood].gradient);
}

export function MoodProvider({ children }: { children: React.ReactNode }) {
  const [activeMood, setActiveMood] = useState<ActiveMoodResult | null>(() => getStoredMood());
  const [preferences, setPreferencesState] = useState<UserPreferences>(() => getPreferences());
  const [onboarded, setOnboardedState] = useState(() => getOnboarded());

  useEffect(() => {
    applyMoodToDocument(activeMood?.mood ?? preferences.defaultMood);
  }, [activeMood, preferences.defaultMood]);

  const value = useMemo<MoodContextValue>(
    () => ({
      activeMood,
      preferences,
      onboarded,
      setMood(value, note) {
        setActiveMood(value);
        setStoredMood(value);
        appendMoodHistory({
          id: createId("mood"),
          mood: value.mood,
          source: value.source,
          note,
          createdAt: new Date().toISOString(),
        });
        applyMoodToDocument(value.mood);
      },
      updatePreferences(value) {
        const next = { ...preferences, ...value };
        setPreferencesState(next);
        setPreferences(next);
        if (!activeMood && value.defaultMood) {
          applyMoodToDocument(value.defaultMood);
        }
      },
      completeOnboarding() {
        setOnboardedState(true);
        setOnboarded(true);
      },
    }),
    [activeMood, onboarded, preferences],
  );

  return <MoodContext.Provider value={value}>{children}</MoodContext.Provider>;
}

export function useMood() {
  const context = useContext(MoodContext);
  if (!context) throw new Error("useMood must be used within MoodProvider");
  return context;
}
