import { GlassPanel } from "@/weather/components/glass-panel";

export function LoadingState() {
  return (
    <div className="relative z-10 flex min-h-screen items-center justify-center px-5 py-10">
      <GlassPanel className="weather-shimmer w-full max-w-md rounded-[36px] px-6 py-8">
        <div className="space-y-5">
          <div className="h-4 w-28 rounded-full bg-white/12" />
          <div className="h-[72px] rounded-[28px] bg-white/10" />
          <div className="grid grid-cols-3 gap-3">
            <div className="h-24 rounded-[24px] bg-white/10" />
            <div className="h-24 rounded-[24px] bg-white/10" />
            <div className="h-24 rounded-[24px] bg-white/10" />
          </div>
          <div className="h-12 rounded-full bg-white/10" />
        </div>
      </GlassPanel>
    </div>
  );
}
