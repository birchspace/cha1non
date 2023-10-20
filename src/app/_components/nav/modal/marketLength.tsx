import clsx from "clsx";
import React from "react";
import Lottie from "lottie-react";
import { RadioGroup, Radio } from "@nextui-org/react";
import arrowIcon from "public/icons/static/arrow.json";
import { Button, Checkbox, Input, Link } from "@nextui-org/react";
import { Modal, ModalContent, ModalHeader } from "@nextui-org/react";
import { Tabs, Tab, Card, CardBody, CardHeader } from "@nextui-org/react";
import { useDisclosure, ModalBody, ModalFooter } from "@nextui-org/react";

import { toast } from "react-toastify";
import { cn, isEOAAddress, isBytes4 } from "~/utils";
import { useForm, Resolver } from "react-hook-form";
import { useHooks } from "~/app/_components/provider";
import { useMarketLengthMusic } from "~/hooks/read/marketLength";
import { useMarketLengthMusicAlbum } from "~/hooks/read/marketLengthAlbum";

type FormValues = {
  singer: string;
};

type FormValuesAlbum = {
  singerAddress: string;
  name: string;
};

export function MarketLenth() {
  const arrowRef = React.useRef<any>();

  const { signer } = useHooks();

  const [isHidden, setIsHidden] = React.useState(true);

  const [singer, setSinger] = React.useState("");

  const [name, setName] = React.useState("");

  const [marketLengthMusicAlbumData, setMarketLengthMusicAlbumData] =
    React.useState("");

  const [selected, setSelected] = React.useState("music");

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const { register, handleSubmit } = useForm<FormValues>();

  const res = useForm<FormValuesAlbum>();

  const handleSelectionChange = (key: React.Key) => {
    if (typeof key === "string") {
      setSelected(key);
    }
  };

  const onSubmit = handleSubmit((data) => {
    setSinger(data.singer);
    if (!isEOAAddress(data.singer)) {
      toast.error("🦄 Please check singer address input", {
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
  });

  const onSubmitAlbum = res.handleSubmit((data) => {
    setSinger(data.singerAddress);
    setName(data.name);
    if (!isEOAAddress(data.singerAddress)) {
      toast.error(singer, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
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
    setIsHidden(false);
  });

  const { marketLengthMusic } = useMarketLengthMusic({ singer: singer });

  const { marketLengthMusicAlbum } = useMarketLengthMusicAlbum({
    singer: singer,
    name: name,
  });

  const handleIshidden = () => {
    setIsHidden(true);
  };

  const handleUseMarketLengthMusic = () => {
    if (singer.length !== 42) {
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
    toast(`🦄 ${marketLengthMusic}`, {
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

  const handleUseMarketLengthAlbum = () => {
    if (singer.length !== 42) {
      toast.error("🦄 Please check address input", {
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
    setMarketLengthMusicAlbumData(marketLengthMusicAlbum);
    toast.success(`🦄 Quary market length siccess: ${marketLengthMusicAlbum}`, {
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
        <span className="text-sm capitalize">quary MarketLenth</span>
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
                <Tabs
                  fullWidth
                  size="md"
                  aria-label="Tabs form"
                  selectedKey={selected}
                  onSelectionChange={handleSelectionChange}
                >
                  <Tab key="music" title="Music">
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
                            Quary
                          </Button>
                        </div>
                      </ModalFooter>
                    </form>
                  </Tab>
                  <Tab key="album" title="Album">
                    <form onSubmit={onSubmitAlbum}>
                      <Input
                        autoFocus
                        label="Singer address"
                        placeholder="Enter singer address"
                        variant="bordered"
                        required
                        min={42}
                        {...res.register("singerAddress")}
                      />

                      <Input
                        autoFocus
                        label="Album name"
                        placeholder="Enter album name"
                        variant="bordered"
                        required
                        min={0}
                        className="mt-4"
                        {...res.register("name")}
                      />
                      <ModalFooter className=" flex flex-col items-start pl-0 pt-6">
                        <div className="flex items-center justify-start gap-4">
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
                            onClick={handleUseMarketLengthAlbum}
                            className={cn(
                              " bg-gradient-to-tr from-pink-500 to-yellow-500 text-white shadow-lg",
                              isHidden ? "hidden" : "",
                            )}
                          >
                            Quary
                          </Button>
                        </div>
                      </ModalFooter>
                    </form>
                  </Tab>
                </Tabs>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
