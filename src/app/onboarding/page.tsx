"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

import { MoodBackdrop } from "@/components/mood-backdrop";
import { GlassCard } from "@/components/ui/glass-card";
import { PillButton } from "@/components/ui/pill-button";
import { useMood } from "@/providers/mood-provider";

const slides = [
  {
    title: "Music that understands your mood",
    copy: "Choose a feeling and the app builds a soundtrack with the right tempo, energy, and atmosphere.",
    mood: "calm" as const,
    art: "✦",
  },
  {
    title: "Dynamic UI that changes with you",
    copy: "Color, motion, background, and micro-interactions all shift live with your emotional state.",
    mood: "happy" as const,
    art: "◌",
  },
  {
    title: "Your vibe. Your soundtrack.",
    copy: "The more you listen, skip, and replay, the smarter the recommendations become.",
    mood: "focus" as const,
    art: "◎",
  },
];

export default function OnboardingPage() {
  const router = useRouter();
  const [index, setIndex] = useState(0);
  const { completeOnboarding } = useMood();
  const slide = useMemo(() => slides[index], [index]);

  return (
    <main className="screen-container flex items-center justify-center">
      <MoodBackdrop mood={slide.mood} />
      <motion.div
        key={slide.title}
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
        className="relative mx-auto flex w-full max-w-md flex-col gap-6"
      >
        <GlassCard className="ambient-panel noise-overlay space-y-6 px-6 py-7">
          <div className="relative flex h-64 items-center justify-center rounded-[30px] border border-white/10 bg-black/16 text-white/85">
            <div className="absolute left-6 top-6 text-xs uppercase tracking-[0.35em] text-white/45">Mood flow</div>
            <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 text-center text-8xl text-white/14">{slide.art}</div>
            <div className="absolute left-10 top-20 h-28 w-28 rounded-full bg-white/10 blur-2xl" />
            <div className="absolute bottom-10 right-10 h-24 w-24 rounded-full bg-[var(--mood-glow)] blur-2xl" />
            <div className="relative rounded-full border border-white/15 bg-white/8 px-5 py-3 text-sm uppercase tracking-[0.42em] text-white/80 backdrop-blur-md">
              {slide.mood}
            </div>
          </div>
          <div className="space-y-3">
            <p className="text-xs uppercase tracking-[0.35em] text-white/45">Mood-driven onboarding</p>
            <h1 className="display-copy text-4xl leading-tight text-white">{slide.title}</h1>
            <p className="text-sm leading-7 text-white/68">{slide.copy}</p>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex gap-2">
              {slides.map((item, slideIndex) => (
                <span
                  key={item.title}
                  className={`h-2.5 rounded-full ${slideIndex === index ? "w-8 bg-white" : "w-2.5 bg-white/25"}`}
                />
              ))}
            </div>
            <PillButton
              onClick={() => {
                if (index === slides.length - 1) {
                  completeOnboarding();
                  router.push("/mood");
                  return;
                }
                setIndex((current) => current + 1);
              }}
            >
              {index === slides.length - 1 ? "Get Started" : "Next"}
            </PillButton>
          </div>
        </GlassCard>
      </motion.div>
    </main>
  );
}
