"use client";

import React from "react";
import { AlbumCard } from "./_components/album";
import { AnimateEnter } from "~/app/_components/animate-enter";
import { useGetSingerAlbumsList } from "~/hooks/read/getSingerAlbumsList";
import { NoFound } from "./_components/no-found";

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
          {getSingerAlbumsList ? (
            <section className="grid w-fit grid-cols-2 gap-6 ">
              {getSingerAlbumsList.length > 0 ? (
                <>
                  {getSingerAlbumsList.map((item, index) => (
                    <div key={index}>
                      <AlbumCard
                        name={item}
                        index={index}
                        singer={params.slug}
                      />
                    </div>
                  ))}
                </>
              ) : (
                <NoFound />
              )}
            </section>
          ) : (
            <NoFound />
          )}
        </AnimateEnter>
      ) : null}
    </>
  );
}
