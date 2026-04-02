"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";

import { MoodBackdrop } from "@/components/mood-backdrop";
import { MoodCard } from "@/components/mood-card";
import { GlassCard } from "@/components/ui/glass-card";
import { PillButton } from "@/components/ui/pill-button";
import { moodCopy, moodOrder } from "@/lib/moods";
import { selectMood } from "@/lib/recommendations";
import { Mood } from "@/lib/types";
import { useMood } from "@/providers/mood-provider";

export default function MoodSelectionPage() {
  const router = useRouter();
  const { activeMood, setMood } = useMood();
  const [selectedMood, setSelectedMood] = useState<Mood | null>(activeMood?.mood ?? null);
  const [note, setNote] = useState("");
  const previewMood = useMemo(() => selectedMood ?? "calm", [selectedMood]);

  return (
    <main className="screen-container">
      <MoodBackdrop mood={previewMood} />
      <div className="relative mx-auto max-w-xl space-y-6">
        <div className="space-y-3 pt-4">
          <p className="text-xs uppercase tracking-[0.38em] text-white/42">Mood check-in</p>
          <h1 className="display-copy max-w-md text-5xl leading-[1.05] text-white">How are you feeling right now?</h1>
          <p className="max-w-md text-sm leading-7 text-white/65">
            Pick a mood and we’ll build your soundtrack around it. The whole interface shifts with you in real time.
          </p>
        </div>
        <GlassCard className="ambient-panel overflow-hidden">
          <div className="absolute inset-0 opacity-70" style={{ background: "var(--mood-gradient)" }} />
          <div className="relative flex items-center justify-between gap-4">
            <div className="space-y-2">
              <p className="text-xs uppercase tracking-[0.35em] text-white/55">Live preview</p>
              <p className="text-2xl font-semibold text-white">Current vibe: {previewMood}</p>
              <p className="max-w-xs text-sm leading-6 text-white/70">{moodCopy[previewMood].hero}</p>
            </div>
            <div className="rounded-full border border-white/15 bg-black/18 px-5 py-6 text-4xl backdrop-blur-md">
              {previewMood === "happy" ? "☼" : previewMood === "sad" ? "◐" : previewMood === "angry" ? "✦" : previewMood === "calm" ? "◌" : "⌁"}
            </div>
          </div>
        </GlassCard>
        <div className="grid grid-cols-2 gap-4">
          {moodOrder.map((mood) => (
            <MoodCard
              key={mood}
              mood={mood}
              selected={selectedMood === mood}
              onSelect={() => setSelectedMood(mood)}
            />
          ))}
        </div>
        <GlassCard className="ambient-panel space-y-4">
          <div>
            <p className="text-sm font-medium text-white">Or tell us in your own words</p>
            <p className="mt-1 text-sm text-white/55">{moodCopy[previewMood].ambient}</p>
          </div>
          <textarea
            value={note}
            onChange={(event) => setNote(event.target.value)}
            placeholder="How are you feeling?"
            rows={3}
            className="w-full rounded-[24px] border border-white/10 bg-black/14 px-4 py-4 text-sm text-white outline-none placeholder:text-white/35"
          />
        </GlassCard>
        <PillButton
          disabled={!selectedMood && !note.trim()}
          className="w-full py-4 text-base"
          onClick={() => {
            const result = selectedMood ? selectMood(selectedMood) : selectMood(note);
            setMood(result, note.trim());
            router.push("/home");
          }}
        >
          Play My Mood
        </PillButton>
      </div>
    </main>
  );
}
