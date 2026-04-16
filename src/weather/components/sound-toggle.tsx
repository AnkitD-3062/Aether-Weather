"use client";

import { motion } from "framer-motion";
import { Volume2, VolumeX } from "lucide-react";

import { GlassPanel } from "@/weather/components/glass-panel";

export function SoundToggle({
  muted,
  onToggle,
}: {
  muted: boolean;
  onToggle: () => void;
}) {
  return (
    <motion.button whileTap={{ scale: 0.94 }} whileHover={{ scale: 1.03 }} onClick={onToggle} className="block">
      <GlassPanel className="rounded-full px-4 py-3">
        <div className="flex items-center gap-3 text-white">
          <motion.div
            key={muted ? "muted" : "sound"}
            initial={{ opacity: 0.3, rotate: -10, scale: 0.92 }}
            animate={{ opacity: 1, rotate: 0, scale: 1 }}
            transition={{ duration: 0.45 }}
          >
            {muted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
          </motion.div>
          <div className="text-left">
            <p className="text-[10px] uppercase tracking-[0.3em] text-white/58">Ambient</p>
            <p className="text-sm font-medium text-white/92">{muted ? "Muted" : "On"}</p>
          </div>
        </div>
      </GlassPanel>
    </motion.button>
  );
}
