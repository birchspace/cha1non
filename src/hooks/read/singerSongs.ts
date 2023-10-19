"use client";

import React from "react";
import abi from "~/config/abi.json";
import { env } from "~/env.mjs";
import { useAccount, useContractRead } from "wagmi";
import { BigNumber, ethers } from "ethers";

type SingerSongsValue = {
  input: string;
};

type SingerSongsResult = [
  singer: `0x${string}` | null,
  price: BigNumber | null,
  totalReward: BigNumber | null,
  totalAmount: BigNumber | null,
];

type SingerSongsProps = {
  address: `0x${string}` | undefined;
  singerSongs: SingerSongsResult;
  getSingerSongsLoading: boolean;
  getSingerSongsError: boolean;
};

export const useSingerSongs = ({
  input,
}: SingerSongsValue): SingerSongsProps => {
  const { address } = useAccount();

  const [state, setState] = React.useState<SingerSongsProps>({
    address: undefined,
    singerSongs: [null, null, null, null],
    getSingerSongsLoading: true,
    getSingerSongsError: false,
  });

  const {
    data: singerSongs,
    isLoading: getSingerSongsLoading,
    isError: getSingerSongsError,
  } = useContractRead({
    address: env.NEXT_PUBLIC_CONTRACT_ADDRESS as `0x${string}`,
    chainId: parseInt(env.NEXT_PUBLIC_CHAIN_ID ?? "5"),
    abi,
    functionName: "singerSongs",
    args: [input],
    watch: true,
  }) as {
    data: [
      singer: `0x${string}` | null,
      price: BigNumber | null,
      totalReward: BigNumber | null,
      totalAmount: BigNumber | null,
    ];
    isLoading: boolean;
    isError: boolean;
  };

  React.useEffect(() => {
    setState({
      address,
      singerSongs,
      getSingerSongsLoading,
      getSingerSongsError,
    });
  }, [singerSongs]);

  return state;
};
