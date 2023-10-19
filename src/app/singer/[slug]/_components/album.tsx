"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";

import { ImagesArray } from "~/utils/images";
import { Card, CardHeader } from "@nextui-org/react";
import { useIsDescribeAlbum } from "~/hooks/read/isDescribeAlbum";
import { CardBody, CardFooter, Divider } from "@nextui-org/react";
import { useTransferUserRightPending } from "~/hooks/write/transferUserRightPending";

export function AlbumCard({
  name,
  index,
  singer,
}: {
  name: string;
  index: number;
  singer: string;
}) {
  const ImageIndex = index % 5;
  const { transferUserRightPending } = useTransferUserRightPending({
    name: name,
    singer: singer,
  });

  const { isDescribeAlbum } = useIsDescribeAlbum({
    singer: singer,
    name: name,
  });

  return (
    <Card className="w-72 border-none px-4 py-2" key={name}>
      <CardHeader className="flex gap-3">
        <div className="flex flex-col">
          <p className="text-md">{name}</p>
        </div>
      </CardHeader>
      <Divider />
      <CardBody>
        <Image
          style={{
            width: "auto",
            height: "auto",
          }}
          placeholder="blur"
          blurDataURL={ImagesArray[ImageIndex]!.blurDataURL}
          src={ImagesArray[ImageIndex]!}
          alt="1"
        />
      </CardBody>
      <CardFooter className="flex items-center justify-center">
        <Link href={`/music/${name}?index=${ImageIndex}`}>
          <button className="btn btn-ghost btn-md">Visit now</button>
        </Link>
        {isDescribeAlbum ? (
          <button
            className="btn btn-ghost btn-sm"
            onClick={transferUserRightPending}
          >
            transfer
          </button>
        ) : null}
      </CardFooter>
    </Card>
  );
}
