"use client";

import React from "react";
import { motion } from "framer-motion";
import { CircleDollarSign } from "lucide-react";
import { Button, Input } from "@nextui-org/react";
import { RadioGroup, Radio } from "@nextui-org/react";
import { Modal, ModalContent, ModalHeader } from "@nextui-org/react";
import { useDisclosure, ModalBody, ModalFooter } from "@nextui-org/react";

import { useAccount } from "wagmi";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { cn, isEOAAddress } from "~/utils";
import { useHooks } from "../../provider";
import { useUpdateSong } from "~/hooks/write/updateSongAndAlbum";
import { api } from "~/trpc/react";

type FormValues = {
  price: string;
};

export function UpdateDescribePrice() {
  const [isHovered, setIsHovered] = React.useState(false);

  const [isHidden, setIsHidden] = React.useState(true);

  const [selected, setSelected] = React.useState<string>("system");

  const { address } = useAccount();

  const [price, setPrice] = React.useState("");

  const { signer } = useHooks();

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const { register, handleSubmit } = useForm<FormValues>();

  const money = api.money.sub.useMutation({
    onSuccess: () => {
      toast.success(`🦄 balance -1`, {
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

  const onSubmit = handleSubmit((data) => {
    const pr = data.price;
    setPrice(pr);
    setIsHidden(false);
  });

  const { updateSong, updateSongLoading } = useUpdateSong({ price: price });

  const handleIshidden = () => {
    setIsHidden(true);
  };

  const handleSystem = async () => {
    const tx = await signer.updateSongAndAlbum(address, price, "0x00000000", {
      gasLimit: 500000,
    });

    await tx.wait();
    money.mutate({
      address: address!,
      number: 1,
    });
  };

  React.useEffect(() => {
    if (updateSongLoading) {
      toast("🦄 Loading", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
  }, [updateSongLoading]);

  return (
    <>
      <motion.button
        onClick={onOpen}
        className="btn-ghost mt-1 flex w-full items-center gap-2 rounded-lg px-2.5 py-2 text-foreground duration-300 hover:bg-neutral-800"
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
      >
        <motion.div
          animate={
            isHovered ? { rotate: [0, 180, 360, 360, 0] } : { rotate: 0 }
          }
        >
          <CircleDollarSign className="text-[#8D8F8F]" />
        </motion.div>
        set describe price
      </motion.button>
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
                set your describe price
              </ModalHeader>
              <ModalBody>
                <form onSubmit={onSubmit}>
                  <Input
                    autoFocus
                    label="price"
                    placeholder="Your describe price"
                    variant="bordered"
                    required
                    min={0}
                    type="number"
                    {...register("price")}
                  />
                  <ModalFooter className="items-center justify-between pl-0 pt-6">
                    <RadioGroup
                      value={selected}
                      orientation="horizontal"
                      onValueChange={setSelected}
                    >
                      <Radio value="system" className="capitalize">
                        system
                      </Radio>
                      <Radio
                        value="self"
                        color="secondary"
                        className="capitalize"
                      >
                        self
                      </Radio>
                    </RadioGroup>
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
                        onClick={
                          selected == "system" ? handleSystem : updateSong
                        }
                        className={cn(
                          " bg-gradient-to-tr from-pink-500 to-yellow-500 text-white shadow-lg",
                          isHidden ? "hidden" : "",
                        )}
                        isLoading={updateSongLoading}
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
