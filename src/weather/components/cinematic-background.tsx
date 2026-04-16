"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef } from "react";

import { ParticleOverlay } from "@/weather/components/particle-overlay";
import { weatherScenes } from "@/weather/data/weather-scenes";
import { WeatherSceneKey } from "@/weather/types";

async function fadeAudio(
  element: HTMLAudioElement,
  from: number,
  to: number,
  duration: number,
  onEnd?: () => void,
) {
  const start = performance.now();

  const tick = (time: number) => {
    const progress = Math.min((time - start) / duration, 1);
    const nextVolume = from + (to - from) * progress;
    element.volume = Math.max(0, Math.min(1, nextVolume));

    if (progress < 1) {
      requestAnimationFrame(tick);
      return;
    }

    onEnd?.();
  };

  requestAnimationFrame(tick);
}

export function CinematicBackground({
  sceneKey,
  muted,
  x,
  y,
}: {
  sceneKey: WeatherSceneKey;
  muted: boolean;
  x: number;
  y: number;
}) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const scene = weatherScenes[sceneKey];

  useEffect(() => {
    const current = audioRef.current;
    if (!current) return;

    current.src = scene.audioSrc;
    current.loop = true;

    const playAudio = async () => {
      try {
        await current.play();
      } catch {}
    };

    current.volume = 0;
    void playAudio();
    void fadeAudio(current, 0, muted ? 0 : 0.42, 1400);

    return () => {
      void fadeAudio(current, current.volume, 0, 800, () => {
        current.pause();
      });
    };
  }, [scene.audioSrc, muted]);

  useEffect(() => {
    const current = audioRef.current;
    if (!current) return;
    void fadeAudio(current, current.volume, muted ? 0 : 0.42, 700);
  }, [muted]);

  return (
    <div className="absolute inset-0 overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={scene.videoSrc}
          initial={{ opacity: 0, scale: 1.06 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.04 }}
          transition={{ duration: 1.8, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0"
          style={{ x, y }}
        >
          <video
            className="weather-video"
            src={scene.videoSrc}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
          />
        </motion.div>
      </AnimatePresence>

      <div className={`weather-vignette bg-gradient-to-b ${scene.overlay}`} />
      <div className="weather-grid" />
      <div className="weather-noise absolute inset-0" />
      <ParticleOverlay scene={sceneKey} />
      <div className="floating-orb floating-orb--one" />
      <div className="floating-orb floating-orb--two" />
      <audio ref={audioRef} />
    </div>
  );
}
