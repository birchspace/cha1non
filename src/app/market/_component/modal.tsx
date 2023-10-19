"use client";

import clsx from "clsx";
import React from "react";

import { useAccount } from "wagmi";
import { useDescribeSinger } from "~/hooks/write/describeSinger";

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

  const connectAddress = address ? address : "null";

  const { describeSinger } = useDescribeSinger({
    singer: singer,
    time: "0",
    price: price,
  });

  return (
    <button className="btn btn-ghost btn-sm" onClick={describeSinger}>
      {text}
    </button>
  );
}
