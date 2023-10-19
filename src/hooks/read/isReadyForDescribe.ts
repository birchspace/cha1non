"use client";

import { stringToBytes4 } from "~/utils";
//

import React from "react";
import abi from "~/config/abi.json";
import { env } from "~/env.mjs";
import { useAccount, useContractRead } from "wagmi";

type IsReadyForDescribeValue = {
  input: string;
};

type IsReadyForDescribeProps = {
  address: `0x${string}` | undefined;
  isReadyForDescribe: boolean;
  getUserDescribeSingersLoading: boolean;
  getUserDescribeSingersError: boolean;
};

export const useIsReadyForDescribe = ({
  input,
}: IsReadyForDescribeValue): IsReadyForDescribeProps => {
  const { address } = useAccount();

  const [state, setState] = React.useState<IsReadyForDescribeProps>({
    address: undefined,
    isReadyForDescribe: false,
    getUserDescribeSingersLoading: true,
    getUserDescribeSingersError: false,
  });

  const {
    data: isReadyForDescribe,
    isLoading: getUserDescribeSingersLoading,
    isError: getUserDescribeSingersError,
  } = useContractRead({
    address: env.NEXT_PUBLIC_CONTRACT_ADDRESS as `0x${string}`,
    chainId: parseInt(env.NEXT_PUBLIC_CHAIN_ID ?? "5"),
    abi,
    functionName: "isReadyForDescribe",
    args: [input],
    watch: true,
  }) as { data: boolean; isLoading: boolean; isError: boolean };

  React.useEffect(() => {
    setState({
      address,
      isReadyForDescribe,
      getUserDescribeSingersLoading,
      getUserDescribeSingersError,
    });
  }, [
    address,
    isReadyForDescribe,
    getUserDescribeSingersLoading,
    getUserDescribeSingersError,
  ]);

  return state;
};
