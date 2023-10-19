import React from "react";
import abi from "~/config/abi.json";
import { env } from "~/env.mjs";
import { useAccount, useContractWrite } from "wagmi";
import { usePrepareContractWrite, useWaitForTransaction } from "wagmi";
import { toast } from "react-toastify";
import { BigNumber, ethers } from "ethers";

interface InvestSingerProps {
  price: string;
  musicPlatform: string[] | null;
  singer: string[] | null;
  amount: BigNumber[][] | null;
  onSetSongSuccess?: () => void;
}

// 订阅歌手

interface SongState {
  address: `0x${string}` | undefined;
  investSinger: (() => void) | undefined;
  investSingerLoading: boolean;
  prepareinvestSingerbeError: boolean;
  investSingerError: boolean;
}

export const useInvestSinger = ({
  price,
  singer,
  musicPlatform,
  amount,
  onSetSongSuccess,
}: InvestSingerProps) => {
  const { address } = useAccount();

  const [state, setState] = React.useState<SongState>({
    address: undefined,
    investSinger: undefined,
    investSingerLoading: false,
    prepareinvestSingerbeError: false,
    investSingerError: false,
  });

  const { config, isError: prepareinvestSingerbeError } =
    usePrepareContractWrite({
      address: env.NEXT_PUBLIC_CONTRACT_ADDRESS as `0x${string}`,
      chainId: parseInt(env.NEXT_PUBLIC_CHAIN_ID ?? "5"),
      abi,
      functionName: "investSinger",
      args: [musicPlatform, singer, amount],
      value: BigInt(price),
    });

  const {
    data,
    write: investSinger,
    isLoading: investSingerLoading,
    isError: investSingerError,
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
      investSinger,
      investSingerLoading: investSingerLoading || txLoading,
      prepareinvestSingerbeError,
      investSingerError,
    });
  }, [
    address,
    investSinger,
    investSingerLoading,
    prepareinvestSingerbeError,
    investSingerError,
    txLoading,

    investSingerError,
  ]);

  return state;
};
