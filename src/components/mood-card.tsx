"use client";

import { motion } from "framer-motion";

import { moodDescriptors, moodEmoji, moodLabels, moodThemes } from "@/lib/moods";
import { Mood } from "@/lib/types";
import { cn } from "@/lib/utils";

export function MoodCard({
  mood,
  selected,
  onSelect,
}: {
  mood: Mood;
  selected: boolean;
  onSelect: () => void;
}) {
  const theme = moodThemes[mood];

  return (
    <motion.button
      whileTap={{ scale: 0.97 }}
      animate={selected ? { scale: 1.03, y: -2 } : { scale: 1, y: 0 }}
      transition={theme.motion}
      onClick={onSelect}
      className={cn(
        "relative overflow-hidden rounded-[28px] border bg-white/6 p-5 text-left backdrop-blur-xl transition",
        selected ? "border-white/25 shadow-[0_0_32px_var(--mood-glow)]" : "border-white/10",
      )}
      style={{ boxShadow: selected ? `0 0 30px ${theme.glow}` : undefined }}
    >
      <div className="absolute inset-0 opacity-80" style={{ background: selected ? theme.gradient : "transparent" }} />
      <div className="absolute -right-10 -top-10 h-28 w-28 rounded-full blur-3xl" style={{ background: theme.glow }} />
      <div className="relative flex items-start justify-between">
        <div>
          <div className="mb-6 text-3xl">{moodEmoji[mood]}</div>
          <div className="text-lg font-semibold text-white">{moodLabels[mood]}</div>
          <p className="mt-2 max-w-32 text-sm text-white/72">{moodDescriptors[mood]}</p>
        </div>
        <span
          className={cn(
            "mt-1 inline-flex h-6 w-6 items-center justify-center rounded-full border text-xs",
            selected ? "border-white/25 bg-black/20 text-white" : "border-white/10 text-white/50",
          )}
        >
          {selected ? "✓" : ""}
        </span>
      </div>
    </motion.button>
  );
}
