"use client";

import React from "react";
import { env } from "~/env.mjs";
import abi from "~/config/abi.json";
import { stringToBytes4 } from "~/utils";
import { useAccount, useContractRead } from "wagmi";

type MarketLengthMusicAlbumValue = {
  singer: string;
  name: string;
};

type MarketLengthMusicAlbumProps = {
  address: `0x${string}` | undefined;
  marketLengthMusicAlbum: string;
  getUserDescribeSingersLoading: boolean;
  getUserDescribeSingersError: boolean;
};

export const useMarketLengthMusicAlbum = ({
  singer,
  name,
}: MarketLengthMusicAlbumValue): MarketLengthMusicAlbumProps => {
  const { address } = useAccount();

  const [state, setState] = React.useState<MarketLengthMusicAlbumProps>({
    address: undefined,
    marketLengthMusicAlbum: "",
    getUserDescribeSingersLoading: true,
    getUserDescribeSingersError: false,
  });

  const {
    data: marketLengthMusicAlbum,
    isLoading: getUserDescribeSingersLoading,
    isError: getUserDescribeSingersError,
  } = useContractRead({
    address: env.NEXT_PUBLIC_CONTRACT_ADDRESS as `0x${string}`,
    chainId: parseInt(env.NEXT_PUBLIC_CHAIN_ID ?? "5"),
    abi,
    functionName: "marketLength",
    args: [singer, name],
  }) as { data: string; isLoading: boolean; isError: boolean };

  React.useEffect(() => {
    setState({
      address,
      marketLengthMusicAlbum,
      getUserDescribeSingersLoading,
      getUserDescribeSingersError,
    });
  }, [
    address,
    marketLengthMusicAlbum,
    getUserDescribeSingersLoading,
    getUserDescribeSingersError,
  ]);

  return state;
};
