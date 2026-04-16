export type WeatherSceneKey = "storm" | "rain" | "mist" | "clouds" | "sunny" | "snow";

export type CityWeather = {
  city: string;
  country: string;
  condition: string;
  temperature: number;
  feelsLike: number;
  humidity: number;
  windSpeed: number;
  high: number;
  low: number;
  timeZone: string;
  scene: WeatherSceneKey;
  narrative: string;
};

export type WeatherScene = {
  key: WeatherSceneKey;
  label: string;
  videoSrc: string;
  audioSrc: string;
  overlay: string;
};

export type SessionStage = "auth" | "location" | "loading" | "experience";
