"use client";

import React from "react";
import { AudioPlayer } from "./_components/audio-player";
import { AnimateEnter } from "~/app/_components/animate-enter";

import { useSearchParams } from "next/navigation";

import albumImageOne from "public/images/album-1.jpg";
import albumImageTwo from "public/images/album-2.jpg";
import albumImageThree from "public/images/album-3.jpg";
import albumImageFour from "public/images/album-4.jpg";
import albumImageFive from "public/images/album-5.jpg";

import { useAtom } from "jotai";
import { indexAtom } from "~/utils/atom";

export default function SingerPage({ params }: { params: { name: string } }) {
  const [init, setInit] = React.useState(false);

  const searchParams = useSearchParams();

  const [, setIndexAtom] = useAtom(indexAtom);

  const ImageIndex = Number(searchParams.get("index"));

  setIndexAtom(ImageIndex);

  const ImagesArray = [
    albumImageOne,
    albumImageTwo,
    albumImageThree,
    albumImageFour,
    albumImageFive,
  ];

  React.useEffect(() => {
    setInit(true);
  }, []);

  return (
    <>
      {init ? (
        <AnimateEnter className="max-w-3xl py-12 pl-2 lg:w-4/5">
          <section className="grid w-full grid-cols-1 gap-6">
            <AudioPlayer
              coverArtSrc={ImagesArray[ImageIndex]!}
              title={params.name}
              index={ImageIndex}
            />
          </section>
        </AnimateEnter>
      ) : null}
    </>
  );
}
