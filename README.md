# Aether Weather

Aether Weather is a cinematic weather web app built with Next.js. It presents forecasts as immersive scenes with animated backgrounds, ambient sound, glassmorphism panels, city-based weather states, and smooth transitions between each step of the experience.

## GitHub Description

Use this as the repository description:

`A cinematic weather app built with Next.js featuring immersive weather scenes, ambient sound, city forecasts, and animated glassmorphism UI.`

## Live Demo

GitHub Pages target:

`https://ankitd-3062.github.io/Aether-Weather/`

## Highlights

- Cinematic weather dashboard with motion-driven parallax
- Curated city forecasts for Mumbai, London, Tokyo, New York, Reykjavik, and Dubai
- Dynamic weather scenes for rain, storm, mist, clouds, sun, and snow
- Ambient weather audio with mute control
- Location search with custom-city fallback state
- Login/sign-up entry flow for a product-style experience
- Local session persistence for selected city and sound preference
- Static export setup for GitHub Pages deployment

## Why This Project Stands Out

- It treats weather as an atmosphere, not just a data card
- The interface shifts with each city and weather condition
- Video, audio, animation, and layered glass panels work together as one experience
- The app is frontend-first, polished, and ready to showcase as a portfolio project

## Screens

- Auth Entry
- City Selection
- Loading Transition
- Cinematic Weather Dashboard
- City Switcher

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

- install dependencies with `npm ci`
- build the app as a static export
- upload the `out` directory
- deploy the site to GitHub Pages

The Next.js config automatically applies the `/Aether-Weather` base path during GitHub Actions builds.

## Project Structure

```text
src/
  app/              Next.js app routes, metadata, manifest, and global styles
  weather/          Aether Weather app, scenes, hooks, types, and UI components
  weather/data/     curated city forecast and scene configuration
  weather/hooks/    local session and weather experience state
  weather/components/
                    cinematic background, auth, location picker, dashboard, and controls
```

## Current Scope

This version is intentionally frontend-first and showcase-ready:

- no backend
- no real weather API yet
- no real authentication

Weather data currently comes from a curated local dataset in `src/weather/data/weather-scenes.ts`. Custom city searches use a fallback forecast scene until a live weather API is connected.

## Publishing Checklist

- Add the GitHub description from the section above
- Push the repository to `main`
- Enable GitHub Pages using GitHub Actions
- Confirm the deployed site loads at `https://ankitd-3062.github.io/Aether-Weather/`
- Verify ambient video and audio assets load correctly in production

## Next Product Steps

- connect a live weather API
- add geolocation-based current weather
- add hourly and weekly forecast panels
- replace demo auth with real account support
- add saved locations and user preferences
- improve offline and loading states for unreliable networks
