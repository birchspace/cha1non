import React from "react";
import abi from "~/config/abi.json";
import { env } from "~/env.mjs";
import { useAccount, useContractWrite } from "wagmi";
import { usePrepareContractWrite, useWaitForTransaction } from "wagmi";
import { toast } from "react-toastify";
import { ethers } from "ethers";

interface DescribeAlbumsProps {
  time: string;
  singer: string;
  price: string;
  name: string;
  onSetSongSuccess?: () => void;
}

// 订阅歌手

interface SongState {
  address: `0x${string}` | undefined;
  describeAlbums: (() => void) | undefined;
  describeAlbumsLoading: boolean;
  preparedescribeAlbumsbeError: boolean;
  describeAlbumsError: boolean;
  describeError: Error | null;
}

export const useDescribeAlbums = ({
  singer,
  time,
  name,
  price = "0",
  onSetSongSuccess,
}: DescribeAlbumsProps) => {
  const { address } = useAccount();

  const [state, setState] = React.useState<SongState>({
    address: undefined,
    describeAlbums: undefined,
    describeAlbumsLoading: false,
    preparedescribeAlbumsbeError: false,
    describeAlbumsError: false,
    describeError: null,
  });

  const {
    config,
    isError: preparedescribeAlbumsbeError,
    error: describeError,
  } = usePrepareContractWrite({
    address: env.NEXT_PUBLIC_CONTRACT_ADDRESS as `0x${string}`,
    chainId: parseInt(env.NEXT_PUBLIC_CHAIN_ID ?? "5"),
    abi,
    functionName: "describe",
    args: [singer, name, time, address],
    value: BigInt(price),
  });

  const {
    data,
    write: describeAlbums,
    isLoading: describeAlbumsLoading,
    isError: describeAlbumsError,
  } = useContractWrite(config);

  const { isLoading: txLoading } = useWaitForTransaction({
    hash: data?.hash,
    onSuccess: () => {
      onSetSongSuccess;
      toast.success("🦄 success!!!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    },
  });

  React.useEffect(() => {
    setState({
      address,
      describeAlbums,
      describeAlbumsLoading: describeAlbumsLoading || txLoading,
      preparedescribeAlbumsbeError,
      describeAlbumsError,
      describeError,
    });
  }, [
    address,
    describeAlbums,
    describeAlbumsLoading,
    preparedescribeAlbumsbeError,
    describeAlbumsError,
    txLoading,

    describeError,
  ]);

  return state;
};
