"use client";

import React from "react";
import abi from "~/config/abi.json";
import { env } from "~/env.mjs";
import { useAccount, useContractRead } from "wagmi";

// 查询是否订阅歌手

type IsDescribeValue = {
  singer: string;
};

type IsDescribeProps = {
  address: `0x${string}` | undefined;
  isDescribe: boolean;
  getUserDescribeSingersLoading: boolean;
  getUserDescribeSingersError: boolean;
};

export const useIsDescribe = ({ singer }: IsDescribeValue): IsDescribeProps => {
  const { address } = useAccount();

  const [state, setState] = React.useState<IsDescribeProps>({
    address: undefined,
    isDescribe: false,
    getUserDescribeSingersLoading: true,
    getUserDescribeSingersError: false,
  });

  const {
    data: isDescribe,
    isLoading: getUserDescribeSingersLoading,
    isError: getUserDescribeSingersError,
  } = useContractRead({
    address: env.NEXT_PUBLIC_CONTRACT_ADDRESS as `0x${string}`,
    chainId: parseInt(env.NEXT_PUBLIC_CHAIN_ID ?? "5"),
    abi,
    functionName: "isDescribe",
    args: [address, singer, "0x00000000"],
    watch: true,
  }) as { data: boolean; isLoading: boolean; isError: boolean };

  React.useEffect(() => {
    setState({
      address,
      isDescribe,
      getUserDescribeSingersLoading,
      getUserDescribeSingersError,
    });
  }, [
    address,
    isDescribe,
    getUserDescribeSingersLoading,
    getUserDescribeSingersError,
  ]);

  return state;
};
