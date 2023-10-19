"use client";

import Link from "next/link";
import Image from "next/image";

import { ImagesArray } from "~/utils/images";
import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import { useTransferUserRightPending } from "~/hooks/write/transferUserRightPending";

export default function AlbumSubscribeItem({
  title,
  address,
  index,
}: {
  title: string;
  address: string;
  index: number;
}) {
  const mouseX = useMotionValue(0);

  const mouseY = useMotionValue(0);

  const ImageIndex = index % 5;

  const { transferUserRightPending } = useTransferUserRightPending({
    singer: address,
    name: title,
  });

  return (
    <div
      onMouseMove={(e) => {
        const { left, top } = e.currentTarget.getBoundingClientRect();

        mouseX.set(e.clientX - left);
        mouseY.set(e.clientY - top);
      }}
      className="group relative flex flex-col items-center rounded-xl border border-zinc-800 p-2"
    >
      <div className="absolute right-5 top-0 h-px w-64 bg-gradient-to-l from-transparent via-primary/30 via-10% to-transparent" />
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
      <div className="relative flex flex-col">
        <Link href={`/music/${address}?index=${ImageIndex}`}>
          <figure className="relative rounded-xl px-2 pb-4 pt-6">
            <Image
              src={ImagesArray[ImageIndex]!}
              className="h-full max-h-[280px] w-full max-w-[1024px] rounded-xl object-cover"
              alt={title}
              placeholder="blur"
              blurDataURL={ImagesArray[ImageIndex]!.blurDataURL}
            />
          </figure>
        </Link>
        <div className="flex w-full flex-col space-y-4 px-3 py-1">
          <div className="flex flex-col justify-center space-y-2">
            <div className="flex items-center justify-between">
              <h3 className="text-md font-title font-bold text-primary/30">
                {title}
              </h3>
              <button
                className="badge badge-neutral hidden capitalize group-hover:flex"
                onClick={transferUserRightPending}
              >
                transfer
              </button>
              {/* <div className="badge badge-secondary text-sm">9USDT</div> */}
            </div>
            {/* <span className="w-full max-w-[420px] text-sm leading-[1.8]">
              <span className="inline-flex items-center space-x-1">
                <Icons.CursorClick />

                <span className="tooltip text-xs" data-tip="author">
                  {title}
                </span>
              </span>
            </span> */}
          </div>
          {/* <span className="relative z-20 flex items-center justify-between opacity-50 transition-opacity group-hover:opacity-80">
            <span className="inline-flex items-center space-x-3">
              <span className="inline-flex items-center space-x-1 text-[12px] font-medium text-foreground md:text-sm">
                <Icons.Calendar />
                <span>2020</span>
              </span>
            </span>
          </span> */}
        </div>
      </div>
    </div>
  );
}
