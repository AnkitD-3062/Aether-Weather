"use client";

import { useMemo, useState } from "react";
import { MicVocal, Search, Sparkles } from "lucide-react";

import { artists, playlists, songs } from "@/lib/catalog";
import { MoodBackdrop } from "@/components/mood-backdrop";
import { PlaylistCard } from "@/components/playlist-card";
import { SectionHeader } from "@/components/section-header";
import { SongRow } from "@/components/song-row";
import { GlassCard } from "@/components/ui/glass-card";
import { usePlayer } from "@/providers/player-provider";

const genreCards = ["Pop", "Lo-fi", "Indie", "Rap"];
const genreLooks: Record<string, string> = {
  Pop: "linear-gradient(135deg, rgba(255,122,24,0.88), rgba(255,184,0,0.52))",
  "Lo-fi": "linear-gradient(135deg, rgba(123,97,255,0.88), rgba(61,220,151,0.45))",
  Indie: "linear-gradient(135deg, rgba(91,140,255,0.88), rgba(122,215,255,0.45))",
  Rap: "linear-gradient(135deg, rgba(255,77,90,0.88), rgba(255,123,84,0.48))",
};

export default function ExplorePage() {
  const [query, setQuery] = useState("");
  const { setQueueAndPlay } = usePlayer();

  const promptCopy = query.trim()
    ? `Searching for "${query.trim()}" across the mood lab`
    : "Search for a vibe, genre, or artist and jump straight into a matching playlist.";

  const filteredSongs = useMemo(() => {
    const value = query.toLowerCase().trim();
    return value
      ? songs.filter(
          (song) =>
            song.title.toLowerCase().includes(value) ||
            song.genres.some((genre) => genre.toLowerCase().includes(value)),
        )
      : songs.slice(0, 4);
  }, [query]);

  return (
    <main className="screen-container">
      <MoodBackdrop mood="focus" />
      <div className="relative mx-auto max-w-xl space-y-8">
        <header className="pt-2">
          <GlassCard className="ambient-panel search-hero overflow-hidden border-white/12 px-5 py-5 sm:px-6">
            <div className="search-hero__orb search-hero__orb--violet" />
            <div className="search-hero__orb search-hero__orb--orange" />
            <div className="search-hero__grid" />

            <div className="relative space-y-4">
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 rounded-full border border-white/14 bg-white/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.28em] text-white/75">
                  <Sparkles className="h-3.5 w-3.5 text-[#ffd166]" />
                  Search playground
                </div>

                <div className="space-y-2">
                  <p className="display-copy text-4xl text-white sm:text-5xl">Explore</p>
                  <p className="max-w-md text-sm leading-7 text-white/72">
                    Dig through songs, moods, and artists with a brighter search experience built to feel more like a tiny music lab.
                  </p>
                </div>

                <div className="rounded-[30px] border border-white/12 bg-[#120d24]/55 p-3 shadow-[0_20px_60px_rgba(8,6,20,0.45)] backdrop-blur-xl">
                  <div className="flex items-center gap-3 rounded-full border border-white/10 bg-white/8 px-4 py-4">
                    <Search className="h-4 w-4 text-white/45" />
                    <input
                      value={query}
                      onChange={(event) => setQuery(event.target.value)}
                      placeholder="Search songs, genres, artists"
                      className="w-full bg-transparent text-sm text-white outline-none placeholder:text-white/35"
                    />
                  </div>

                  <div className="mt-3 flex flex-wrap items-center gap-2 text-xs text-white/68">
                    <span className="rounded-full border border-white/10 bg-white/8 px-3 py-1">Try: dreamy synth</span>
                    <span className="rounded-full border border-white/10 bg-white/8 px-3 py-1">indie</span>
                    <span className="rounded-full border border-white/10 bg-white/8 px-3 py-1">late night focus</span>
                  </div>
                </div>

                <div className="rounded-[24px] border border-white/10 bg-white/7 px-4 py-3 text-sm text-white/75 backdrop-blur-md">
                  <span className="font-semibold text-[#ffd166]">Quick tip:</span> {promptCopy}
                </div>
              </div>
            </div>
          </GlassCard>
        </header>

        <section>
          <SectionHeader title="Fast picks" />
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {["Night Drive", "Soft Chaos", "Feel-Good Pop", "Warm Lo-fi"].map((label, index) => (
              <button
                key={label}
                type="button"
                onClick={() => setQuery(label)}
                className="rounded-[22px] border border-white/10 bg-white/7 px-4 py-4 text-left text-sm text-white/78 transition hover:-translate-y-0.5 hover:border-white/18 hover:bg-white/10"
              >
                <span className="block text-[11px] uppercase tracking-[0.26em] text-white/38">Preset {index + 1}</span>
                <span className="mt-2 block font-semibold text-white">{label}</span>
              </button>
            ))}
          </div>
        </section>

        <section>
          <SectionHeader title="Genres" />
          <div className="grid grid-cols-2 gap-4">
            {genreCards.map((genre, index) => (
              <GlassCard key={genre} className="ambient-panel min-h-32 justify-between overflow-hidden">
                <div className="absolute inset-0 opacity-90" style={{ background: genreLooks[genre] }} />
                <div className="flex h-full flex-col justify-between">
                  <p className="relative text-lg font-semibold text-white">{genre}</p>
                  <p className="relative text-sm text-white/78">{index % 2 === 0 ? "Trending mood bridge" : "Explore outside your current vibe"}</p>
                </div>
              </GlassCard>
            ))}
          </div>
        </section>

        <section>
          <SectionHeader title="Trending playlists" action="Browse all" />
          <div className="flex gap-4 overflow-x-auto pb-2">
            {playlists.map((playlist) => (
              <PlaylistCard key={playlist.id} playlist={playlist} />
            ))}
          </div>
        </section>

        <section>
          <SectionHeader title="Artists" />
          <div className="grid grid-cols-2 gap-4">
              {artists.map((artist) => (
              <GlassCard key={artist.id} className="ambient-panel space-y-3">
                <MicVocal className="h-8 w-8 text-white/85" />
                <div className="text-lg font-semibold text-white">{artist.name}</div>
                <p className="text-sm leading-6 text-white/58">{artist.tagline}</p>
              </GlassCard>
            ))}
          </div>
        </section>

        <section>
          <SectionHeader title="Search results" />
          <div className="space-y-3">
            {filteredSongs.length ? (
              filteredSongs.map((song) => (
                <SongRow key={song.id} song={song} onAction={() => setQueueAndPlay(filteredSongs, song)} />
              ))
            ) : (
              <GlassCard className="space-y-2 text-center">
                <p className="display-copy text-2xl text-white">Nothing in the lab yet</p>
                <p className="text-sm leading-7 text-white/65">
                  Try a genre like pop or lo-fi, or search for part of a song title to surface matching tracks.
                </p>
              </GlassCard>
            )}
          </div>
        </section>
      </div>
    </main>
  );
}
