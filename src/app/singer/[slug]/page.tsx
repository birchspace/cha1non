"use client";

import React from "react";
import { AlbumCard } from "./_components/album";
import { AnimateEnter } from "~/app/_components/animate-enter";
import { useGetSingerAlbumsList } from "~/hooks/read/getSingerAlbumsList";

export default function SingerPage({ params }: { params: { slug: string } }) {
  const [init, setInit] = React.useState(false);

  const { getSingerAlbumsList } = useGetSingerAlbumsList({
    input: params.slug,
  });

  React.useEffect(() => {
    setInit(true);
  }, []);
  return (
    <>
      {init ? (
        <AnimateEnter className="py-12 pl-2 lg:w-4/5">
          <section className="grid w-fit grid-cols-2 gap-6 ">
            {getSingerAlbumsList.map((item, index) => (
              <AlbumCard name={item} index={index} />
            ))}
          </section>
        </AnimateEnter>
      ) : null}
    </>
  );
}
