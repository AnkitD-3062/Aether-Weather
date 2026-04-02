"use client";

import { motion } from "framer-motion";

import { Mood } from "@/lib/types";

const bars = [18, 30, 22, 40, 16, 52, 28, 38, 22, 46, 18, 34, 26, 42];

export function Waveform({ mood }: { mood: Mood }) {
  return (
    <div className="flex h-16 items-end justify-between gap-1">
      {bars.map((bar, index) => (
        <motion.span
          key={`${mood}-${bar}-${index}`}
          initial={{ height: `${bar}%`, opacity: 0.45 }}
          animate={{
            height:
              mood === "angry"
                ? [`${bar}%`, `${Math.min(bar + 20, 100)}%`, `${bar}%`]
                : mood === "happy"
                  ? [`${bar}%`, `${Math.min(bar + 10, 100)}%`, `${bar - 4}%`, `${bar}%`]
                  : [`${bar}%`, `${Math.min(bar + 8, 100)}%`, `${bar}%`],
            opacity: [0.4, 1, 0.45],
          }}
          transition={{
            duration: mood === "calm" ? 2.6 : mood === "focus" ? 1.5 : 1.1,
            repeat: Number.POSITIVE_INFINITY,
            delay: index * 0.06,
          }}
          className="w-full rounded-full bg-[var(--mood-gradient)]"
        />
      ))}
    </div>
  );
}
