import { playlists } from "@/lib/catalog";
import { CoverArt } from "@/components/ui/cover-art";
import { GlassCard } from "@/components/ui/glass-card";
import { Playlist } from "@/lib/types";

export function PlaylistCard({ playlist }: { playlist: Playlist }) {
  return (
    <GlassCard className="min-w-[230px] space-y-4">
      <CoverArt mood={playlist.mood} title={playlist.title} />
      <div>
        <div className="text-base font-semibold text-white">{playlist.title}</div>
        <p className="mt-2 text-sm leading-6 text-white/65">{playlist.description}</p>
        <div className="mt-4 text-xs uppercase tracking-[0.28em] text-white/38">
          {playlists.findIndex((item) => item.id === playlist.id) + 1} curated mix
        </div>
      </div>
    </GlassCard>
  );
}
