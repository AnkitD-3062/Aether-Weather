import { moodEmoji, moodThemes } from "@/lib/moods";
import { MoodHistoryPayload } from "@/lib/types";

export function HistoryChart({ data }: { data: MoodHistoryPayload["moodTrend"] }) {
  const points = data
    .map((point, index) => `${(index / Math.max(data.length - 1, 1)) * 100},${100 - point.value * 16}`)
    .join(" ");

  return (
    <div className="space-y-4">
      <div className="relative h-40 w-full rounded-[24px] border border-white/8 bg-black/10 p-4">
        <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="h-full w-full">
          <polyline
            fill="none"
            stroke="url(#history-gradient)"
            strokeWidth="2.6"
            points={points}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <defs>
            <linearGradient id="history-gradient" x1="0" x2="1">
              {data.map((point, index) => (
                <stop
                  key={`${point.label}-${index}`}
                  offset={`${(index / Math.max(data.length - 1, 1)) * 100}%`}
                  stopColor={moodThemes[point.mood].accent}
                />
              ))}
            </linearGradient>
          </defs>
        </svg>
        <div className="pointer-events-none absolute inset-x-4 bottom-4 flex justify-between">
          {data.map((point) => (
            <div key={point.label} className="text-center">
              <div className="text-lg">{moodEmoji[point.mood]}</div>
              <div className="text-[11px] text-white/45">{point.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
