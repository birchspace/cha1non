import React from "react";
import abi from "~/config/abi.json";
import { env } from "~/env.mjs";
import { useAccount, useContractWrite } from "wagmi";
import { stringToBytes4 } from "~/utils";
import { usePrepareContractWrite, useWaitForTransaction } from "wagmi";
import { toast } from "react-toastify";

interface TransferUserRightPendingProps {
  name: string;
  singer: string;
  onSetSongSuccess?: () => void;
}

interface SongState {
  address: `0x${string}` | undefined;
  transferUserRightPending: (() => void) | undefined;
  transferUserRightPendingLoading: boolean;
  preparetransferUserRightPendingbeError: boolean;
  transferUserRightPendingError: boolean;
}

export const useTransferUserRightPending = ({
  singer,
  name,
  onSetSongSuccess,
}: TransferUserRightPendingProps) => {
  const { address } = useAccount();

  const [state, setState] = React.useState<SongState>({
    address: undefined,
    transferUserRightPending: undefined,
    transferUserRightPendingLoading: false,
    preparetransferUserRightPendingbeError: false,
    transferUserRightPendingError: false,
  });

  const { config, isError: preparetransferUserRightPendingbeError } =
    usePrepareContractWrite({
      address: env.NEXT_PUBLIC_CONTRACT_ADDRESS as `0x${string}`,
      chainId: parseInt(env.NEXT_PUBLIC_CHAIN_ID ?? "5"),
      abi,
      functionName: "transferUserRightPending",
      args: [singer, name],
    });

  const {
    data,
    write: transferUserRightPending,
    isLoading: transferUserRightPendingLoading,
    isError: transferUserRightPendingError,
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
      transferUserRightPending,
      transferUserRightPendingLoading:
        transferUserRightPendingLoading || txLoading,
      preparetransferUserRightPendingbeError,
      transferUserRightPendingError,
    });
  }, [
    address,
    transferUserRightPending,
    transferUserRightPendingLoading,
    preparetransferUserRightPendingbeError,
    transferUserRightPendingError,
    txLoading,
  ]);

  return state;
};
