"use client";

import { AnimatePresence, motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { CloudMoon, Droplets, MapPinned, Thermometer, Wind } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

import { GlassPanel } from "@/weather/components/glass-panel";
import { SoundToggle } from "@/weather/components/sound-toggle";
import { curatedCities } from "@/weather/data/weather-scenes";
import { CityWeather } from "@/weather/types";

function formatTimeAtZone(timeZone: string) {
  return new Intl.DateTimeFormat("en-US", {
    timeStyle: "short",
    hour12: true,
    timeZone,
  }).format(new Date());
}

function useLiveClock(timeZone: string) {
  const [tick, setTick] = useState(() => Date.now());

  useEffect(() => {
    const interval = window.setInterval(() => setTick(Date.now()), 1000 * 30);
    return () => window.clearInterval(interval);
  }, []);

  return useMemo(() => {
    void tick;
    return formatTimeAtZone(timeZone);
  }, [tick, timeZone]);
}

const metricConfig = [
  { key: "humidity", label: "Humidity", suffix: "%" },
  { key: "windSpeed", label: "Wind", suffix: " km/h" },
  { key: "feelsLike", label: "Feels Like", suffix: "\u00b0" },
] as const;

export function WeatherDashboard({
  weather,
  muted,
  onToggleMuted,
  onSelectCity,
  onBack,
  onParallaxChange,
  onParallaxReset,
}: {
  weather: CityWeather;
  muted: boolean;
  onToggleMuted: () => void;
  onSelectCity: (city: string) => void;
  onBack: () => void;
  onParallaxChange: (x: number, y: number) => void;
  onParallaxReset: () => void;
}) {
  const time = useLiveClock(weather.timeZone);
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const springX = useSpring(pointerX, { stiffness: 70, damping: 18, mass: 0.6 });
  const springY = useSpring(pointerY, { stiffness: 70, damping: 18, mass: 0.6 });
  const contentY = useTransform(springY, [-60, 60], [8, -8]);
  const contentX = useTransform(springX, [-80, 80], [10, -10]);

  const cityList = useMemo(
    () => curatedCities.filter((entry) => entry.city.toLowerCase() !== weather.city.toLowerCase()).slice(0, 4),
    [weather.city],
  );

  return (
    <div
      className="weather-shell overflow-hidden"
      onPointerMove={(event) => {
        const x = (event.clientX / window.innerWidth - 0.5) * 160;
        const y = (event.clientY / window.innerHeight - 0.5) * 120;
        pointerX.set(x);
        pointerY.set(y);
        onParallaxChange(x / 3, y / 3);
      }}
      onPointerLeave={() => {
        pointerX.set(0);
        pointerY.set(0);
        onParallaxReset();
      }}
    >
      <div className="relative z-10 min-h-screen px-5 py-6 sm:px-8 lg:px-10">
        <div className="relative mx-auto flex min-h-[calc(100vh-3rem)] max-w-6xl flex-col justify-between">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.12, delayChildren: 0.18 } },
            }}
            className="space-y-6"
          >
            <motion.header
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { duration: 1 } },
              }}
              className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between"
            >
              <GlassPanel className="rounded-full px-5 py-3">
                <div className="flex items-center gap-3">
                  <MapPinned className="h-4 w-4 text-white/70" />
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.3em] text-white/54">Current city</p>
                    <p className="text-sm font-medium text-white/94">
                      {weather.city}, {weather.country}
                    </p>
                  </div>
                </div>
              </GlassPanel>

              <div className="flex items-center gap-3 self-start sm:self-auto">
                <GlassPanel className="rounded-full px-5 py-3">
                  <div className="flex items-center gap-3">
                    <CloudMoon className="h-4 w-4 text-white/72" />
                    <div>
                      <p className="text-[10px] uppercase tracking-[0.3em] text-white/54">Local time</p>
                      <p className="text-sm font-medium text-white/92">{time}</p>
                    </div>
                  </div>
                </GlassPanel>
                <SoundToggle muted={muted} onToggle={onToggleMuted} />
              </div>
            </motion.header>

            <motion.section
              variants={{
                hidden: { opacity: 0, y: 26 },
                visible: { opacity: 1, y: 0, transition: { duration: 1.1 } },
              }}
              style={{ x: contentX, y: contentY }}
              className="pt-10 text-center sm:pt-16"
            >
              <p className="text-sm uppercase tracking-[0.48em] text-white/54">Cinematic forecast</p>
              <AnimatePresence mode="wait">
                <motion.div
                  key={weather.city}
                  initial={{ opacity: 0, y: 22 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -18 }}
                  transition={{ duration: 0.95, ease: [0.22, 1, 0.36, 1] }}
                >
                  <h1 className="mt-3 text-[min(28vw,9rem)] font-semibold leading-none tracking-[-0.08em] text-white">
                    {weather.temperature}
                    <span aria-hidden>&deg;</span>
                  </h1>
                  <p className="mt-3 text-xl text-white/88 sm:text-2xl">{weather.condition}</p>
                  <p className="mx-auto mt-4 max-w-2xl text-balance text-sm leading-7 text-white/68 sm:text-base">
                    {weather.narrative}
                  </p>
                  <div className="mt-5 flex items-center justify-center gap-4 text-sm text-white/72">
                    <span>
                      H:{weather.high}
                      <span aria-hidden>&deg;</span>
                    </span>
                    <span className="h-1 w-1 rounded-full bg-white/36" />
                    <span>
                      L:{weather.low}
                      <span aria-hidden>&deg;</span>
                    </span>
                  </div>
                </motion.div>
              </AnimatePresence>
            </motion.section>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.35 }}
            className="mt-12 grid gap-5 pb-4 lg:grid-cols-[1.2fr_0.8fr]"
          >
            <GlassPanel className="rounded-[34px] px-5 py-5 sm:px-6 sm:py-6">
              <div className="grid gap-3 sm:grid-cols-3">
                {metricConfig.map((metric) => (
                  <div key={metric.key} className="rounded-[26px] border border-white/10 bg-black/16 px-4 py-4">
                    <p className="text-[11px] uppercase tracking-[0.3em] text-white/48">{metric.label}</p>
                    <p className="mt-4 text-2xl font-semibold tracking-[-0.04em] text-white">
                      {weather[metric.key]}
                      {metric.suffix}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-4 rounded-[28px] border border-white/10 bg-white/6 px-4 py-4">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-[11px] uppercase tracking-[0.3em] text-white/48">Scene notes</p>
                    <p className="mt-3 max-w-xl text-sm leading-7 text-white/72">
                      Designed to feel calm and tactile with slow fades, floating copy, layered blur, and a weather
                      soundtrack that crossfades as the city changes.
                    </p>
                  </div>
                  <Thermometer className="mt-1 h-5 w-5 text-white/62" />
                </div>
              </div>
            </GlassPanel>

            <GlassPanel className="rounded-[34px] px-5 py-5 sm:px-6 sm:py-6">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-[11px] uppercase tracking-[0.3em] text-white/48">Switch weather</p>
                  <p className="mt-2 text-sm text-white/70">Crossfade into another city atmosphere.</p>
                </div>
                <button
                  onClick={onBack}
                  className="rounded-full border border-white/12 bg-white/8 px-4 py-2 text-sm text-white/78"
                >
                  Change
                </button>
              </div>

              <div className="mt-5 space-y-3">
                {cityList.map((city) => (
                  <motion.button
                    whileTap={{ scale: 0.98 }}
                    key={city.city}
                    onClick={() => onSelectCity(city.city)}
                    className="flex w-full items-center justify-between rounded-[26px] border border-white/10 bg-black/16 px-4 py-4 text-left"
                  >
                    <div>
                      <p className="text-sm font-medium text-white">{city.city}</p>
                      <p className="mt-1 text-xs text-white/52">{city.condition}</p>
                    </div>
                    <div className="flex items-center gap-3 text-white/66">
                      <Droplets className="h-4 w-4" />
                      <Wind className="h-4 w-4" />
                    </div>
                  </motion.button>
                ))}
              </div>
            </GlassPanel>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
