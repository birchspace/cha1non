"use client";

import React from "react";
import { AlbumItem } from "./album-item";
import { NoFound } from "~/app/singer/[slug]/_components/no-found";
import { useGetSingerAlbumsList } from "~/hooks/read/getSingerAlbumsList";

export function AlbumCard({ singer }: { singer: string }) {
  const [init, setInit] = React.useState(false);

  const { getSingerAlbumsList } = useGetSingerAlbumsList({
    input: singer,
  });

  React.useEffect(() => {
    setInit(true);
  }, []);

  return (
    <div className="w-full">
      {getSingerAlbumsList ? (
        <>
          {getSingerAlbumsList.length > 1 ? (
            <>
              {getSingerAlbumsList.map((item, index) => (
                <div key={index}>
                  <AlbumItem name={item} singer={singer} />
                </div>
              ))}
            </>
          ) : null}
        </>
      ) : null}
    </div>
  );
}
