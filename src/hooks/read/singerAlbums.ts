"use client";

import React from "react";
import abi from "~/config/abi.json";
import { env } from "~/env.mjs";
import { useAccount, useContractRead } from "wagmi";

type SingerAlbumsValue = {
  input: string;
  name: string;
};

type SingerAlbumsProps = {
  address: `0x${string}` | undefined;
  singerAlbums: string;
  getSingerAlbumsLoading: boolean;
  getSingerAlbumsError: boolean;
};

export const useSingerAlbums = ({
  input,
  name,
}: SingerAlbumsValue): SingerAlbumsProps => {
  const { address } = useAccount();

  const [state, setState] = React.useState<SingerAlbumsProps>({
    address: undefined,
    singerAlbums: "",
    getSingerAlbumsLoading: true,
    getSingerAlbumsError: false,
  });

  const {
    data: singerAlbums,
    isLoading: getSingerAlbumsLoading,
    isError: getSingerAlbumsError,
  } = useContractRead({
    address: env.NEXT_PUBLIC_CONTRACT_ADDRESS as `0x${string}`,
    chainId: parseInt(env.NEXT_PUBLIC_CHAIN_ID ?? "5"),
    abi,
    functionName: "singerAlbums",
    args: [input, name],
  }) as { data: string; isLoading: boolean; isError: boolean };

  React.useEffect(() => {
    setState({
      address,
      singerAlbums,
      getSingerAlbumsLoading,
      getSingerAlbumsError,
    });
  }, [address, singerAlbums, getSingerAlbumsLoading, getSingerAlbumsError]);

  return state;
};
