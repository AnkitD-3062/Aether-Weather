"use client";

import { useEffect, useMemo, useState } from "react";

import { resolveCityWeather } from "@/weather/data/weather-scenes";
import { CityWeather, SessionStage } from "@/weather/types";

const STORAGE_KEY = "aether-weather-session";

type SessionState = {
  hasSession: boolean;
  muted: boolean;
  city: string;
};

const defaultSession: SessionState = {
  hasSession: false,
  muted: false,
  city: "Mumbai",
};

function readInitialSession(): SessionState {
  if (typeof window === "undefined") return defaultSession;

  const raw = window.localStorage.getItem(STORAGE_KEY);
  if (!raw) return defaultSession;

  try {
    return JSON.parse(raw) as SessionState;
  } catch {
    return defaultSession;
  }
}

export function useCinematicWeather() {
  const initialSession = readInitialSession();
  const [stage, setStage] = useState<SessionStage>(initialSession.hasSession ? "experience" : "auth");
  const [authMode, setAuthMode] = useState<"log in" | "sign up">("log in");
  const [muted, setMuted] = useState(initialSession.muted);
  const [weather, setWeather] = useState<CityWeather>(() => resolveCityWeather(initialSession.city));

  useEffect(() => {
    const nextSession: SessionState = {
      hasSession: stage !== "auth",
      muted,
      city: weather.city,
    };

    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(nextSession));
  }, [muted, stage, weather.city]);

  const actions = useMemo(
    () => ({
      enterApp() {
        setStage("location");
      },
      chooseCity(city: string) {
        setStage("loading");
        window.setTimeout(() => {
          setWeather(resolveCityWeather(city));
          setStage("experience");
        }, 1650);
      },
      changeLocation() {
        setStage("location");
      },
      toggleMuted() {
        setMuted((value) => !value);
      },
    }),
    [],
  );

  return {
    stage,
    authMode,
    setAuthMode,
    muted,
    weather,
    ...actions,
  };
}
