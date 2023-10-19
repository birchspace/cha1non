"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { shortenAddress } from "~/utils";
import { AvatarLinks } from "~/utils/images";
import { Card, CardFooter } from "@nextui-org/react";
import { Warpper } from "~/app/subscribe/[address]/_components/card";

export function SingerCard({
  address,
  index,
}: {
  address: string;
  index: number;
}) {
  const ImageIndex = index % 5;
  const shortAd = shortenAddress(address);

  const [init, setInit] = React.useState(false);

  React.useEffect(() => {
    setInit(true);
  }, []);

  return (
    <>
      {init ? (
        <Card isFooterBlurred radius="lg" className="w-64 border-none p-6">
          <Warpper className="p-0">
            <Image
              alt="Woman listing to music"
              className="rounded-lg"
              src={AvatarLinks[ImageIndex]!}
              style={{
                width: "100%",
                height: "auto",
              }}
              placeholder="blur"
              loading="lazy"
              blurDataURL={AvatarLinks[ImageIndex]!.blurDataURL}
            />

            <CardFooter className="absolute bottom-2 left-1/2 z-10 w-44 -translate-x-1/2 -translate-y-1/2 justify-between overflow-hidden rounded-large border-1 border-white/20 py-1 shadow-small before:rounded-xl before:bg-white/10">
              <p className="text-tiny text-white/80">{shortAd}</p>
              <div className="py-1 text-tiny text-white">
                <Link
                  className="btn btn-xs rounded-xl capitalize"
                  href={`/singer/${address}`}
                >
                  view
                </Link>
              </div>
            </CardFooter>
          </Warpper>
        </Card>
      ) : null}
    </>
  );
}
