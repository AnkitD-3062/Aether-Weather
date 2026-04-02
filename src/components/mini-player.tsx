"use client";

import Link from "next/link";
import { Pause, Play, SkipForward } from "lucide-react";

import { CoverArt } from "@/components/ui/cover-art";
import { usePlayer } from "@/providers/player-provider";

export function MiniPlayer() {
  const { currentSong, isPlaying, togglePlayback, nextTrack } = usePlayer();

  if (!currentSong) return null;

  return (
    <div className="fixed inset-x-4 bottom-24 z-40 mx-auto max-w-xl rounded-full border border-white/10 bg-slate-950/80 p-3 shadow-[0_20px_60px_rgba(2,6,23,0.55)] backdrop-blur-2xl">
      <div className="flex items-center gap-3">
        <Link href="/player" className="flex min-w-0 flex-1 items-center gap-3">
          <CoverArt mood={currentSong.mood} title={currentSong.title} size="sm" className="rounded-2xl" />
          <div className="min-w-0">
            <div className="truncate text-sm font-semibold text-white">{currentSong.title}</div>
            <div className="truncate text-xs text-white/60">{currentSong.genres.join(" · ")}</div>
          </div>
        </Link>
        <button
          onClick={togglePlayback}
          className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-[var(--mood-gradient)] text-slate-950 shadow-[0_0_20px_var(--mood-glow)]"
        >
          {isPlaying ? <Pause className="h-4 w-4 fill-current" /> : <Play className="h-4 w-4 fill-current" />}
        </button>
        <button
          onClick={nextTrack}
          className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/7 text-white/80"
        >
          <SkipForward className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
