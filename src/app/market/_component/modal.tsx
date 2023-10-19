"use client";

import clsx from "clsx";
import React from "react";

import { useDescribeSinger } from "~/hooks/write/describeSinger";
import { useReadyForDescribe } from "~/hooks/write/readyForDescribe";
import { DropdownMenu } from "@radix-ui/themes";
import { useAccount } from "wagmi";
import { useAtom } from "jotai";
import { readyForDescribeAtom } from "~/utils/atom";
import { useHooks } from "~/app/_components/provider";

export function ModalButton({
  text,
  singer,
  price,
}: {
  text: string;
  singer: string;
  price: string;
}) {
  const { address } = useAccount();
  const [readyForDescribeState] = useAtom(readyForDescribeAtom);
  const { readyForDescribe } = useReadyForDescribe({ author: address });

  const thirty = useDescribeSinger({
    singer: singer,
    time: "0",
    price: price,
  });

  const sixty = useDescribeSinger({
    singer: singer,
    time: "1",
    price: price,
  });

  const { signer } = useHooks();

  const handleThirty = async () => {
    console.log(price, "price");

    const tx = await signer.describe(singer, "0x00000000", "0", address, {
      value: BigInt(price),
      gasLimit: 500000,
    });

    await tx.wait();
  };

  const handleSixty = async () => {
    const tx = await signer.describe(singer, "0x00000000", "1", address, {
      value: BigInt(price),
      gasLimit: 500000,
    });
    await tx.wait();
  };

  return (
    <div>
      <DropdownMenu.Root>
        <DropdownMenu.Trigger>
          <button className="btn btn-xs rounded-xl">{text}</button>
        </DropdownMenu.Trigger>
        <DropdownMenu.Content>
          <DropdownMenu.Sub>
            <DropdownMenu.SubTrigger className="px-3 capitalize">
              self
            </DropdownMenu.SubTrigger>
            <DropdownMenu.SubContent className="m-2">
              <DropdownMenu.Item
                onClick={
                  readyForDescribeState
                    ? thirty.describeSinger
                    : readyForDescribe
                }
              >
                30 days
              </DropdownMenu.Item>
              <DropdownMenu.Item
                onClick={
                  readyForDescribeState
                    ? sixty.describeSinger
                    : readyForDescribe
                }
              >
                60 days
              </DropdownMenu.Item>
            </DropdownMenu.SubContent>
          </DropdownMenu.Sub>
          <DropdownMenu.Sub>
            <DropdownMenu.SubTrigger className="px-3 capitalize">
              system
            </DropdownMenu.SubTrigger>
            <DropdownMenu.SubContent className="m-2">
              <DropdownMenu.Item onClick={handleThirty}>
                30 days
              </DropdownMenu.Item>
              <DropdownMenu.Item onClick={handleSixty}>
                60 days
              </DropdownMenu.Item>
            </DropdownMenu.SubContent>
          </DropdownMenu.Sub>
        </DropdownMenu.Content>
      </DropdownMenu.Root>
    </div>
  );
}
