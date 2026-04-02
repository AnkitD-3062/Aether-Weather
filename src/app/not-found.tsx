import Link from "next/link";

import { MoodBackdrop } from "@/components/mood-backdrop";
import { GlassCard } from "@/components/ui/glass-card";
import { PillButton } from "@/components/ui/pill-button";

export default function NotFound() {
  return (
    <main className="screen-container flex items-center justify-center">
      <MoodBackdrop mood="focus" />
      <div className="relative mx-auto w-full max-w-md">
        <GlassCard className="ambient-panel space-y-5 text-center">
          <p className="text-xs uppercase tracking-[0.35em] text-white/45">Lost in the mix</p>
          <h1 className="display-copy text-5xl text-white">Page not found</h1>
          <p className="text-sm leading-7 text-white/65">
            The screen you are looking for is not in this playlist. Jump back to the main experience.
          </p>
          <Link href="/home" className="block">
            <PillButton className="w-full">Back to Home</PillButton>
          </Link>
        </GlassCard>
      </div>
    </main>
  );
}
