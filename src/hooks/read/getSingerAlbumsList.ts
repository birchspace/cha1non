"use client";

import React from "react";
import abi from "~/config/abi.json";
import { env } from "~/env.mjs";
import { useAccount, useContractRead } from "wagmi";

type GetSingerAlbumsListValue = {
  input: string;
};

type GetSingerAlbumsListProps = {
  address: `0x${string}` | undefined;
  getSingerAlbumsList: string[];
  getGetSingerAlbumsListLoading: boolean;
  getGetSingerAlbumsListError: boolean;
};

export const useGetSingerAlbumsList = ({
  input,
}: GetSingerAlbumsListValue): GetSingerAlbumsListProps => {
  const { address } = useAccount();

  const [state, setState] = React.useState<GetSingerAlbumsListProps>({
    address: undefined,
    getSingerAlbumsList: [],
    getGetSingerAlbumsListLoading: true,
    getGetSingerAlbumsListError: false,
  });

  const {
    data: getSingerAlbumsList,
    isLoading: getGetSingerAlbumsListLoading,
    isError: getGetSingerAlbumsListError,
  } = useContractRead({
    address: env.NEXT_PUBLIC_CONTRACT_ADDRESS as `0x${string}`,
    chainId: parseInt(env.NEXT_PUBLIC_CHAIN_ID ?? "5"),
    abi,
    functionName: "getSingerAlbumsList",
    args: [input],
  }) as { data: string[]; isLoading: boolean; isError: boolean };

  React.useEffect(() => {
    setState({
      address,
      getSingerAlbumsList,
      getGetSingerAlbumsListLoading,
      getGetSingerAlbumsListError,
    });
  }, [
    address,
    getSingerAlbumsList,
    getGetSingerAlbumsListLoading,
    getGetSingerAlbumsListError,
  ]);

  return state;
};
