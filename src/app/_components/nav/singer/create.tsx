"use client";

import React from "react";
import { motion } from "framer-motion";
import { PlusSquare } from "lucide-react";
import { Button, Input } from "@nextui-org/react";
import { RadioGroup, Radio } from "@nextui-org/react";
import { Modal, ModalContent, ModalHeader } from "@nextui-org/react";
import { useDisclosure, ModalBody, ModalFooter } from "@nextui-org/react";

import { cn, stringToBytes4 } from "~/utils";
import { useAtom } from "jotai";
import { api } from "~/trpc/react";
import { useAccount } from "wagmi";
import { numAtom } from "~/utils/atom";
import { useHooks } from "../../provider";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useCreateAlbum } from "~/hooks/write/createAlbum";

type FormValues = {
  name: string;
  price: string;
};

export function Create() {
  const router = useRouter();

  const { signer } = useHooks();

  const { address } = useAccount();

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

  const connectAddress = address ? address : "null";

  const [selected, setSelected] = React.useState("system");

  const [isHovered, setIsHovered] = React.useState(false);

  const [isHidden, setIsHidden] = React.useState(true);

  const [name, setNmae] = React.useState("");

  const [num] = useAtom(numAtom);

  const [price, setPrice] = React.useState("");

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const { register, handleSubmit } = useForm<FormValues>();

  const { mutate } = api.music.create.useMutation({
    onSuccess: () => {
      router.refresh();
    },
  });

  const handleSystem = async () => {
    const tx = await signer.updateSongAndAlbum(
      address,
      price,
      stringToBytes4(name),
      {
        gasLimit: 500000,
      },
    );

    await tx.wait();
    money.mutate({
      address: connectAddress,
      number: 1,
    });
  };

  const onSubmit = handleSubmit((data) => {
    setNmae(data.name);
    setPrice(data.price);
    if (!data.name) {
      toast.error("🦄 please check input", {
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

  const { createAlbum, createAlbumLoading } = useCreateAlbum({
    name: name,
    price: price,
  });

  const handleIshidden = () => {
    setIsHidden(true);
  };

  React.useEffect(() => {
    if (createAlbumLoading) {
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
  }, [createAlbumLoading]);

  React.useEffect(() => {
    mutate({ author: connectAddress, title: name });
  }, [num]);

  return (
    <>
      <motion.button
        onClick={onOpen}
        className="btn-ghost mt-1 flex w-full items-center gap-2 rounded-lg px-2.5 py-2 text-sm capitalize text-foreground duration-300 hover:bg-neutral-800"
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
      >
        <motion.div
          animate={isHovered ? { rotate: [0, 15, 30, 90] } : { rotate: 0 }}
        >
          <PlusSquare className="text-[#8D8F8F]" />
        </motion.div>
        create ablum
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
                create ablum
              </ModalHeader>
              <ModalBody>
                <form onSubmit={onSubmit}>
                  <Input
                    autoFocus
                    label="name"
                    placeholder="Album name"
                    variant="bordered"
                    required
                    {...register("name")}
                  />
                  <Input
                    autoFocus
                    label="price"
                    placeholder="Your describe price"
                    variant="bordered"
                    required
                    min={0}
                    type="number"
                    className="mt-2"
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
                        onClick={() => setIsHidden(true)}
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
                          selected == "system" ? handleSystem : createAlbum
                        }
                        className={cn(
                          " bg-gradient-to-tr from-pink-500 to-yellow-500 text-white shadow-lg",
                          isHidden ? "hidden" : "",
                        )}
                        isLoading={createAlbumLoading}
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
