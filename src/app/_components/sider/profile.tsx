"use client";

import React from "react";
import dynamic from "next/dynamic";

import { Title } from "../title";
import { Typography } from "../typography";
import { ConnectCard } from "./connect-card";
import { ConnectButton } from "@rainbow-me/rainbowkit";

export function Profile() {
  const [client, setClient] = React.useState(false);

  const Role = dynamic(() => import("./role"), {
    ssr: false,
  });

  React.useEffect(() => {
    setClient(true);
  }, []);

  return (
    <div className="flex w-full items-center justify-between gap-2 lg:flex-col lg:items-start lg:gap-0.5">
      {client ? (
        <ConnectCard>
          <div className="hidden space-y-1 lg:block">
            <Title variant="title" className="text-md lg:text-xl">
              Click sign in to launch
            </Title>
            <a
              href="https://github.com/guhrodriguess"
              target="_blank"
              rel="noreferrer"
              className="block w-fit"
            >
              <Typography
                variant="muted"
                className="hover:text-foreground text-sm duration-300"
              >
                cha1n0n provides users with convenient music services
              </Typography>
            </a>
          </div>
          <div className="mt-2 hidden items-center gap-2 pt-1 lg:flex">
            <span className="text-xs">
              <ConnectButton
                label="Sign in"
                chainStatus="icon"
                showBalance={false}
                accountStatus="address"
              />
            </span>
            <Role />
          </div>
        </ConnectCard>
      ) : null}
    </div>
  );
}
