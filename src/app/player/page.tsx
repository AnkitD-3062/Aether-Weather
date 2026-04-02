"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ChevronLeft, Heart, ListMusic, Pause, Play, Repeat2, Shuffle, SkipBack, SkipForward } from "lucide-react";

import { MoodBackdrop } from "@/components/mood-backdrop";
import { Waveform } from "@/components/waveform";
import { CoverArt } from "@/components/ui/cover-art";
import { GlassCard } from "@/components/ui/glass-card";
import { moodEmoji, moodLabels } from "@/lib/moods";
import { formatDuration } from "@/lib/utils";
import { useMood } from "@/providers/mood-provider";
import { usePlayer } from "@/providers/player-provider";

export default function PlayerPage() {
  const { activeMood } = useMood();
  const {
    currentSong,
    currentTime,
    duration,
    isPlaying,
    togglePlayback,
    nextTrack,
    previousTrack,
    seekTo,
    lyricsOpen,
    setLyricsOpen,
    recordFeedback,
  } = usePlayer();

  const mood = currentSong?.mood ?? activeMood?.mood ?? "calm";

  return (
    <main className="screen-container">
      <MoodBackdrop mood={mood} />
      <div className="relative mx-auto max-w-xl space-y-6">
        <header className="flex items-center justify-between pt-2">
          <Link href="/home" className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/6">
            <ChevronLeft className="h-4 w-4 text-white/80" />
          </Link>
          <p className="text-sm uppercase tracking-[0.35em] text-white/48">Now Playing</p>
          <button className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/6">
            <Heart className="h-4 w-4 text-white/80" />
          </button>
        </header>

        <motion.div
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          onDragEnd={(_, info) => {
            if (info.offset.x < -80) {
              recordFeedback("skip", mood);
              nextTrack();
            } else if (info.offset.x > 80) {
              previousTrack();
            }
          }}
          className="relative flex justify-center"
        >
          <div className="absolute inset-x-1/2 top-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/8" />
          <div className="absolute inset-x-1/2 top-1/2 h-[22rem] w-[22rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/6" />
          <button onClick={() => setLyricsOpen(!lyricsOpen)} className="cursor-pointer">
            <CoverArt mood={mood} title={currentSong?.title ?? "No track"} size="lg" />
          </button>
        </motion.div>

        <div className="space-y-3 text-center">
          <p className="display-copy text-4xl text-white">{currentSong?.title ?? "Choose a mood first"}</p>
          <p className="text-sm text-white/62">{currentSong?.genres.join(" / ") ?? "Mood-driven playlist"}</p>
          <div className="mx-auto inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/7 px-4 py-2 text-sm text-white/85">
            Playing for: {moodLabels[mood]} {moodEmoji[mood]}
          </div>
        </div>

        <GlassCard className="ambient-panel space-y-4">
          <Waveform mood={mood} />
          <div className="space-y-2">
            <input
              type="range"
              min={0}
              max={duration || 100}
              value={currentTime}
              onChange={(event) => seekTo(Number(event.target.value))}
              className="w-full accent-[var(--mood-accent)]"
            />
            <div className="flex items-center justify-between text-xs text-white/45">
              <span>{formatDuration(Math.floor(currentTime))}</span>
              <span>{formatDuration(Math.floor(duration || currentSong?.duration || 0))}</span>
            </div>
          </div>
        </GlassCard>

        <div className="flex items-center justify-center gap-5">
          {[Shuffle, SkipBack].map((Icon, index) => (
            <button
              key={index}
              onClick={index === 1 ? previousTrack : undefined}
              className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/7 text-white/75"
            >
              <Icon className="h-5 w-5" />
            </button>
          ))}
          <button
            onClick={() => {
              togglePlayback();
              recordFeedback(isPlaying ? "pause" : "play", mood);
            }}
            className="inline-flex h-20 w-20 items-center justify-center rounded-full bg-[var(--mood-gradient)] text-slate-950 shadow-[0_0_40px_var(--mood-glow)]"
          >
            {isPlaying ? <Pause className="h-8 w-8 fill-current" /> : <Play className="h-8 w-8 fill-current" />}
          </button>
          {[SkipForward, Repeat2].map((Icon, index) => (
            <button
              key={index}
              onClick={index === 0 ? nextTrack : undefined}
              className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/7 text-white/75"
            >
              <Icon className="h-5 w-5" />
            </button>
          ))}
        </div>

        <GlassCard className="ambient-panel space-y-4">
          <div className="flex items-center justify-between">
            <p className="text-sm font-semibold text-white">Lyrics view</p>
            <button onClick={() => setLyricsOpen(!lyricsOpen)} className="text-sm text-white/52">
              {lyricsOpen ? "Hide" : "Tap to open"}
            </button>
          </div>
          {lyricsOpen ? (
            <div className="space-y-3 text-sm leading-7 text-white/72">
              {currentSong?.lyrics.map((line) => (
                <p key={line}>{line}</p>
              ))}
            </div>
          ) : (
            <p className="text-sm leading-7 text-white/56">
              Tap the album art to reveal lyrics. Swipe left or right on the cover to jump between songs.
            </p>
          )}
        </GlassCard>

        <GlassCard className="ambient-panel flex items-center justify-between">
          <div>
            <p className="text-sm font-semibold text-white">Up next</p>
            <p className="text-sm text-white/58">Shared with Home and the mini player</p>
          </div>
          <ListMusic className="h-5 w-5 text-white/68" />
        </GlassCard>
      </div>
    </main>
  );
}
