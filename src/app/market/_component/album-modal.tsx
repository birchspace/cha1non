"use client";

import React from "react";

import { useAtom } from "jotai";
import { useAccount } from "wagmi";
import { DropdownMenu } from "@radix-ui/themes";
import { readyForDescribeAtom } from "~/utils/atom";
import { useHooks } from "~/app/_components/provider";
import { useDescribeAlbums } from "~/hooks/write/describeAlbums";
import { useReadyForDescribe } from "~/hooks/write/readyForDescribe";

export function AlbumModalButton({
  text,
  singer,
  price,
  name,
}: {
  text: string;
  singer: string;
  price: string;
  name: string;
}) {
  const { address } = useAccount();
  const [readyForDescribeState] = useAtom(readyForDescribeAtom);
  const { readyForDescribe } = useReadyForDescribe({ author: address });

  const thirty = useDescribeAlbums({
    singer: singer,
    time: "0",
    price: price,
    name: name,
  });

  const sixty = useDescribeAlbums({
    singer: singer,
    time: "1",
    price: price,
    name: name,
  });

  const { signer } = useHooks();

  const handleThirty = async () => {

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
                    ? thirty.describeAlbums
                    : readyForDescribe
                }
              >
                30 days
              </DropdownMenu.Item>
              <DropdownMenu.Item
                onClick={
                  readyForDescribeState
                    ? sixty.describeAlbums
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
