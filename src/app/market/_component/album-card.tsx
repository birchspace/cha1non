"use client";

import React from "react";
import { Card, CardHeader, Link } from "@nextui-org/react";
import { CardBody, CardFooter, Divider } from "@nextui-org/react";
import { DropdownMenu, Button as RadixButton } from "@radix-ui/themes";

import { useAccount } from "wagmi";
import { useDescribeSinger } from "~/hooks/write/describeSinger";
import { toast } from "react-toastify";

export function AlbumCard() {
  const { address } = useAccount();

  const connectAddress = address ? address.toString() : "null";

  const thirty = useDescribeSinger({
    singer: connectAddress,
    time: "0",
  });

  const { describeSinger, describeSingerLoading } = useDescribeSinger({
    singer: connectAddress,
    time: "60",
  });

  React.useEffect(() => {
    if (describeSingerLoading) {
      toast.success(`🦄 loading`, {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
  }, [describeSingerLoading]);

  return (
    <Card className="w-72 border-none px-4 py-2">
      <CardHeader className="flex gap-3">
        <div className="flex flex-col">
          <p className="text-md">Name</p>
          <p className="text-xs text-default-400">创建时间</p>
        </div>
      </CardHeader>
      <Divider />
      <CardBody>
        <p>Make beautiful websites regardless of your design experience.</p>
      </CardBody>
      <Divider />
      <CardFooter className="flex items-center justify-between">
        <Link
          isExternal
          showAnchorIcon
          href="https://github.com/nextui-org/nextui"
        >
          Visit now
        </Link>
        <DropdownMenu.Root>
          <DropdownMenu.Trigger>
            <RadixButton variant="ghost" className="" highContrast>
              <span className="btn btn-neutral btn-sm">Options</span>
            </RadixButton>
          </DropdownMenu.Trigger>
          <DropdownMenu.Content>
            <DropdownMenu.Sub>
              <DropdownMenu.SubTrigger>sytem</DropdownMenu.SubTrigger>
              <DropdownMenu.SubContent>
                <DropdownMenu.Item>30</DropdownMenu.Item>
                <DropdownMenu.Separator />
                <DropdownMenu.Item>60</DropdownMenu.Item>
              </DropdownMenu.SubContent>
            </DropdownMenu.Sub>

            {/* ---------------- */}
            <DropdownMenu.Sub>
              <DropdownMenu.SubTrigger>self</DropdownMenu.SubTrigger>
              <DropdownMenu.SubContent>
                <DropdownMenu.Item>
                  <button className="" onClick={thirty.describeSinger}>
                    30
                  </button>
                </DropdownMenu.Item>
                <DropdownMenu.Separator />
                <DropdownMenu.Item
                  onClick={describeSinger}
                  className="px-3 py-2"
                >
                  60
                </DropdownMenu.Item>
              </DropdownMenu.SubContent>
            </DropdownMenu.Sub>
          </DropdownMenu.Content>
        </DropdownMenu.Root>
      </CardFooter>
    </Card>
  );
}
