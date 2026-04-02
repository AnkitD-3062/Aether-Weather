import { Play, SkipForward } from "lucide-react";

import { CoverArt } from "@/components/ui/cover-art";
import { Song } from "@/lib/types";
import { formatDuration } from "@/lib/utils";

export function SongRow({
  song,
  subtitle,
  actionLabel = "Play",
  onAction,
}: {
  song: Song;
  subtitle?: string;
  actionLabel?: string;
  onAction?: () => void;
}) {
  return (
    <div className="flex items-center gap-3 rounded-[24px] border border-white/8 bg-white/4 p-3 backdrop-blur-lg">
      <CoverArt mood={song.mood} title={song.title} size="sm" />
      <div className="min-w-0 flex-1">
        <div className="truncate text-sm font-medium text-white">{song.title}</div>
        <div className="truncate text-xs text-white/55">{subtitle ?? song.genres.join(" · ")}</div>
      </div>
      <div className="text-xs text-white/45">{formatDuration(song.duration)}</div>
      <button
        aria-label={actionLabel}
        onClick={onAction}
        className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-black/18 text-white/80 transition hover:text-white"
      >
        {actionLabel === "Next" ? <SkipForward className="h-4 w-4" /> : <Play className="h-4 w-4 fill-current" />}
      </button>
    </div>
  );
}
