import { StaticImageData } from "next/image";

export type Playlist = Array<Track>;

export type Track = {
  audioSrc: string;
  metadata: TrackMetadata;
};

export type TrackMetadata = {
  artist: string;
  title: string;
};

export type Controls = {
  setPlaybackPosition: (position: number) => void;
  toggleShuffle: () => void;
  toggleRepeat: () => void;
  togglePlayPause: () => void;
  playNextTrack: () => void;
  playPreviousTrack: () => void;
  cleanup: () => void;
};

export type PlayerState = {
  currentTrackDuration: number | null;
  currentTrackPlaybackPosition: number | null;
  currentTrackMetadata: TrackMetadata | null;
  playbackState: PlaybackState;
  repeat: boolean;
  shuffle: boolean;
};

export type PlaybackState = "PLAYING" | "PAUSED";

export const InitialPlayerState: PlayerState = {
  currentTrackDuration: null,
  currentTrackPlaybackPosition: null,
  currentTrackMetadata: null,
  playbackState: "PAUSED",
  repeat: false,
  shuffle: false,
};

export interface AnimateEnterProps {
  children: React.ReactNode;
  className?: string;
}

export interface AnimateEnterProps {
  children: React.ReactNode;
  className?: string;
}
