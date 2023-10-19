"use client";

import { stringToBytes4 } from "~/utils";
//

import React from "react";
import abi from "~/config/abi.json";
import { env } from "~/env.mjs";
import { useAccount, useContractRead } from "wagmi";
import { toUtf8Bytes } from "ethers/lib/utils";

type MarketLengthMusicValue = {
  singer: string;
};

type MarketLengthMusicProps = {
  address: `0x${string}` | undefined;
  marketLengthMusic: string;
  getUserDescribeSingersLoading: boolean;
  getUserDescribeSingersError: boolean;
};

export const useMarketLengthMusic = ({
  singer,
}: MarketLengthMusicValue): MarketLengthMusicProps => {
  const { address } = useAccount();

  const [state, setState] = React.useState<MarketLengthMusicProps>({
    address: undefined,
    marketLengthMusic: "",
    getUserDescribeSingersLoading: true,
    getUserDescribeSingersError: false,
  });

  const {
    data: marketLengthMusic,
    isLoading: getUserDescribeSingersLoading,
    isError: getUserDescribeSingersError,
  } = useContractRead({
    address: env.NEXT_PUBLIC_CONTRACT_ADDRESS as `0x${string}`,
    chainId: parseInt(env.NEXT_PUBLIC_CHAIN_ID ?? "5"),
    abi,
    functionName: "marketLength",
    args: [singer, "0x00000000"],
  }) as { data: string; isLoading: boolean; isError: boolean };

  React.useEffect(() => {
    setState({
      address,
      marketLengthMusic,
      getUserDescribeSingersLoading,
      getUserDescribeSingersError,
    });
  }, [
    address,
    marketLengthMusic,
    getUserDescribeSingersLoading,
    getUserDescribeSingersError,
  ]);

  return state;
};
