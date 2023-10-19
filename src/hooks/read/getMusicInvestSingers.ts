"use client";

import React from "react";
import abi from "~/config/abi.json";
import { env } from "~/env.mjs";
import { useAccount, useContractRead } from "wagmi";

type GetMusicInvestSingersValue = {
  input: string;
};

type GetMusicInvestSingersProps = {
  address: `0x${string}` | undefined;
  getMusicInvestSingers: string[];
  ggetMusicInvestSingersLoading: boolean;
  ggetMusicInvestSingersError: boolean;
};

export const useGetMusicInvestSingers = ({
  input,
}: GetMusicInvestSingersValue): GetMusicInvestSingersProps => {
  const { address } = useAccount();

  const [state, setState] = React.useState<GetMusicInvestSingersProps>({
    address: undefined,
    getMusicInvestSingers: [],
    ggetMusicInvestSingersLoading: true,
    ggetMusicInvestSingersError: false,
  });

  const {
    data: getMusicInvestSingers,
    isLoading: ggetMusicInvestSingersLoading,
    isError: ggetMusicInvestSingersError,
  } = useContractRead({
    address: env.NEXT_PUBLIC_CONTRACT_ADDRESS as `0x${string}`,
    chainId: parseInt(env.NEXT_PUBLIC_CHAIN_ID ?? "5"),
    abi,
    functionName: "getMusicInvestSingers",
    args: [input],
  }) as { data: string[]; isLoading: boolean; isError: boolean };

  React.useEffect(() => {
    setState({
      address,
      getMusicInvestSingers,
      ggetMusicInvestSingersLoading,
      ggetMusicInvestSingersError,
    });
  }, [
    address,
    getMusicInvestSingers,
    ggetMusicInvestSingersLoading,
    ggetMusicInvestSingersError,
  ]);

  return state;
};
