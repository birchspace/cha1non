"use client";

import { MusicCard } from "./music-card";

import { useDescribeSinger } from "~/hooks/write/describeSinger";

export function MusicTab() {
  const { describeSinger } = useDescribeSinger({
    singer: "1",
    time: "0",
  });
  return (
    <div className="grid grid-cols-1 gap-6 pt-6">
      <MusicCard />
    </div>
  );
}
