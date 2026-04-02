"use client";

import { useState } from "react";

import { HistoryChart } from "@/components/history-chart";
import { MoodBackdrop } from "@/components/mood-backdrop";
import { GlassCard } from "@/components/ui/glass-card";
import { moodEmoji } from "@/lib/moods";
import { getMoodHistory } from "@/lib/recommendations";
import { getListeningEvents, getMoodHistory as getStoredMoodHistory } from "@/lib/storage";
import { formatMinutes, titleCase } from "@/lib/utils";

export default function HistoryPage() {
  const [range, setRange] = useState<"week" | "month">("week");
  const payload = getMoodHistory(range, getStoredMoodHistory(), getListeningEvents());

  return (
    <main className="screen-container">
      <MoodBackdrop mood={payload.dominantMood} />
      <div className="relative mx-auto max-w-xl space-y-6">
        <header className="flex items-start justify-between pt-2">
          <div>
            <p className="display-copy text-4xl text-white">Mood History</p>
            <p className="mt-2 text-sm text-white/58">Your emotional listening patterns</p>
          </div>
            <div className="rounded-full border border-white/10 bg-white/7 p-1">
              {(["week", "month"] as const).map((item) => (
                <button
                  key={item}
                  onClick={() => setRange(item)}
                  className={`rounded-full px-4 py-2 text-sm ${range === item ? "bg-white text-slate-950" : "text-white/55"}`}
                >
                  {item === "week" ? "This Week" : "This Month"}
                </button>
              ))}
            </div>
          </header>

          <GlassCard className="ambient-panel space-y-3">
            <p className="text-xs uppercase tracking-[0.28em] text-white/42">Summary insight</p>
            <h1 className="display-copy text-4xl text-white">{payload.insight.title}</h1>
            <p className="text-sm leading-7 text-white/68">{payload.insight.body}</p>
          </GlassCard>

          <GlassCard className="ambient-panel space-y-5">
            <div>
              <p className="text-lg font-semibold text-white">Weekly mood graph</p>
              <p className="text-sm text-white/48">How your emotional tone moved over time</p>
            </div>
            <HistoryChart data={payload.moodTrend} />
          </GlassCard>

          <div className="grid grid-cols-2 gap-4">
            <GlassCard className="space-y-2">
              <p className="text-xs uppercase tracking-[0.28em] text-white/42">Most played mood</p>
              <p className="text-2xl font-semibold text-white">
                {moodEmoji[payload.mostPlayedMood]} {titleCase(payload.mostPlayedMood)}
              </p>
            </GlassCard>
            <GlassCard className="space-y-2">
              <p className="text-xs uppercase tracking-[0.28em] text-white/42">Listening time</p>
              <p className="text-2xl font-semibold text-white">{formatMinutes(payload.totalListeningMinutes)}</p>
            </GlassCard>
            <GlassCard className="space-y-2">
              <p className="text-xs uppercase tracking-[0.28em] text-white/42">Top genre</p>
              <p className="text-2xl font-semibold text-white">{payload.topGenre}</p>
            </GlassCard>
            <GlassCard className="space-y-2">
              <p className="text-xs uppercase tracking-[0.28em] text-white/42">Peak time</p>
              <p className="text-2xl font-semibold text-white">{payload.peakTimeLabel}</p>
            </GlassCard>
          </div>

          <GlassCard className="ambient-panel space-y-4">
            <p className="text-lg font-semibold text-white">Recent mood moments</p>
            <div className="space-y-3">
              {payload.timeline.map((entry) => (
                <div key={entry.id} className="flex items-start gap-3 rounded-[22px] border border-white/8 bg-white/5 p-3">
                  <div className="text-2xl">{moodEmoji[entry.mood]}</div>
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-white">{entry.label}</p>
                    <p className="mt-1 text-sm leading-6 text-white/58">{entry.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </GlassCard>
      </div>
    </main>
  );
}
