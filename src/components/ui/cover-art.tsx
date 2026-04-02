import { Music4 } from "lucide-react";

import { moodEmoji, moodThemes } from "@/lib/moods";
import { Mood } from "@/lib/types";
import { cn } from "@/lib/utils";

export function CoverArt({
  mood,
  title,
  size = "md",
  className,
}: {
  mood: Mood;
  title: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}) {
  const theme = moodThemes[mood];
  const dimension = size === "lg" ? "h-72 w-72" : size === "sm" ? "h-14 w-14" : "h-24 w-24";

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-[28px] border border-white/12 shadow-[0_0_48px_var(--mood-glow)]",
        dimension,
        className,
      )}
      style={{ background: theme.gradient }}
      aria-label={title}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.35),transparent_40%)]" />
      <div className="absolute inset-x-4 bottom-4 rounded-full border border-white/15 bg-black/18 px-3 py-1 text-[11px] text-white/75 backdrop-blur-md">
        {moodEmoji[mood]} {title}
      </div>
      <Music4 className="absolute right-5 top-5 h-6 w-6 text-white/90" />
    </div>
  );
}
