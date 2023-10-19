"use client";

import { api } from "~/trpc/react";
import { AlbumCard } from "./album-card";
import NotFound from "~/app/not-found";

export function AlbumTab() {
  const list = api.music.list.useQuery(undefined);

  return (
    <>
      {list.data ? (
        <div className="grid grid-cols-2 gap-6">
          {list.data?.map((item, index) => (
            <div key={index} className="col-span-1 grid">
              <AlbumCard singer={item} />
            </div>
          ))}
        </div>
      ) : null}
    </>
  );
}
