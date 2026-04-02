"use client";

import Link from "next/link";
import { Bell, Play } from "lucide-react";

import { MoodBackdrop } from "@/components/mood-backdrop";
import { PlaylistCard } from "@/components/playlist-card";
import { SectionHeader } from "@/components/section-header";
import { SongRow } from "@/components/song-row";
import { CoverArt } from "@/components/ui/cover-art";
import { GlassCard } from "@/components/ui/glass-card";
import { PillButton } from "@/components/ui/pill-button";
import { moodLabels } from "@/lib/moods";
import { generateRecommendations } from "@/lib/recommendations";
import { getListeningEvents, getRecentSongIds } from "@/lib/storage";
import { useMood } from "@/providers/mood-provider";
import { usePlayer } from "@/providers/player-provider";

export default function HomePage() {
  const { activeMood } = useMood();
  const { setQueueAndPlay } = usePlayer();

  const mood = activeMood?.mood ?? "calm";
  const dashboard = generateRecommendations(mood, getListeningEvents(), getRecentSongIds());
  const featuredSongs = dashboard.featuredPlaylist.songIds
    .map((id) => dashboard.moodSongs.find((song) => song.id === id))
    .filter((song): song is NonNullable<typeof song> => Boolean(song));

  return (
    <main className="screen-container">
      <MoodBackdrop mood={mood} />
      <div className="relative mx-auto max-w-xl space-y-8">
        <header className="flex items-start justify-between pt-2">
          <div>
            <p className="display-copy text-4xl text-white">Good evening, Ankit</p>
            <p className="mt-2 text-sm text-[var(--mood-accent-soft)]">Feeling {moodLabels[mood]} today</p>
          </div>
          <button className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/6">
            <Bell className="h-4 w-4 text-white/80" />
          </button>
        </header>

        <GlassCard className="ambient-panel noise-overlay overflow-hidden px-6 py-6">
          <div className="absolute inset-0 opacity-80" style={{ background: "var(--mood-gradient)" }} />
          <div className="relative space-y-5">
            <div className="flex flex-wrap items-center gap-2">
              <div className="inline-flex items-center rounded-full border border-white/15 bg-black/18 px-3 py-1 text-xs uppercase tracking-[0.28em] text-white/75">
                {moodLabels[mood]}
              </div>
              <div className="inline-flex items-center rounded-full border border-white/10 bg-white/10 px-3 py-1 text-xs text-white/80">
                Dynamic dashboard
              </div>
            </div>

            <div className="flex items-end justify-between gap-4">
              <div className="space-y-3">
                <h1 className="display-copy text-4xl text-white">{dashboard.featuredPlaylist.title}</h1>
                <p className="max-w-xs text-sm leading-7 text-white/75">{dashboard.featuredPlaylist.description}</p>
              </div>
              <CoverArt mood={dashboard.featuredPlaylist.mood} title={dashboard.featuredPlaylist.title} />
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div className="rounded-[22px] border border-white/10 bg-black/14 p-3">
                <p className="text-xs uppercase tracking-[0.24em] text-white/45">Mood</p>
                <p className="mt-2 text-sm font-semibold text-white">{moodLabels[mood]}</p>
              </div>
              <div className="rounded-[22px] border border-white/10 bg-black/14 p-3">
                <p className="text-xs uppercase tracking-[0.24em] text-white/45">Energy</p>
                <p className="mt-2 text-sm font-semibold text-white">{dashboard.moodSongs[0]?.energy ?? "Low"}</p>
              </div>
              <div className="rounded-[22px] border border-white/10 bg-black/14 p-3">
                <p className="text-xs uppercase tracking-[0.24em] text-white/45">Genre</p>
                <p className="mt-2 text-sm font-semibold text-white">{dashboard.moodSongs[0]?.genres[0] ?? "Ambient"}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <PillButton
                onClick={() => {
                  if (featuredSongs.length) setQueueAndPlay(featuredSongs, featuredSongs[0]);
                }}
              >
                <Play className="mr-2 h-4 w-4 fill-current" />
                Play now
              </PillButton>
              <Link href="/mood" className="text-sm text-white/80">
                Change mood
              </Link>
            </div>
          </div>
        </GlassCard>

        <section>
          <SectionHeader title="Recommended for you" action="See all" />
          <div className="flex gap-4 overflow-x-auto pb-2">
            {dashboard.recommendedPlaylists.map((playlist) => (
              <PlaylistCard key={playlist.id} playlist={playlist} />
            ))}
          </div>
        </section>

        <section>
          <SectionHeader title="Recently played" />
          <div className="space-y-3">
            {(dashboard.recentlyPlayed.length ? dashboard.recentlyPlayed : dashboard.moodSongs.slice(0, 3)).map((song) => (
              <SongRow key={song.id} song={song} onAction={() => setQueueAndPlay(dashboard.moodSongs, song)} />
            ))}
          </div>
        </section>

        <section className="space-y-4">
          <SectionHeader title="Based on your mood" />
          <div className="space-y-3">
            {dashboard.moodSongs.slice(0, 4).map((song) => (
              <SongRow
                key={song.id}
                song={song}
                subtitle={`${song.genres.join(" / ")} / ${song.energy} energy`}
                onAction={() => setQueueAndPlay(dashboard.moodSongs, song)}
              />
            ))}
          </div>
        </section>

        <GlassCard className="ambient-panel space-y-2">
          <p className="text-xs uppercase tracking-[0.28em] text-white/42">{dashboard.insight.title}</p>
          <p className="text-sm leading-7 text-white/72">{dashboard.insight.body}</p>
        </GlassCard>
      </div>
    </main>
  );
}
