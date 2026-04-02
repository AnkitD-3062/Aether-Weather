"use client";

import { motion } from "framer-motion";

import { moodThemes } from "@/lib/moods";
import { Mood } from "@/lib/types";

export function MoodBackdrop({ mood }: { mood: Mood }) {
  const theme = moodThemes[mood];

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <motion.div
        animate={{ scale: [1, 1.08, 1], opacity: [0.4, 0.58, 0.4] }}
        transition={{ duration: mood === "calm" ? 10 : 6, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
        className="absolute left-[-18%] top-[-8%] h-64 w-64 rounded-full blur-3xl"
        style={{ background: theme.glow }}
      />
      <motion.div
        animate={{ y: [0, 18, 0], x: [0, -14, 0], opacity: [0.28, 0.45, 0.28] }}
        transition={{ duration: mood === "angry" ? 4 : 9, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
        className="absolute bottom-[-8%] right-[-10%] h-72 w-72 rounded-full blur-3xl"
        style={{ background: theme.gradient }}
      />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.08),transparent_45%)]" />
    </div>
  );
}
