"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";

import { ImagesArray } from "~/utils/images";
import { Card, CardHeader } from "@nextui-org/react";
import { CardBody, CardFooter, Divider } from "@nextui-org/react";

export function AlbumCard({ name, index }: { name: string; index: number }) {
  const ImageIndex = index % 5;

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
      </CardFooter>
    </Card>
  );
}
