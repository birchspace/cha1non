import React from "react";
import abi from "~/config/abi.json";
import { env } from "~/env.mjs";
import { useAccount, useContractWrite } from "wagmi";
import { stringToBytes4 } from "~/utils";
import { usePrepareContractWrite, useWaitForTransaction } from "wagmi";
import { toast } from "react-toastify";
import { useAtom } from "jotai";
import { numAtom } from "~/utils/atom";

//   歌手：创建专辑
interface CreateAlbumProps {
  name: string;
  price: string;
  onSetSongSuccess?: () => void;
}

interface SongState {
  address: `0x${string}` | undefined;
  createAlbum: (() => void) | undefined;
  createAlbumLoading: boolean;
  preparecreateAlbumbeError: boolean;
  createAlbumError: boolean;
}

export const useCreateAlbum = ({
  price,
  name,
  onSetSongSuccess,
}: CreateAlbumProps) => {
  const { address } = useAccount();

  const [state, setState] = React.useState<SongState>({
    address: undefined,
    createAlbum: undefined,
    createAlbumLoading: false,
    preparecreateAlbumbeError: false,
    createAlbumError: false,
  });

  const { config, isError: preparecreateAlbumbeError } =
    usePrepareContractWrite({
      address: env.NEXT_PUBLIC_CONTRACT_ADDRESS as `0x${string}`,
      chainId: parseInt(env.NEXT_PUBLIC_CHAIN_ID ?? "5"),
      abi,
      functionName: "updateSongAndAlbum",
      args: [address, price, stringToBytes4(name)],
    });

  const {
    data,
    write: createAlbum,
    isLoading: createAlbumLoading,
    isError: createAlbumError,
  } = useContractWrite(config);
  const [, setNum] = useAtom(numAtom);

  const { isLoading: txLoading } = useWaitForTransaction({
    hash: data?.hash,
    onSuccess: () => {
      onSetSongSuccess;

      setNum((num) => num + 1);
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
      createAlbum,
      createAlbumLoading: createAlbumLoading || txLoading,
      preparecreateAlbumbeError,
      createAlbumError,
    });
  }, [
    address,
    createAlbum,
    createAlbumLoading,
    preparecreateAlbumbeError,
    createAlbumError,
    txLoading,
  ]);

  return state;
};
