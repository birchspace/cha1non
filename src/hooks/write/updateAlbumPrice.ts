import React from "react";
import abi from "~/config/abi.json";
import { env } from "~/env.mjs";
import { useAccount, useContractWrite } from "wagmi";
import { stringToBytes4 } from "~/utils";
import { usePrepareContractWrite, useWaitForTransaction } from "wagmi";

//   歌手：创建专辑价格
interface UpdateAlbumPriceProps {
  name: string;
  price: string;
  onSetSongSuccess?: () => void;
}

interface UpdateAlbumPriceState {
  address: `0x${string}` | undefined;
  updateAlbumPrice: (() => void) | undefined;
  updateAlbumPriceLoading: boolean;
  prepareupdateAlbumPricebeError: boolean;
  updateAlbumPriceError: boolean;
}

export const useUpdateAlbumPrice = ({
  price,
  name,
  onSetSongSuccess,
}: UpdateAlbumPriceProps) => {
  const { address } = useAccount();

  const [state, setState] = React.useState<UpdateAlbumPriceState>({
    address: undefined,
    updateAlbumPrice: undefined,
    updateAlbumPriceLoading: false,
    prepareupdateAlbumPricebeError: false,
    updateAlbumPriceError: false,
  });

  const { config, isError: prepareupdateAlbumPricebeError } =
    usePrepareContractWrite({
      address: env.NEXT_PUBLIC_CONTRACT_ADDRESS as `0x${string}`,
      chainId: parseInt(env.NEXT_PUBLIC_CHAIN_ID ?? "5"),
      abi,
      functionName: "updateSongAndAlbum",
      args: [address, price, stringToBytes4(name)],
    });

  const {
    data,
    write: updateAlbumPrice,
    isLoading: updateAlbumPriceLoading,
    isError: updateAlbumPriceError,
  } = useContractWrite(config);

  const { isLoading: txLoading } = useWaitForTransaction({
    hash: data?.hash,
    onSuccess: () => {
      if (onSetSongSuccess) {
        onSetSongSuccess();
      }
    },
  });

  React.useEffect(() => {
    setState({
      address,
      updateAlbumPrice,
      updateAlbumPriceLoading: updateAlbumPriceLoading || txLoading,
      prepareupdateAlbumPricebeError,
      updateAlbumPriceError,
    });
  }, [
    address,
    updateAlbumPrice,
    updateAlbumPriceLoading,
    prepareupdateAlbumPricebeError,
    updateAlbumPriceError,
    txLoading,
  ]);

  return state;
};
