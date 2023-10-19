"use client";

import Image from "next/image";
import { shortenAddress } from "~/utils";
import { Avatar } from "@nextui-org/react";
import { Tooltip } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { AvatarLinks } from "~/utils/images";
import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import { useTransferUserRightPending } from "~/hooks/write/transferUserRightPending";

export default function SingerSubscribeItem({
  title,
  index,
}: {
  title: string;
  index: number;
}) {
  const router = useRouter();

  const mouseX = useMotionValue(0);

  const mouseY = useMotionValue(0);

  const address = shortenAddress(title);

  const { transferUserRightPending } = useTransferUserRightPending({
    singer: title,
    name: "0x00000000",
  });

  const avatarIndex = index % 5;

  return (
    <div className="group relative flex flex-col items-center  gap-2 rounded-xl border-zinc-800 p-2">
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-xl opacity-0 transition duration-300 group-hover:opacity-100"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              650px circle at ${mouseX}px ${mouseY}px,
              rgba(255,255,255,0.1),
              transparent 80%
            )
          `,
        }}
      />
      <Tooltip content={address}>
        <Image
          alt="avatar"
          src={AvatarLinks[avatarIndex]!}
          style={{
            width: "auto",
            height: "auto",
          }}
          placeholder="blur"
          blurDataURL={AvatarLinks[avatarIndex]!.blurDataURL}
          onClick={() => router.push(`/singer/${title}`)}
        />
      </Tooltip>
      <button
        className="badge badge-neutral hidden capitalize group-hover:flex"
        onClick={transferUserRightPending}
      >
        transfer
      </button>
    </div>
  );
}
