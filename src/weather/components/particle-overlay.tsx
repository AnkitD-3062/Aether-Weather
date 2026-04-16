import { WeatherSceneKey } from "@/weather/types";

const PARTICLE_COUNT = 18;

export function ParticleOverlay({ scene }: { scene: WeatherSceneKey }) {
  if (scene !== "rain" && scene !== "storm" && scene !== "snow") return null;

  return (
    <div className={`weather-particles ${scene === "snow" ? "weather-particles--snow" : ""}`}>
      {Array.from({ length: PARTICLE_COUNT }).map((_, index) => (
        <span
          key={index}
          style={{
            left: `${(index / PARTICLE_COUNT) * 100}%`,
            height: scene === "snow" ? undefined : `${44 + (index % 5) * 14}px`,
            animationDuration: `${scene === "snow" ? 10 + (index % 4) : 1.8 + (index % 4) * 0.35}s`,
            animationDelay: `${index * -0.38}s`,
          }}
        />
      ))}
    </div>
  );
}
