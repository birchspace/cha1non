import clsx from "clsx";
import React from "react";
import Lottie from "lottie-react";
import arrowIcon from "public/icons/static/arrow.json";
import { Button, Input } from "@nextui-org/react";
import { Modal, ModalContent, ModalHeader } from "@nextui-org/react";
import { useDisclosure, ModalBody, ModalFooter } from "@nextui-org/react";

import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { cn, isEOAAddress, isBytes4 } from "~/utils";
import { useSingerAlbums } from "~/hooks/read/singerAlbums";

type FormValues = {
  singer: string;
  name: string;
};

export function SingerAlbums() {
  const arrowRef = React.useRef<any>();

  const [isHidden, setIsHidden] = React.useState(true);

  const [singer, setSinger] = React.useState("");

  const [name, setName] = React.useState("");

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const { register, handleSubmit } = useForm<FormValues>();

  const onSubmit = handleSubmit((data) => {
    setName(data.name);
    setSinger(data.singer);
    if (!isBytes4(name)) {
      toast.error("🦄 Please check name input", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      return;
    }
    if (!isEOAAddress(data.singer)) {
      toast.error("🦄 Please check input", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      return;
    }

    setIsHidden(false);
    // handleMarketLengthMusic(data.singer);
  });

  const { singerAlbums } = useSingerAlbums({ input: singer, name: name });

  const handleIshidden = () => {
    setIsHidden(true);
  };

  const handleUseMarketLengthMusic = () => {
    if (!isBytes4(name)) {
      toast.error("🦄 Please check name input", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      return;
    }
    toast(`🦄 ${singerAlbums}`, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  };

  return (
    <>
      <button
        onClick={onOpen}
        onMouseEnter={() => arrowRef.current?.play()}
        onMouseLeave={() => arrowRef.current?.stop()}
        className={clsx(
          "flex items-center gap-2 rounded-lg px-2.5 py-2 text-foreground duration-300 hover:bg-neutral-800  hover:text-primary",
        )}
      >
        <Lottie
          lottieRef={arrowRef}
          animationData={arrowIcon}
          style={{ width: 20, height: 20 }}
          autoplay={false}
          loop={false}
        />
        <span className="text-sm capitalize">quary singer albums</span>
      </button>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        placement="top-center"
        isDismissable={false}
        size="lg"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 capitalize">
                quary MarketLenth
              </ModalHeader>
              <ModalBody>
                <form onSubmit={onSubmit}>
                  <Input
                    autoFocus
                    label="Singer Address"
                    placeholder="Enter singer address"
                    variant="bordered"
                    required
                    min={42}
                    {...register("singer")}
                  />
                  <Input
                    label="Album name"
                    placeholder="Enter album name"
                    variant="bordered"
                    required
                    className="mt-4"
                    {...register("name")}
                  />
                  <ModalFooter className="items-center justify-between pl-0 pt-6">
                    <div className="flex items-center gap-4">
                      <Button
                        color="danger"
                        size="sm"
                        variant="flat"
                        onPress={onClose}
                      >
                        Close
                      </Button>
                      <Button
                        color="primary"
                        size="sm"
                        type="submit"
                        className={cn(
                          "bg-pink-600 text-white shadow-lg",
                          !isHidden ? "hidden" : "",
                        )}
                      >
                        Save
                      </Button>
                      <Button
                        color="primary"
                        size="sm"
                        onClick={handleIshidden}
                        className={cn(
                          "bg-pink-600 text-white shadow-lg",
                          isHidden ? "hidden" : "",
                        )}
                      >
                        rewrite
                      </Button>
                      <Button
                        color="default"
                        size="sm"
                        onClick={handleUseMarketLengthMusic}
                        className={cn(
                          " bg-gradient-to-tr from-pink-500 to-yellow-500 text-white shadow-lg",
                          isHidden ? "hidden" : "",
                        )}
                      >
                        Start
                      </Button>
                    </div>
                  </ModalFooter>
                </form>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
