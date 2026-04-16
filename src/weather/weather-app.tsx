"use client";

import { useState } from "react";

import { WeatherDashboard } from "@/weather/components/weather-dashboard";
import { AuthPanel } from "@/weather/components/auth-panel";
import { CinematicBackground } from "@/weather/components/cinematic-background";
import { LoadingState } from "@/weather/components/loading-state";
import { LocationPicker } from "@/weather/components/location-picker";
import { useCinematicWeather } from "@/weather/hooks/use-cinematic-weather";

export function WeatherApp() {
  const { stage, authMode, setAuthMode, muted, weather, enterApp, chooseCity, changeLocation, toggleMuted } =
    useCinematicWeather();
  const [backgroundOffset, setBackgroundOffset] = useState({ x: 0, y: 0 });

  return (
    <main className="relative min-h-screen overflow-hidden bg-[var(--background)] text-[var(--foreground)]">
      <CinematicBackground sceneKey={weather.scene} muted={muted} x={backgroundOffset.x} y={backgroundOffset.y} />

      {stage === "auth" ? (
        <AuthPanel mode={authMode} onModeChange={setAuthMode} onContinue={enterApp} />
      ) : null}

      {stage === "location" ? <LocationPicker onSelect={chooseCity} /> : null}

      {stage === "loading" ? <LoadingState /> : null}

      {stage === "experience" ? (
        <WeatherDashboard
          weather={weather}
          muted={muted}
          onToggleMuted={toggleMuted}
          onSelectCity={chooseCity}
          onBack={changeLocation}
          onParallaxChange={(x, y) => setBackgroundOffset({ x, y })}
          onParallaxReset={() => setBackgroundOffset({ x: 0, y: 0 })}
        />
      ) : null}
    </main>
  );
}
