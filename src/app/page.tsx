"use client";

import React from "react";
import { useAccount } from "wagmi";
import { HomeNav } from "~/app/_components/home/nav";
import { Default } from "~/app/_components/home/default";
import { AnimateEnter } from "~/app/_components/animate-enter";

export default function Home() {
  const [init, setInit] = React.useState(false);

  const { address } = useAccount();

  React.useEffect(() => {
    setInit(true);
  }, []);
  return (
    <>
      {init ? (
        <AnimateEnter className="max-w-[854px] py-8 lg:w-4/5">
          {address ? <HomeNav address={address} /> : <Default />}
        </AnimateEnter>
      ) : null}
    </>
  );
}
