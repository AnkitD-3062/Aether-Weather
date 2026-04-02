"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

import { MoodBackdrop } from "@/components/mood-backdrop";
import { useMood } from "@/providers/mood-provider";

export default function SplashPage() {
  const router = useRouter();
  const { activeMood, onboarded } = useMood();

  useEffect(() => {
    const timeout = window.setTimeout(() => {
      if (!onboarded) router.replace("/onboarding");
      else if (!activeMood) router.replace("/mood");
      else router.replace("/home");
    }, 2200);

    return () => window.clearTimeout(timeout);
  }, [activeMood, onboarded, router]);

  return (
    <main className="screen-container flex items-center justify-center">
      <MoodBackdrop mood={activeMood?.mood ?? "calm"} />
      <motion.div
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="relative text-center"
      >
        <div className="mx-auto flex h-28 w-28 items-center justify-center rounded-[32px] border border-white/15 bg-white/8 text-5xl shadow-[0_0_60px_var(--mood-glow)] backdrop-blur-2xl">
          🎧
        </div>
        <h1 className="mt-8 text-3xl font-semibold tracking-tight text-white">Mood Based Music Player</h1>
        <p className="mt-3 text-sm uppercase tracking-[0.42em] text-white/55">Feel it. Hear it.</p>
      </motion.div>
    </main>
  );
}
