# Mood Based Music Player

A premium, frontend-first mood-reactive music player built with Next.js. The app turns emotional input into playlist recommendations and adapts the interface in real time with mood-based color, motion, and atmosphere.

## GitHub Description

Use this as the repository description:

`A mood-reactive music player built with Next.js featuring dynamic UI themes, playlist generation, immersive playback, and mood history insights.`

## Live Demo

GitHub Pages target:

`https://ankitd-3062.github.io/Mood-Based-Music-Player/`

## Highlights

- Mood-driven playlist generation
- Dynamic UI adaptation by emotional state
- Cinematic player screen with waveform and lyrics view
- Mood history and listening insights
- Explore and profile flows for a fuller product experience
- Local-first persistence with no backend required in the current release

## Screens

- Splash
- Onboarding
- Mood Selection
- Home
- Music Player
- Mood History
- Explore
- Profile

## Tech Stack

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS
- Framer Motion
- Lucide React

## Local Development

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Quality Checks

```bash
npm run lint
npm run build
```

Or run both:

```bash
npm run check
```

## Deployment

This repo is configured for GitHub Pages static deployment.

The workflow in `.github/workflows/deploy-pages.yml` will:

- build the app as a static export
- upload the `out` directory
- deploy the site to GitHub Pages

## Project Structure

```text
src/
  app/          route-level screens and metadata routes
  components/   reusable UI building blocks and shell
  lib/          mood model, catalog, recommendation logic, storage
  providers/    global mood and player state
```

## Current Scope

This version is intentionally frontend-first and showcase-ready:

- no backend
- no real streaming provider
- no external auth

Playback uses a curated demo catalog and app state is persisted locally in the browser.

## Next Product Steps

- connect a real music source
- add album art and branded illustration assets
- add smarter recommendation weighting
- introduce cloud sync and account support
