"use client";

import { api } from "~/trpc/react";
import { AlbumCard } from "./album-card";

export function AlbumTab() {
  const list = api.music.list.useQuery(undefined);

  return (
    <div className="grid grid-cols-2 gap-6 pt-6">
      {list.data?.map((item, index) => (
        <div key={index}>
          <AlbumCard singer={item} />
        </div>
      ))}
    </div>
  );
}
