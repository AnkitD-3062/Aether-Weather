"use client";

import { createContext, useContext, useEffect, useMemo, useRef, useState } from "react";

import { songs } from "@/lib/catalog";
import { appendListeningEvent, pushRecentSongId } from "@/lib/storage";
import { ListeningEventType, Mood, Song } from "@/lib/types";
import { createId } from "@/lib/utils";

interface PlayerContextValue {
  queue: Song[];
  currentSong: Song | null;
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  lyricsOpen: boolean;
  setQueueAndPlay: (tracks: Song[], song?: Song) => void;
  playSong: (song: Song, queue?: Song[]) => void;
  togglePlayback: () => void;
  nextTrack: () => void;
  previousTrack: () => void;
  seekTo: (time: number) => void;
  setLyricsOpen: (open: boolean) => void;
  recordFeedback: (type: ListeningEventType, mood: Mood, songId?: string) => void;
}

const PlayerContext = createContext<PlayerContextValue | null>(null);

export function PlayerProvider({ children }: { children: React.ReactNode }) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [queue, setQueue] = useState<Song[]>(songs);
  const [currentSongId, setCurrentSongId] = useState<string | null>(songs[0]?.id ?? null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [lyricsOpen, setLyricsOpen] = useState(false);

  const currentSong = useMemo(
    () => queue.find((song) => song.id === currentSongId) ?? songs[0] ?? null,
    [currentSongId, queue],
  );

  useEffect(() => {
    const audio = new Audio();
    audioRef.current = audio;

    const onTimeUpdate = () => setCurrentTime(audio.currentTime);
    const onLoaded = () => setDuration(audio.duration || 0);
    const onEnded = () => {
      setIsPlaying(false);
      const currentIndex = queue.findIndex((song) => song.id === currentSongId);
      const next = queue[currentIndex + 1];
      if (next) setCurrentSongId(next.id);
    };

    audio.addEventListener("timeupdate", onTimeUpdate);
    audio.addEventListener("loadedmetadata", onLoaded);
    audio.addEventListener("ended", onEnded);

    return () => {
      audio.pause();
      audio.removeEventListener("timeupdate", onTimeUpdate);
      audio.removeEventListener("loadedmetadata", onLoaded);
      audio.removeEventListener("ended", onEnded);
    };
  }, [currentSongId, queue]);

  useEffect(() => {
    if (!audioRef.current || !currentSong) return;
    if (audioRef.current.src !== currentSong.audioUrl) {
      audioRef.current.src = currentSong.audioUrl;
      audioRef.current.load();
      pushRecentSongId(currentSong.id);
    }
    if (isPlaying) {
      void audioRef.current.play().catch(() => setIsPlaying(false));
    } else {
      audioRef.current.pause();
    }
  }, [currentSong, isPlaying]);

  const value = useMemo<PlayerContextValue>(
    () => ({
      queue,
      currentSong,
      isPlaying,
      currentTime,
      duration,
      lyricsOpen,
      setQueueAndPlay(tracks, song) {
        setQueue(tracks);
        setCurrentSongId(song?.id ?? tracks[0]?.id ?? null);
        setCurrentTime(0);
        setIsPlaying(true);
        setLyricsOpen(false);
      },
      playSong(song, nextQueue) {
        if (nextQueue) setQueue(nextQueue);
        setCurrentSongId(song.id);
        setCurrentTime(0);
        setIsPlaying(true);
        setLyricsOpen(false);
      },
      togglePlayback() {
        setIsPlaying((playing) => !playing);
      },
      nextTrack() {
        const currentIndex = queue.findIndex((song) => song.id === currentSongId);
        const next = queue[currentIndex + 1] ?? queue[0];
        if (next) {
          setCurrentSongId(next.id);
          setCurrentTime(0);
          setIsPlaying(true);
        }
      },
      previousTrack() {
        const currentIndex = queue.findIndex((song) => song.id === currentSongId);
        const previous = queue[currentIndex - 1] ?? queue[queue.length - 1];
        if (previous) {
          setCurrentSongId(previous.id);
          setCurrentTime(0);
          setIsPlaying(true);
        }
      },
      seekTo(time) {
        if (!audioRef.current) return;
        audioRef.current.currentTime = time;
        setCurrentTime(time);
      },
      setLyricsOpen,
      recordFeedback(type, mood, songId) {
        appendListeningEvent({
          id: createId("listen"),
          songId: songId ?? currentSong?.id ?? songs[0].id,
          type,
          mood,
          createdAt: new Date().toISOString(),
        });
      },
    }),
    [currentSong, currentSongId, currentTime, duration, isPlaying, lyricsOpen, queue],
  );

  return <PlayerContext.Provider value={value}>{children}</PlayerContext.Provider>;
}

export function usePlayer() {
  const context = useContext(PlayerContext);
  if (!context) throw new Error("usePlayer must be used within PlayerProvider");
  return context;
}
