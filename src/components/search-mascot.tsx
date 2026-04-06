"use client";

import { motion } from "framer-motion";

type SearchMascotProps = {
  query: string;
};

export function SearchMascot({ query }: SearchMascotProps) {
  const isThinking = query.trim().length > 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 18, rotate: -4 }}
      animate={{ opacity: 1, y: [0, -10, 0], rotate: [-4, 3, -2] }}
      transition={{
        opacity: { duration: 0.45 },
        y: { duration: 4.8, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" },
        rotate: { duration: 5.6, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" },
      }}
      className="relative mx-auto flex h-44 w-36 items-end justify-center"
      aria-hidden="true"
    >
      <motion.div
        animate={{ scaleX: [1, 1.18, 1], opacity: [0.45, 0.25, 0.45] }}
        transition={{ duration: 3.2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
        className="absolute bottom-2 h-5 w-24 rounded-full bg-[#22133f]/60 blur-md"
      />

      <div className="absolute top-3 left-4 h-12 w-12 rounded-full bg-[#8b5cf6]/40 blur-2xl" />
      <div className="absolute top-10 right-2 h-10 w-10 rounded-full bg-[#f97316]/35 blur-2xl" />

      <motion.div
        animate={isThinking ? { y: [0, -5, 0] } : { y: [0, -2, 0] }}
        transition={{ duration: isThinking ? 1.4 : 2.8, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
        className="relative flex h-36 w-28 flex-col items-center"
      >
        <motion.div
          animate={{ rotate: [-8, 10, -8] }}
          transition={{ duration: 2.6, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
          className="absolute -top-2 left-2 h-12 w-3 origin-bottom rounded-full bg-[#ffd166]"
        >
          <div className="absolute -top-2 -left-2 h-6 w-6 rounded-full border border-white/40 bg-[#ff8fab] shadow-[0_0_18px_rgba(255,143,171,0.8)]" />
        </motion.div>

        <div className="absolute bottom-0 h-28 w-28 rounded-[42%_42%_38%_38%] border border-white/20 bg-[linear-gradient(180deg,#ffd166_0%,#ffb347_52%,#ff8c42_100%)] shadow-[0_20px_60px_rgba(255,140,66,0.35)]" />
        <div className="absolute bottom-7 h-16 w-[4.5rem] rounded-full bg-white/12 blur-lg" />

        <div className="absolute top-9 flex w-full justify-between px-6">
          <motion.div
            animate={{ scaleY: [1, 0.12, 1] }}
            transition={{ duration: 3.8, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", times: [0, 0.08, 0.16] }}
            className="h-5 w-4 rounded-full bg-[#2d1b45]"
          />
          <motion.div
            animate={{ scaleY: [1, 0.12, 1] }}
            transition={{
              duration: 3.8,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
              delay: 0.15,
              times: [0, 0.08, 0.16],
            }}
            className="h-5 w-4 rounded-full bg-[#2d1b45]"
          />
        </div>

        <motion.div
          animate={isThinking ? { width: [24, 16, 24], borderRadius: ["40%", "50%", "40%"] } : { rotate: [-4, 4, -4] }}
          transition={{ duration: 1.6, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
          className="absolute top-[4.7rem] h-3 w-6 border-b-[5px] border-[#2d1b45]"
        />

        <motion.div
          animate={isThinking ? { x: [-3, 3, -3] } : { rotate: [-14, 12, -10] }}
          transition={{ duration: 1.8, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
          className="absolute top-[4.75rem] -left-4 h-12 w-3 origin-top rounded-full bg-[#ffd166]"
        />
        <motion.div
          animate={isThinking ? { rotate: [10, 36, 10] } : { rotate: [16, -12, 16] }}
          transition={{ duration: 1.9, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
          className="absolute top-[4.5rem] -right-4 h-14 w-3 origin-top rounded-full bg-[#ffd166]"
        />

        <motion.div
          animate={isThinking ? { scale: [1, 1.08, 1], opacity: [0.5, 0.95, 0.5] } : { opacity: [0.35, 0.7, 0.35] }}
          transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
          className="absolute -right-6 top-2 rounded-full border border-white/25 bg-white/15 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.24em] text-[#fff7ed] backdrop-blur-md"
        >
          boop
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
