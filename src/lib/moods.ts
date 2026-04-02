import { Mood } from "@/lib/types";

export const moodEmoji: Record<Mood, string> = {
  happy: "😄",
  sad: "😢",
  angry: "😡",
  calm: "😌",
  focus: "🎯",
};

export const moodLabels: Record<Mood, string> = {
  happy: "Happy",
  sad: "Sad",
  angry: "Angry",
  calm: "Calm",
  focus: "Focus",
};

export const moodDescriptors: Record<Mood, string> = {
  happy: "Bright and upbeat",
  sad: "Soft and reflective",
  angry: "Loud and intense",
  calm: "Slow and peaceful",
  focus: "Clear and steady",
};

export const moodThemes: Record<
  Mood,
  {
    accent: string;
    accentSoft: string;
    gradient: string;
    glow: string;
    ring: string;
    motion: {
      type: "spring" | "tween";
      duration?: number;
      stiffness?: number;
      damping?: number;
      ease?: "easeInOut" | "easeOut";
    };
  }
> = {
  happy: {
    accent: "#ffb800",
    accentSoft: "#ff7a18",
    gradient: "linear-gradient(135deg, rgba(255,184,0,0.92), rgba(255,122,24,0.72))",
    glow: "rgba(255,184,0,0.28)",
    ring: "rgba(255,184,0,0.48)",
    motion: { type: "spring", stiffness: 280, damping: 18 },
  },
  sad: {
    accent: "#5b8cff",
    accentSoft: "#7ad7ff",
    gradient: "linear-gradient(135deg, rgba(91,140,255,0.95), rgba(122,215,255,0.68))",
    glow: "rgba(91,140,255,0.24)",
    ring: "rgba(122,215,255,0.42)",
    motion: { type: "tween", duration: 0.45, ease: "easeInOut" },
  },
  angry: {
    accent: "#ff4d5a",
    accentSoft: "#ff7b54",
    gradient: "linear-gradient(135deg, rgba(255,77,90,0.95), rgba(255,123,84,0.72))",
    glow: "rgba(255,77,90,0.28)",
    ring: "rgba(255,123,84,0.45)",
    motion: { type: "tween", duration: 0.22, ease: "easeOut" },
  },
  calm: {
    accent: "#7b61ff",
    accentSoft: "#3ddc97",
    gradient: "linear-gradient(135deg, rgba(123,97,255,0.95), rgba(61,220,151,0.68))",
    glow: "rgba(123,97,255,0.24)",
    ring: "rgba(61,220,151,0.42)",
    motion: { type: "tween", duration: 0.55, ease: "easeInOut" },
  },
  focus: {
    accent: "#4da6ff",
    accentSoft: "#9bffb0",
    gradient: "linear-gradient(135deg, rgba(77,166,255,0.95), rgba(155,255,176,0.62))",
    glow: "rgba(77,166,255,0.18)",
    ring: "rgba(77,166,255,0.42)",
    motion: { type: "tween", duration: 0.28, ease: "easeOut" },
  },
};

export const moodOrder: Mood[] = ["happy", "sad", "angry", "calm", "focus"];

export const moodCopy: Record<Mood, { hero: string; ambient: string }> = {
  happy: {
    hero: "Lift the room with golden energy and bold hooks.",
    ambient: "Bright gradients and joyful rhythm shifts keep the interface smiling back.",
  },
  sad: {
    hero: "Stay with the feeling through softer, more reflective textures.",
    ambient: "Blue haze, gentler motion, and blurred light make the space feel tender.",
  },
  angry: {
    hero: "Release pressure with bigger drums, sharper edges, and louder motion.",
    ambient: "Red embers and quick transitions turn the player into a controlled adrenaline rush.",
  },
  calm: {
    hero: "Exhale into smoother melodies, floating tones, and grounded quiet.",
    ambient: "Violet-green drifts and slower movement help the whole app breathe.",
  },
  focus: {
    hero: "Settle into clean structure, steady pacing, and distraction-free sound.",
    ambient: "Cool blue light and reduced motion keep attention pointed forward.",
  },
};
