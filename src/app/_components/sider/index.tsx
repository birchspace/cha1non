"use client";

import React from "react";
import { Divider } from "../divider";
import { Profile } from "./profile";
import { useAccount } from "wagmi";
import { Navigation } from "../nav";

export function Sidebar() {
  const [init, setInit] = React.useState(false);

  const { address } = useAccount();

  React.useEffect(() => {
    setInit(true);
  }, []);

  return (
    <>
      {init ? (
        <aside className="bg-background sticky top-0 z-10 flex h-20 w-full self-start lg:h-auto lg:w-1/2 lg:max-w-[230px] lg:flex-col lg:bg-transparent lg:py-8">
          <Profile />
          {address ? (
            <>
              <Divider className="my-3 hidden lg:block" />
              <Navigation />
            </>
          ) : null}
        </aside>
      ) : null}
    </>
  );
}
