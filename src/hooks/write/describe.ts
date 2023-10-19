import React from "react";
import abi from "~/config/abi.json";
import { env } from "~/env.mjs";
import { useAccount, useContractWrite } from "wagmi";
import { stringToBytes4 } from "~/utils";
import { usePrepareContractWrite, useWaitForTransaction } from "wagmi";
import { toast } from "react-toastify";

// 订阅歌手
interface DescribeProps {
  name: string;
  price: string;
  time: string;
  onSetSongSuccess?: () => void;
}

interface SongState {
  address: `0x${string}` | undefined;
  describe: (() => void) | undefined;
  describeLoading: boolean;
  preparedescribebeError: boolean;
  describeError: boolean;
}

export const useDescribe = ({
  price,
  name,
  time,
  onSetSongSuccess,
}: DescribeProps) => {
  const { address } = useAccount();

  const [state, setState] = React.useState<SongState>({
    address: undefined,
    describe: undefined,
    describeLoading: false,
    preparedescribebeError: false,
    describeError: false,
  });

  const { config, isError: preparedescribebeError } = usePrepareContractWrite({
    address: env.NEXT_PUBLIC_CONTRACT_ADDRESS as `0x${string}`,
    chainId: parseInt(env.NEXT_PUBLIC_CHAIN_ID ?? "5"),
    abi,
    functionName: "describe",
    args: [price, name, "0x00000000", time],
  });

  const {
    data,
    write: describe,
    isLoading: describeLoading,
    isError: describeError,
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
      describe,
      describeLoading: describeLoading || txLoading,
      preparedescribebeError,
      describeError,
    });
  }, [
    address,
    describe,
    describeLoading,
    preparedescribebeError,
    describeError,
    txLoading,
  ]);

  return state;
};
