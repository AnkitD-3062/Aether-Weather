import { playlists, songs } from "@/lib/catalog";
import { moodCopy, moodOrder } from "@/lib/moods";
import {
  ActiveMoodResult,
  DashboardPayload,
  ListeningEvent,
  Mood,
  MoodHistoryEntry,
  MoodHistoryPayload,
  RecommendationInsight,
  Song,
} from "@/lib/types";

const textRules: Array<{ mood: Mood; keywords: string[] }> = [
  { mood: "sad", keywords: ["low", "down", "sad", "hurt", "empty", "miss", "blue"] },
  { mood: "happy", keywords: ["excited", "happy", "great", "good", "buzzing", "joy", "hype", "af"] },
  { mood: "angry", keywords: ["frustrated", "angry", "mad", "rage", "annoyed", "furious"] },
  { mood: "calm", keywords: ["calm", "peaceful", "relaxed", "easy", "slow", "quiet"] },
  { mood: "focus", keywords: ["focus", "study", "work", "lock in", "productive", "deep work"] },
];

export function selectMood(input: Mood | string): ActiveMoodResult {
  if (moodOrder.includes(input as Mood)) {
    return { mood: input as Mood, confidence: 1, source: "manual" };
  }

  const value = input.toLowerCase().trim();
  for (const rule of textRules) {
    if (rule.keywords.some((keyword) => value.includes(keyword))) {
      return {
        mood: rule.mood,
        confidence: 0.86,
        source: "text",
        input,
      };
    }
  }

  return {
    mood: "calm",
    confidence: 0.4,
    source: "text",
    input,
  };
}

function songWeight(song: Song, events: ListeningEvent[]) {
  return events.reduce((score, event) => {
    if (event.songId !== song.id) return score;
    if (event.type === "replay" || event.type === "like" || event.type === "complete") return score + 3;
    if (event.type === "play") return score + 1;
    if (event.type === "skip") return score - 2;
    return score;
  }, 0);
}

export function generateRecommendations(
  mood: Mood,
  events: ListeningEvent[],
  recentSongIds: string[],
): DashboardPayload {
  const featuredPlaylist = playlists.find((playlist) => playlist.mood === mood) ?? playlists[0];
  const moodSongs = songs
    .filter((song) => song.mood === mood)
    .sort((a, b) => songWeight(b, events) - songWeight(a, events));

  const recommendedPlaylists = [featuredPlaylist, ...playlists.filter((playlist) => playlist.mood !== mood)].slice(0, 4);
  const recentlyPlayed = recentSongIds
    .map((id) => songs.find((song) => song.id === id))
    .filter((song): song is Song => Boolean(song))
    .slice(0, 4);

  const insight: RecommendationInsight =
    events.some((event) => event.type === "skip" && event.mood === mood)
      ? {
          title: "Improving recommendations",
          body: `You skipped a few ${mood} picks recently, so the next mix leans more on ${moodSongs[0]?.genres[0] ?? "your strongest genres"}.`,
        }
      : {
          title: "Built around your current vibe",
          body: moodCopy[mood].hero,
        };

  return {
    featuredPlaylist,
    recommendedPlaylists,
    moodSongs,
    recentlyPlayed,
    insight,
  };
}

function moodValue(mood: Mood) {
  return moodOrder.indexOf(mood) + 1;
}

export function getMoodHistory(
  range: "week" | "month",
  history: MoodHistoryEntry[],
  events: ListeningEvent[],
): MoodHistoryPayload {
  const now = new Date();
  const days = range === "week" ? 7 : 30;
  const cutoff = now.getTime() - days * 24 * 60 * 60 * 1000;
  const filteredHistory = history.filter((entry) => new Date(entry.createdAt).getTime() >= cutoff);
  const filteredEvents = events.filter((entry) => new Date(entry.createdAt).getTime() >= cutoff);

  const moodCounts = new Map<Mood, number>();
  filteredHistory.forEach((entry) => moodCounts.set(entry.mood, (moodCounts.get(entry.mood) ?? 0) + 1));
  const dominantMood =
    [...moodCounts.entries()].sort((a, b) => b[1] - a[1])[0]?.[0] ?? "calm";
  const totalMoodEntries = filteredHistory.length || 1;
  const dominantPercentage = Math.round(((moodCounts.get(dominantMood) ?? 0) / totalMoodEntries) * 100);

  const moodPlayCounts = new Map<Mood, number>();
  const genreCounts = new Map<string, number>();
  const hours = new Map<number, number>();
  filteredEvents.forEach((event) => {
    moodPlayCounts.set(event.mood, (moodPlayCounts.get(event.mood) ?? 0) + 1);
    const song = songs.find((item) => item.id === event.songId);
    song?.genres.forEach((genre) => genreCounts.set(genre, (genreCounts.get(genre) ?? 0) + 1));
    const hour = new Date(event.createdAt).getHours();
    hours.set(hour, (hours.get(hour) ?? 0) + 1);
  });

  const mostPlayedMood = [...moodPlayCounts.entries()].sort((a, b) => b[1] - a[1])[0]?.[0] ?? dominantMood;
  const topGenre = [...genreCounts.entries()].sort((a, b) => b[1] - a[1])[0]?.[0] ?? "Lo-fi";
  const peakHour = [...hours.entries()].sort((a, b) => b[1] - a[1])[0]?.[0] ?? 21;
  const peakTimeLabel =
    peakHour >= 18 ? "Evening sessions" : peakHour >= 12 ? "Afternoon sessions" : "Morning sessions";

  const moodTrend = Array.from({ length: range === "week" ? 7 : 6 }, (_, index) => {
    const target = new Date(now);
    target.setDate(now.getDate() - (range === "week" ? 6 - index : (5 - index) * 5));
    const label = range === "week"
      ? target.toLocaleDateString("en-US", { weekday: "short" })
      : `W${index + 1}`;
    const closest = filteredHistory[index] ?? filteredHistory[0];
    return {
      label,
      mood: closest?.mood ?? dominantMood,
      value: moodValue(closest?.mood ?? dominantMood),
    };
  });

  const timeline = filteredHistory.slice(0, 6).map((entry) => ({
    id: entry.id,
    label: `${entry.mood.charAt(0).toUpperCase() + entry.mood.slice(1)} session`,
    detail: entry.note || `Logged via ${entry.source === "text" ? "text check-in" : "mood selection"}`,
    mood: entry.mood,
    createdAt: entry.createdAt,
  }));

  return {
    dominantMood,
    dominantPercentage,
    totalListeningMinutes: Math.round(filteredEvents.length * 3.5),
    mostPlayedMood,
    topGenre,
    peakTimeLabel,
    insight: {
      title: `You felt ${dominantMood.charAt(0).toUpperCase() + dominantMood.slice(1)} ${dominantPercentage}% this ${range}`,
      body: `Your music leaned toward ${topGenre.toLowerCase()} and your strongest listening moments landed in ${peakTimeLabel.toLowerCase()}.`,
    },
    moodTrend,
    timeline,
  };
}
