"use client";

import hero from "public/images/hero-card.png";

import React from "react";
import Image from "next/image";
import { ModalButton } from "./modal";
import { shortenAddress } from "~/utils";

import { Card, CardFooter } from "@nextui-org/react";

export function SingerCard({ address }: { address: string }) {
  const shortAd = shortenAddress(address);
  console.log(address);
  
  return (
    <Card isFooterBlurred radius="lg" className="w-64 border-none p-6">
      <Image
        alt="Woman listing to music"
        className="rounded-lg"
        src={hero}
        style={{
          width: "100%",
          height: "auto",
        }}
        placeholder="blur"
        blurDataURL={hero.blurDataURL}
      />
      <CardFooter className="absolute bottom-2 left-1/2 z-10 w-44 -translate-x-1/2 -translate-y-1/2 justify-between overflow-hidden rounded-large border-1 border-white/20 py-1 shadow-small before:rounded-xl before:bg-white/10">
        <p className="text-tiny text-white/80">{shortAd}</p>
        <div className="bg-black/20 py-1 text-tiny text-white">
          <ModalButton text="Subscribe" singer={address} price="1" />
        </div>
      </CardFooter>
    </Card>
  );
}
