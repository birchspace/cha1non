"use client";

import Image from "next/image";
import { useAtom } from "jotai";
import Controls from "./controls";
import ProgressBar from "./progressbar";
import useAudioPlayer from "~/hooks/useAudioPlayer";
import { motion, AnimatePresence } from "framer-motion";

import React from "react";
import { Card, CardBody, Button, Progress } from "@nextui-org/react";

import type { Playlist } from "~/types";
import type { StaticImageData } from "next/image";
import { playlist } from "./audio-list";

interface AudioPlayer {
  title: string;
  index: number;
  coverArtSrc: StaticImageData;
}

export const AudioPlayer = ({ coverArtSrc, index }: AudioPlayer) => {
  const {
    playNextTrack,
    playPreviousTrack,
    playerState,
    togglePlayPause,
    toggleRepeat,
    toggleShuffle,
    setPlaybackPosition,
  } = useAudioPlayer({ playlist: playlist, initialTrackIndex: index });

  const {
    repeat,
    playbackState,
    shuffle,
    currentTrackDuration,
    currentTrackPlaybackPosition,
  } = playerState;

  function setProgress(value: number) {
    if (currentTrackDuration !== null) {
      setPlaybackPosition((value / 100) * currentTrackDuration);
    }
  }

  function computeProgress(): number {
    const noProgress =
      currentTrackDuration === null ||
      currentTrackPlaybackPosition === null ||
      currentTrackDuration === 0;
    if (noProgress) {
      return 0;
    } else {
      return (currentTrackPlaybackPosition / currentTrackDuration) * 100;
    }
  }

  return (
    <AnimatePresence>
      <Card
        isBlurred
        className="w-full border-none bg-background/60 dark:bg-default-100/50"
        shadow="sm"
      >
        <CardBody>
          <div className="grid grid-cols-6 items-start justify-between md:grid-cols-12">
            {/* 封面 */}
            <div className="relative col-span-6 md:col-span-4">
              <Image
                alt="Album cover"
                className="rounded object-cover"
                style={{
                  width: "auto",
                  height: "auto",
                }}
                placeholder="blur"
                blurDataURL={coverArtSrc.blurDataURL}
                src={coverArtSrc}
              />
            </div>
            <div className="col-span-6 flex h-full flex-col justify-between md:col-span-8">
              <div className="flex items-start justify-between">
                <div className="flex flex-col gap-0">
                  <h3 className="font-semibold text-foreground/90">
                    {playlist[0]!.metadata.title}
                  </h3>
                </div>
              </div>
              <ProgressBar
                onChange={setProgress}
                progress={computeProgress()}
                rightLabel={formatTime(currentTrackDuration)}
                leftLabel={formatTime(currentTrackPlaybackPosition)}
              />
              <Controls
                shuffle={shuffle}
                repeat={repeat}
                onShuffleClick={toggleShuffle}
                onRepeatClick={toggleRepeat}
                onPrevClick={playPreviousTrack}
                onNextClick={playNextTrack}
                onPlayClick={togglePlayPause}
                isPlaying={playbackState === "PLAYING"}
              />
            </div>
          </div>
        </CardBody>
      </Card>
    </AnimatePresence>
  );
};

function formatTime(timeInSeconds: number | null): string {
  if (timeInSeconds === null) return "";
  const numberOfMinutes = Math.floor(timeInSeconds / 60);
  const numberOfSeconds = Math.floor(timeInSeconds - numberOfMinutes * 60);
  const minutes = `${numberOfMinutes}`.padStart(2, "0");
  const seconds = `${numberOfSeconds}`.padStart(2, "0");
  return `${minutes}:${seconds}`;
}
