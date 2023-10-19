import React from "react";
import { Money } from "./money";
import Lottie from "lottie-react";
import { Divider } from "~/app/_components/divider";

import { usePathname } from "next/navigation";
import { MarketLenth } from "./marketLength";
import { SingerSongs } from "./singer-songs";
import { SingerAlbums } from "./singer-albums";
import { SingerAlbumsList } from "./singer-albums-list";

export function Modal() {
  return (
    <div className="hidden flex-col gap-1.5 lg:flex">
      <Divider className="mb-4" />
      <MarketLenth />
      <SingerSongs />
      <SingerAlbums />
      <SingerAlbumsList />
      <Divider className="my-2"/>
      <Money />
    </div>
  );
}
