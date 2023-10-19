"use client";

import Link from "next/link";
import { shortenAddress } from "~/utils";
import { Avatar } from "@nextui-org/react";
import { Tooltip } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { motion, useMotionTemplate, useMotionValue } from "framer-motion";

export default function SingerSubscribeItem({ title }: { title: string }) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const router = useRouter();

  const address = shortenAddress(title);
  return (
    <div className="group relative flex flex-col items-center rounded-xl border-zinc-800 p-2">
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

      <Tooltip content={address} placement="bottom">
        <Avatar
          isBordered
          radius="sm"
          size="lg"
          src="https://i.pravatar.cc/150?u=a04258a2462d826712d"
          onClick={() => router.push(`/singer/${title}`)}
        />
      </Tooltip>
    </div>
  );
}
