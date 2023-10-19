"use client";

import React from "react";
import abi from "~/config/abi.json";
import { env } from "~/env.mjs";
import { useAccount, useContractRead } from "wagmi";

// 查询是否订阅歌手

type IsDescribeAlbumValue = {
  singer: string;
  name: string;
};

type IsDescribeAlbumProps = {
  address: `0x${string}` | undefined;
  isDescribeAlbum: boolean;
  getUserDescribeSingersLoading: boolean;
  getUserDescribeSingersError: boolean;
};

export const useIsDescribeAlbum = ({
  singer,
  name,
}: IsDescribeAlbumValue): IsDescribeAlbumProps => {
  const { address } = useAccount();

  const [state, setState] = React.useState<IsDescribeAlbumProps>({
    address: undefined,
    isDescribeAlbum: false,
    getUserDescribeSingersLoading: true,
    getUserDescribeSingersError: false,
  });

  const {
    data: isDescribeAlbum,
    isLoading: getUserDescribeSingersLoading,
    isError: getUserDescribeSingersError,
  } = useContractRead({
    address: env.NEXT_PUBLIC_CONTRACT_ADDRESS as `0x${string}`,
    chainId: parseInt(env.NEXT_PUBLIC_CHAIN_ID ?? "5"),
    abi,
    functionName: "isDescribeAlbum",
    args: [address, singer, name],
    watch: true,
  }) as { data: boolean; isLoading: boolean; isError: boolean };

  React.useEffect(() => {
    setState({
      address,
      isDescribeAlbum,
      getUserDescribeSingersLoading,
      getUserDescribeSingersError,
    });
  }, [
    address,
    isDescribeAlbum,
    getUserDescribeSingersLoading,
    getUserDescribeSingersError,
  ]);

  return state;
};
