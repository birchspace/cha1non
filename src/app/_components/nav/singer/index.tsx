"use client";

import { useRef } from "react";
import { useAccount } from "wagmi";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";

import clsx from "clsx";
import Link from "next/link";
import Lottie from "lottie-react";
import { Create } from "./create";
import { UpdateDescribePrice } from "./update-describe-price";
import subscribeIcon from "public/icons/static/subscribe.json";

export default function SingerNav() {
  const subscribeRef = useRef<any>();

  const pathname = usePathname();

  const { address } = useAccount();

  return (
    <motion.div
      exit={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="sapce-y-1.5"
    >
      <Link
        href={`/singer/${address}`}
        onMouseEnter={() => subscribeRef.current?.play()}
        onMouseLeave={() => subscribeRef.current?.stop()}
        className={clsx(
          "flex items-center gap-2 rounded-lg px-2.5 py-2 text-foreground duration-300 hover:bg-neutral-800",
          {
            "bg-neutral-800 text-primary": pathname === "/subscribe",
          },
        )}
      >
        <Lottie
          lottieRef={subscribeRef}
          animationData={subscribeIcon}
          style={{ width: 24, height: 24 }}
          autoplay={false}
          loop={false}
        />
        <span className="text-sm capitalize">my albums</span>
      </Link>
      <UpdateDescribePrice />
      <Create />
    </motion.div>
  );
}
