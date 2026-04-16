"use client";

import { motion } from "framer-motion";

import { GlassPanel } from "@/weather/components/glass-panel";

const formModes = ["log in", "sign up"] as const;

export function AuthPanel({
  mode,
  onModeChange,
  onContinue,
}: {
  mode: "log in" | "sign up";
  onModeChange: (mode: "log in" | "sign up") => void;
  onContinue: () => void;
}) {
  return (
    <div className="relative z-10 flex min-h-screen items-center justify-center px-5 py-10">
      <motion.div
        initial={{ opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        className="w-full max-w-md"
      >
        <GlassPanel className="rounded-[36px] px-6 py-6 text-white">
          <p className="text-xs uppercase tracking-[0.42em] text-white/56">Aether Weather</p>
          <h1 className="mt-4 text-balance text-4xl font-semibold tracking-[-0.04em] text-white sm:text-5xl">
            Weather, staged like cinema.
          </h1>
          <p className="mt-4 max-w-sm text-sm leading-7 text-white/72">
            Move from account to city selection, then step into a living weather scene with ambient motion, sound,
            and layered glass detail.
          </p>

          <div className="mt-8 grid grid-cols-2 rounded-full border border-white/12 bg-black/18 p-1">
            {formModes.map((item) => {
              const active = item === mode;
              return (
                <button
                  key={item}
                  onClick={() => onModeChange(item)}
                  className={`rounded-full px-4 py-3 text-sm font-medium capitalize transition ${
                    active ? "bg-white/16 text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.35)]" : "text-white/56"
                  }`}
                >
                  {item}
                </button>
              );
            })}
          </div>

          <div className="mt-6 space-y-3">
            <input
              defaultValue="ankit@example.com"
              className="w-full rounded-[24px] border border-white/12 bg-white/8 px-4 py-4 text-white outline-none placeholder:text-white/35"
              placeholder="Email"
            />
            <input
              defaultValue="••••••••"
              className="w-full rounded-[24px] border border-white/12 bg-white/8 px-4 py-4 text-white outline-none placeholder:text-white/35"
              placeholder="Password"
              type="password"
            />
          </div>

          <motion.button
            whileTap={{ scale: 0.98 }}
            whileHover={{ scale: 1.01 }}
            onClick={onContinue}
            className="mt-6 w-full rounded-full bg-white/92 px-5 py-4 text-sm font-semibold text-slate-950 shadow-[0_18px_40px_rgba(228,242,255,0.28)]"
          >
            {mode === "sign up" ? "Create account" : "Enter the atmosphere"}
          </motion.button>
        </GlassPanel>
      </motion.div>
    </div>
  );
}
