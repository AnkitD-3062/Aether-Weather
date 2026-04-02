# Mood Based Music Player

A mood-reactive music player built with Next.js. The app adapts playlist recommendations, colors, motion, and atmosphere around the user's selected mood.

## Features

- Splash and onboarding flow
- Mood selection with text-based mood detection
- Dynamic Home dashboard
- Immersive music player with waveform and lyrics view
- Mood history with weekly insights
- Explore screen with genres, artists, and playlists
- Profile screen with personalization controls
- Local-first persistence for mood history, preferences, and listening behavior

## Tech Stack

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS
- Framer Motion
- Lucide icons

## Run Locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Production Build

```bash
npm run build
npm start
```

## Project Structure

```text
src/
  app/          routes and screens
  components/   reusable UI and app chrome
  lib/          data, moods, recommendation logic, storage
  providers/    mood and player state
```

## Current Scope

This version is intentionally frontend-first. It does not include a live backend or external music provider yet. Playback uses a curated demo catalog, and persistence uses browser local storage.

## Suggested Next Steps

- Connect a real music API
- Add cloud sync and user accounts
- Add branded artwork and illustrations
- Add deeper recommendation tuning from listening behavior
