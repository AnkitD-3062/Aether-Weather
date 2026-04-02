import {
  ActiveMoodResult,
  ListeningEvent,
  MoodHistoryEntry,
  UserPreferences,
  UserProfile,
} from "@/lib/types";

const storageKeys = {
  onboarded: "mbmp:onboarded",
  user: "mbmp:user",
  mood: "mbmp:active-mood",
  preferences: "mbmp:preferences",
  moodHistory: "mbmp:mood-history",
  listeningEvents: "mbmp:listening-events",
  recentSongIds: "mbmp:recent-song-ids",
} as const;

const defaultPreferences: UserPreferences = {
  defaultMood: "calm",
  adaptiveTheme: true,
  notifications: true,
  privacyMode: false,
};

function hasWindow() {
  return typeof window !== "undefined";
}

function readJSON<T>(key: string, fallback: T): T {
  if (!hasWindow()) return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

function writeJSON<T>(key: string, value: T) {
  if (!hasWindow()) return;
  window.localStorage.setItem(key, JSON.stringify(value));
}

export function getOnboarded() {
  if (!hasWindow()) return false;
  return window.localStorage.getItem(storageKeys.onboarded) === "true";
}

export function setOnboarded(value: boolean) {
  if (!hasWindow()) return;
  window.localStorage.setItem(storageKeys.onboarded, value ? "true" : "false");
}

export function getStoredUser() {
  return readJSON<UserProfile | null>(storageKeys.user, null);
}

export function setStoredUser(user: UserProfile | null) {
  if (!user && hasWindow()) {
    window.localStorage.removeItem(storageKeys.user);
    return;
  }
  writeJSON(storageKeys.user, user);
}

export function getStoredMood() {
  return readJSON<ActiveMoodResult | null>(storageKeys.mood, null);
}

export function setStoredMood(value: ActiveMoodResult) {
  writeJSON(storageKeys.mood, value);
}

export function getPreferences() {
  return readJSON<UserPreferences>(storageKeys.preferences, defaultPreferences);
}

export function setPreferences(value: UserPreferences) {
  writeJSON(storageKeys.preferences, value);
}

export function getMoodHistory() {
  return readJSON<MoodHistoryEntry[]>(storageKeys.moodHistory, []);
}

export function appendMoodHistory(entry: MoodHistoryEntry) {
  const existing = getMoodHistory();
  writeJSON(storageKeys.moodHistory, [entry, ...existing].slice(0, 50));
}

export function getListeningEvents() {
  return readJSON<ListeningEvent[]>(storageKeys.listeningEvents, []);
}

export function appendListeningEvent(event: ListeningEvent) {
  const existing = getListeningEvents();
  writeJSON(storageKeys.listeningEvents, [event, ...existing].slice(0, 120));
}

export function getRecentSongIds() {
  return readJSON<string[]>(storageKeys.recentSongIds, []);
}

export function pushRecentSongId(songId: string) {
  const existing = getRecentSongIds().filter((id) => id !== songId);
  writeJSON(storageKeys.recentSongIds, [songId, ...existing].slice(0, 10));
}
