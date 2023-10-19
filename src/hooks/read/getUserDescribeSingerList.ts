"use client";

import React from "react";
import abi from "~/config/abi.json";
import { env } from "~/env.mjs";
import { useAccount, useContractRead } from "wagmi";

type GetUserDescribeSingerListValue = {
  input: string;
};

type GetUserDescribeSingerListProps = {
  address: `0x${string}` | undefined;
  getUserDescribeSingerList: string[];
  getGetUserDescribeSingerListLoading: boolean;
  getGetUserDescribeSingerListError: boolean;
};

export const useGetUserDescribeSingerList = ({
  input,
}: GetUserDescribeSingerListValue): GetUserDescribeSingerListProps => {
  const { address } = useAccount();

  const [state, setState] = React.useState<GetUserDescribeSingerListProps>({
    address: undefined,
    getUserDescribeSingerList: [],
    getGetUserDescribeSingerListLoading: true,
    getGetUserDescribeSingerListError: false,
  });

  const {
    data: getUserDescribeSingerList,
    isLoading: getGetUserDescribeSingerListLoading,
    isError: getGetUserDescribeSingerListError,
  } = useContractRead({
    address: env.NEXT_PUBLIC_CONTRACT_ADDRESS as `0x${string}`,
    chainId: parseInt(env.NEXT_PUBLIC_CHAIN_ID ?? "5"),
    abi,
    functionName: "getUserDescribeSingerList",
    args: [input],
  }) as { data: string[]; isLoading: boolean; isError: boolean };

  React.useEffect(() => {
    setState({
      address,
      getUserDescribeSingerList,
      getGetUserDescribeSingerListLoading,
      getGetUserDescribeSingerListError,
    });
  }, [
    address,
    getUserDescribeSingerList,
    getGetUserDescribeSingerListLoading,
    getGetUserDescribeSingerListError,
  ]);

  return state;
};
