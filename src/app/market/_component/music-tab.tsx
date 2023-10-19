"use client";

import { cn } from "~/utils";
import React, { type FormEvent, useState } from "react";
import { api } from "~/trpc/react";
import { shortenAddress } from "~/utils";
import { ModalContent } from "@nextui-org/react";
import { Select, SelectItem } from "@nextui-org/react";
import { Listbox, ListboxItem } from "@nextui-org/react";
import { Typography } from "~/app/_components/typography";
import { Modal, Button, useDisclosure, Input } from "@nextui-org/react";
import { ModalHeader, ModalBody, ModalFooter } from "@nextui-org/react";
import { Card, CardBody, CardHeader } from "@nextui-org/react";

import { useInvestSinger } from "~/hooks/write/investSinger";

import type { Selection } from "@nextui-org/react";
import { BigNumber } from "ethers";

export function MusicTab() {
  const singerData = api.music.list.useQuery(undefined);

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const [price, setPrice] = React.useState(0);

  const [save, setSave] = React.useState(false);

  const [keys, setKeys] = React.useState<string[]>([]);

  const address = shortenAddress("0xC0a92F6D6B05b3F973A936eda56f28864c5e548C");

  const [selectedKeys, setSelectedKeys] = React.useState<Selection>(new Set());

  const [bigNumberPricesList, setBigNumberPricesList] = React.useState<
    BigNumber[]
  >([]);

  const selectedValue = React.useMemo(
    () => Array.from(selectedKeys),
    [selectedKeys],
  );

  const [prices, setPrices] = React.useState(
    Array(selectedValue.length).fill("0"),
  );

  const { investSinger, investSingerLoading } = useInvestSinger({
    price: price.toString(),
    singer: keys,
    musicPlatform: ["0xC0a92F6D6B05b3F973A936eda56f28864c5e548C"],
    amount: [bigNumberPricesList],
  });

  const handleChange =
    (index: number) => (event: React.ChangeEvent<HTMLInputElement>) => {
      const newPrices = [...prices];
      newPrices[index] = event.target.value;
      setPrices(newPrices);
    };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    setPrice(
      prices.reduce(
        (accumulator: number, currentValue: number): number =>
          accumulator + currentValue,
        0,
      ),
    );
    const bigNumberPrices: BigNumber[] = prices.map((price: number) =>
      BigNumber.from(price),
    );
    const keys = selectedValue.map((item) => item.toString());
    setKeys(keys);
    setBigNumberPricesList(bigNumberPrices);
    setSave(true);

    // 在这里处理你的表单提交逻辑
  };

  return (
    <Card className="overflow-x-auto">
      <CardHeader className=" justify-between">
        <Select label="Select musicPlatform" className="max-w-xs">
          <SelectItem key={"1"} value={address}>
            {address}
          </SelectItem>
        </Select>
        <button className="btn btn-neutral" onClick={onOpen}>
          <Typography>0</Typography>
          <span className=" text-input">|</span>
          investment
        </button>
        <Modal
          isOpen={isOpen}
          isDismissable={false}
          onOpenChange={onOpenChange}
          placement="top-center"
          backdrop="opaque"
          classNames={{
            body: "py-6",
            backdrop: "bg-[#292f46]/50 backdrop-opacity-40",
            base: "border-[#292f46] bg-[#19172c] dark:bg-[#19172c] text-[#a8b0d3]",
            header: "border-b-[1px] border-[#292f46]",
            footer: "border-t-[1px] border-[#292f46]",
            closeButton: "hover:bg-white/5 active:bg-white/10",
          }}
        >
          <form onSubmit={handleSubmit}>
            <ModalContent>
              {(onClose) => (
                <>
                  <ModalHeader className="flex flex-col gap-1">
                    Set price
                  </ModalHeader>
                  <ModalBody>
                    {selectedValue.length > 0 ? (
                      <>
                        {selectedValue.map((item, index) => (
                          <Input
                            autoFocus
                            label={item.toString()}
                            placeholder="Enter price"
                            variant="bordered"
                            key={index}
                            value={prices[index]}
                            onChange={handleChange(index)}
                            min={0}
                            type="number"
                            isRequired
                          />
                        ))}
                      </>
                    ) : (
                      <div>please select</div>
                    )}
                  </ModalBody>
                  <ModalFooter>
                    <Button color="danger" variant="flat" onPress={onClose}>
                      Close
                    </Button>
                    <Button
                      color="default"
                      type="submit"
                      className={cn(save ? "hidden" : "", "capitalize")}
                    >
                      save
                    </Button>
                    <Button
                      color="default"
                      className={cn(!save ? "hidden" : "", "capitalize")}
                      onClick={() => setSave(false)}
                    >
                      rewrite
                    </Button>
                    <Button
                      color="default"
                      onClick={investSinger}
                      isLoading={investSingerLoading}
                      className={cn(!save ? "hidden" : "", "capitalize")}
                    >
                      start
                    </Button>
                  </ModalFooter>
                </>
              )}
            </ModalContent>
          </form>
        </Modal>
      </CardHeader>
      <CardBody>
        {singerData.data ? (
          <div className="overflow-x-auto">
            <div className="flex flex-col gap-2">
              <div className="rounded-small border-small border-default-200 px-1 py-2 dark:border-default-100">
                <Listbox
                  aria-label="Multiple selection example"
                  variant="flat"
                  disallowEmptySelection
                  selectionMode="multiple"
                  selectedKeys={selectedKeys}
                  onSelectionChange={setSelectedKeys}
                >
                  {singerData.data.map((item) => (
                    <ListboxItem key={item}>{shortenAddress(item)}</ListboxItem>
                  ))}
                </Listbox>
              </div>
            </div>
          </div>
        ) : null}
      </CardBody>
    </Card>
  );
}
