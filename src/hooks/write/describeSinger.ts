import React from "react";
import abi from "~/config/abi.json";
import { env } from "~/env.mjs";
import { useAccount, useContractWrite } from "wagmi";
import { usePrepareContractWrite, useWaitForTransaction } from "wagmi";
import { toast } from "react-toastify";
import { ethers } from "ethers";

interface DescribeSingerProps {
  time: string;
  singer: string;
  price: string;
  onSetSongSuccess?: () => void;
}

// 订阅歌手

interface SongState {
  address: `0x${string}` | undefined;
  describeSinger: (() => void) | undefined;
  describeSingerLoading: boolean;
  preparedescribeSingerbeError: boolean;
  describeSingerError: boolean;
  describeError: Error | null;
}

export const useDescribeSinger = ({
  singer,
  time,
  price,
  onSetSongSuccess,
}: DescribeSingerProps) => {
  const { address } = useAccount();

  const [state, setState] = React.useState<SongState>({
    address: undefined,
    describeSinger: undefined,
    describeSingerLoading: false,
    preparedescribeSingerbeError: false,
    describeSingerError: false,
    describeError: null,
  });

  const {
    config,
    isError: preparedescribeSingerbeError,
    error: describeError,
  } = usePrepareContractWrite({
    address: env.NEXT_PUBLIC_CONTRACT_ADDRESS as `0x${string}`,
    chainId: parseInt(env.NEXT_PUBLIC_CHAIN_ID ?? "5"),
    abi,
    functionName: "describe",
    args: [singer, "0x00000000", time, address],
    value: ethers.utils.parseEther(price).toBigInt(),
  });

  const {
    data,
    write: describeSinger,
    isLoading: describeSingerLoading,
    isError: describeSingerError,
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
      describeSinger,
      describeSingerLoading: describeSingerLoading || txLoading,
      preparedescribeSingerbeError,
      describeSingerError,
      describeError,
    });
  }, [
    address,
    describeSinger,
    describeSingerLoading,
    preparedescribeSingerbeError,
    describeSingerError,
    txLoading,

    describeError,
  ]);

  return state;
};
