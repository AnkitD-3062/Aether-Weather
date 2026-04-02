"use client";

import { useMemo, useState } from "react";
import { MicVocal, Search } from "lucide-react";

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
        <header className="space-y-3 pt-2">
          <p className="display-copy text-4xl text-white">Explore</p>
          <div className="flex items-center gap-3 rounded-full border border-white/10 bg-white/6 px-4 py-4">
            <Search className="h-4 w-4 text-white/40" />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search songs, genres, artists"
              className="w-full bg-transparent text-sm text-white outline-none placeholder:text-white/35"
            />
          </div>
        </header>

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
            {filteredSongs.map((song) => (
              <SongRow key={song.id} song={song} onAction={() => setQueueAndPlay(filteredSongs, song)} />
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
