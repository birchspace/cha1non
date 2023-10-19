import React from "react";
import abi from "~/config/abi.json";
import { env } from "~/env.mjs";
import { useAccount, useContractWrite } from "wagmi";
import { stringToBytes4 } from "~/utils";
import { usePrepareContractWrite, useWaitForTransaction } from "wagmi";
import { toast } from "react-toastify";
import { readyForDescribeAtom } from "~/utils/atom";
import { useAtom } from "jotai";

interface ReadyForDescribeProps {
  author?: string;
  onSetSongSuccess?: () => void;
}

interface SongState {
  address: `0x${string}` | undefined;
  readyForDescribe: (() => void) | undefined;
  readyForDescribeLoading: boolean;
  preparereadyForDescribebeError: boolean;
  readyForDescribeError: boolean;
}

export const useReadyForDescribe = ({
  author,
  onSetSongSuccess,
}: ReadyForDescribeProps) => {
  const { address } = useAccount();

  const [state, setState] = React.useState<SongState>({
    address: undefined,
    readyForDescribe: undefined,
    readyForDescribeLoading: false,
    preparereadyForDescribebeError: false,
    readyForDescribeError: false,
  });

  const ad = author ? author : address;

  const [, setReadyForDescribeState] = useAtom(readyForDescribeAtom);

  const { config, isError: preparereadyForDescribebeError } =
    usePrepareContractWrite({
      address: env.NEXT_PUBLIC_CONTRACT_ADDRESS as `0x${string}`,
      chainId: parseInt(env.NEXT_PUBLIC_CHAIN_ID ?? "5"),
      abi,
      functionName: "readyForDescribe",
      args: [ad],
    });

  const {
    data,
    write: readyForDescribe,
    isLoading: readyForDescribeLoading,
    isError: readyForDescribeError,
  } = useContractWrite(config);

  const { isLoading: txLoading } = useWaitForTransaction({
    hash: data?.hash,
    onSuccess: () => {
      onSetSongSuccess;
      setReadyForDescribeState(true);
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
      readyForDescribe,
      readyForDescribeLoading: readyForDescribeLoading || txLoading,
      preparereadyForDescribebeError,
      readyForDescribeError,
    });
  }, [
    address,
    readyForDescribe,
    readyForDescribeLoading,
    preparereadyForDescribebeError,
    readyForDescribeError,
    txLoading,
  ]);

  return state;
};
