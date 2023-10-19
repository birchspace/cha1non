"use client";

import hero from "public/images/hero-card.png";

import React from "react";
import Image from "next/image";
import { useAccount } from "wagmi";
import { ModalButton } from "./modal";
import { shortenAddress } from "~/utils";
import { Card, CardFooter } from "@nextui-org/react";
import { useIsDescribe } from "~/hooks/read/isDescribe";
import { useSingerSongs } from "~/hooks/read/singerSongs";
import { useIsReadyForDescribe } from "~/hooks/read/isReadyForDescribe";
import { useReadyForDescribe } from "~/hooks/write/readyForDescribe";

export function SingerCard({ address }: { address: string }) {
  const shortAd = shortenAddress(address);

  const [init, setInit] = React.useState(false);

  const { isDescribe, getUserDescribeSingersLoading } = useIsDescribe({
    singer: address,
  });

  const { singerSongs } = useSingerSongs({ input: address });

  const account = useAccount();

  const connectAddress = account.address ? account.address : "null";

  const { isReadyForDescribe } = useIsReadyForDescribe({
    input: connectAddress,
  });

  const { readyForDescribe } = useReadyForDescribe({
    author: connectAddress,
  });

  React.useEffect(() => {
    setInit(true);
  }, []);

  return (
    <>
      {init ? (
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

            <div className="py-1 text-tiny text-white">
              {getUserDescribeSingersLoading ? (
                <span className="loading loading-spinner loading-lg"></span>
              ) : (
                <div>
                  {isDescribe ? (
                    <button className="btn btn-xs rounded-xl">view</button>
                  ) : (
                    <>
                      {isReadyForDescribe ? (
                        <ModalButton
                          text="Subscribe"
                          singer={address}
                          price={singerSongs[1]!.toString()}
                        />
                      ) : (
                        <button
                          className="btn btn-xs rounded-xl capitalize"
                          onClick={readyForDescribe}
                        >
                          ready
                        </button>
                      )}
                    </>
                  )}
                </div>
              )}
            </div>
          </CardFooter>
        </Card>
      ) : null}
    </>
  );
}
