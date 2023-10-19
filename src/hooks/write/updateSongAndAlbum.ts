import React from "react";
import abi from "~/config/abi.json";
import { env } from "~/env.mjs";
import { useAccount, useContractWrite } from "wagmi";
import { stringToBytes4 } from "~/utils";
import { usePrepareContractWrite, useWaitForTransaction } from "wagmi";
import { toast } from "react-toastify";
import { ethers } from "ethers";

//   歌手：设置订阅价格
interface UpdateSongProps {
  price: string;
  onSetSongSuccess?: () => void;
}

interface SongState {
  address: `0x${string}` | undefined;
  updateSong: (() => void) | undefined;
  updateSongLoading: boolean;
  prepareupdateSongbeError: boolean;
  updateSongError: boolean;
}

export const useUpdateSong = ({ price, onSetSongSuccess }: UpdateSongProps) => {
  const { address } = useAccount();

  const [state, setState] = React.useState<SongState>({
    address: undefined,
    updateSong: undefined,
    updateSongLoading: false,
    prepareupdateSongbeError: false,
    updateSongError: false,
  });
  const priceNumber = price === "" ? "1" : price;

  const { config, isError: prepareupdateSongbeError } = usePrepareContractWrite(
    {
      address: env.NEXT_PUBLIC_CONTRACT_ADDRESS as `0x${string}`,
      chainId: parseInt(env.NEXT_PUBLIC_CHAIN_ID ?? "5"),
      abi,
      functionName: "updateSongAndAlbum",
      args: [
        price.length > 1 ? ethers.utils.parseEther(price).toString() : price,
        "0x0000000",
      ],
    },
  );

  const {
    data,
    write: updateSong,
    isLoading: updateSongLoading,
    isError: updateSongError,
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
      updateSong,
      updateSongLoading: updateSongLoading || txLoading,
      prepareupdateSongbeError,
      updateSongError,
    });
  }, [
    address,
    updateSong,
    updateSongLoading,
    prepareupdateSongbeError,
    updateSongError,
    txLoading,
  ]);

  return state;
};
