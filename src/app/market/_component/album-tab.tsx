"use client";

import { AlbumCard } from "./album-card";

export function AlbumTab() {
  return (
    <div className="grid grid-cols-2 gap-6 pt-6">
      <AlbumCard />
      <AlbumCard />
      <AlbumCard />
    </div>
  );
}
