import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Mood Based Music Player",
    short_name: "MoodPlayer",
    description: "Mood-reactive music with dynamic visuals and adaptive recommendations.",
    start_url: "/",
    display: "standalone",
    background_color: "#0b1020",
    theme_color: "#0b1020",
    icons: [
      {
        src: "/icon-192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/icon-512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
