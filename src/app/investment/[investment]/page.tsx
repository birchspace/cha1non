"use client";

import React from "react";
import { AnimateEnter } from "~/app/_components/animate-enter";

import { NoFound } from "~/app/singer/[slug]/_components/no-found";

import { SingerCard } from "./card";
import { useGetMusicInvestSingers } from "~/hooks/read/getMusicInvestSingers";

export default function SingerPage({
  params,
}: {
  params: { investment: string };
}) {
  const [init, setInit] = React.useState(false);

  const { getMusicInvestSingers } = useGetMusicInvestSingers({
    input: params.investment,
  });

  React.useEffect(() => {
    setInit(true);
  }, []);

  return (
    <>
      {init ? (
        <AnimateEnter className="max-w-3xl py-12 pl-2 lg:w-4/5">
          {getMusicInvestSingers ? (
            <section className="grid w-full justify-center grid-cols-2 gap-6">
              {getMusicInvestSingers.map((item, index) => (
                <div key={index}>
                  <SingerCard address={item} index={index} />
                </div>
              ))}
            </section>
          ) : (
            <NoFound />
          )}
        </AnimateEnter>
      ) : (
        <NoFound />
      )}
    </>
  );
}
