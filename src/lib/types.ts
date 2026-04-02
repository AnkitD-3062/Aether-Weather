export type Mood = "happy" | "sad" | "angry" | "calm" | "focus";

export type Energy = "low" | "medium" | "high";

export type ListeningEventType =
  | "play"
  | "pause"
  | "skip"
  | "replay"
  | "seek"
  | "complete"
  | "like";

export interface Artist {
  id: string;
  name: string;
  tagline: string;
}

export interface Song {
  id: string;
  title: string;
  artistId: string;
  mood: Mood;
  genres: string[];
  bpm: [number, number];
  energy: Energy;
  duration: number;
  color: string;
  audioUrl: string;
  lyrics: string[];
}

export interface Playlist {
  id: string;
  title: string;
  description: string;
  mood: Mood;
  songIds: string[];
  accent: string;
}

export interface ActiveMoodResult {
  mood: Mood;
  confidence: number;
  source: "manual" | "text";
  input?: string;
}

export interface MoodHistoryEntry {
  id: string;
  mood: Mood;
  note?: string;
  source: "manual" | "text" | "system";
  createdAt: string;
}

export interface ListeningEvent {
  id: string;
  songId: string;
  type: ListeningEventType;
  mood: Mood;
  createdAt: string;
  metadata?: Record<string, string | number | boolean>;
}

export interface UserPreferences {
  defaultMood: Mood;
  adaptiveTheme: boolean;
  notifications: boolean;
  privacyMode: boolean;
}

export interface UserProfile {
  id: string;
  email: string;
  name: string;
}

export interface RecommendationInsight {
  title: string;
  body: string;
}

export interface DashboardPayload {
  featuredPlaylist: Playlist;
  recommendedPlaylists: Playlist[];
  moodSongs: Song[];
  recentlyPlayed: Song[];
  insight: RecommendationInsight;
}

export interface MoodHistoryPayload {
  dominantMood: Mood;
  dominantPercentage: number;
  totalListeningMinutes: number;
  mostPlayedMood: Mood;
  topGenre: string;
  peakTimeLabel: string;
  insight: RecommendationInsight;
  moodTrend: Array<{ label: string; mood: Mood; value: number }>;
  timeline: Array<{
    id: string;
    label: string;
    detail: string;
    mood: Mood;
    createdAt: string;
  }>;
}
