"use client";

import { FormEvent, useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Search } from "lucide-react";

import { curatedCities } from "@/weather/data/weather-scenes";
import { GlassPanel } from "@/weather/components/glass-panel";

export function LocationPicker({
  onSelect,
}: {
  onSelect: (city: string) => void;
}) {
  const [query, setQuery] = useState("Mumbai");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSelect(query);
  };

  return (
    <div className="relative z-10 flex min-h-screen items-center justify-center px-5 py-10">
      <motion.div
        initial={{ opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        className="w-full max-w-2xl"
      >
        <GlassPanel className="rounded-[38px] px-6 py-6 text-white sm:px-8 sm:py-8">
          <div className="flex items-start justify-between gap-5">
            <div>
              <p className="text-xs uppercase tracking-[0.38em] text-white/52">Choose a city</p>
              <h2 className="mt-3 text-3xl font-semibold tracking-[-0.04em] text-white sm:text-4xl">
                Where should the atmosphere begin?
              </h2>
            </div>
            <div className="rounded-full border border-white/12 bg-white/8 px-4 py-2 text-xs uppercase tracking-[0.28em] text-white/68">
              Live scenes
            </div>
          </div>

          <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-3 sm:flex-row">
            <label className="flex flex-1 items-center gap-3 rounded-full border border-white/12 bg-white/10 px-4 py-4">
              <Search className="h-4 w-4 text-white/56" />
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                className="w-full bg-transparent text-sm text-white outline-none placeholder:text-white/34"
                placeholder="Search city"
              />
            </label>
            <motion.button
              whileTap={{ scale: 0.98 }}
              whileHover={{ scale: 1.02 }}
              type="submit"
              className="rounded-full bg-white/92 px-6 py-4 text-sm font-semibold text-slate-950"
            >
              Start experience
            </motion.button>
          </form>

          <div className="mt-8 flex flex-wrap gap-3">
            {curatedCities.map((city) => (
              <motion.button
                whileTap={{ scale: 0.96 }}
                key={city.city}
                onClick={() => onSelect(city.city)}
                className="rounded-full border border-white/12 bg-black/18 px-4 py-3 text-left"
              >
                <div className="flex items-center gap-3">
                  <MapPin className="h-4 w-4 text-white/56" />
                  <div>
                    <p className="text-sm font-medium text-white">{city.city}</p>
                    <p className="text-xs text-white/52">{city.condition}</p>
                  </div>
                </div>
              </motion.button>
            ))}
          </div>
        </GlassPanel>
      </motion.div>
    </div>
  );
}
