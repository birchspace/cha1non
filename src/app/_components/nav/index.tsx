"use client";

import { useAtom } from "jotai";
import { roleAtom } from "~/utils/atom";
import { usePathname } from "next/navigation";

import clsx from "clsx";
import React from "react";
import UserNav from "./user";
import Link from "next/link";
import { Modal } from "./modal";
import SingerNav from "./singer";
import Lottie from "lottie-react";
import homeIcon from "public/icons/static/home.json";
import platformIcon from "public/icons/static/projects.json";

export function Navigation() {
  const homeRef = React.useRef<any>();

  const platformRef = React.useRef<any>();

  const pathname = usePathname();

  const [role] = useAtom(roleAtom);

  return (
    <nav className="hidden flex-col gap-1.5 lg:flex">
      <Link
        href="/"
        onMouseEnter={() => homeRef.current?.play()}
        onMouseLeave={() => homeRef.current?.stop()}
        className={clsx(
          "flex items-center gap-2 rounded-lg px-2.5 py-2 text-foreground duration-300 hover:bg-neutral-800",
          {
            "bg-neutral-800 text-primary": pathname === "/",
          },
        )}
      >
        <Lottie
          lottieRef={homeRef}
          animationData={homeIcon}
          style={{ width: 24, height: 24 }}
          autoplay={false}
          loop={false}
        />
        <span className="text-sm capitalize">home</span>
      </Link>
      <Link
        href="/market"
        onMouseEnter={() => platformRef.current?.play()}
        onMouseLeave={() => platformRef.current?.stop()}
        className={clsx(
          "flex items-center gap-2 rounded-lg px-2.5 py-2 text-foreground duration-300 hover:bg-neutral-800",
          {
            "bg-neutral-800 text-primary": pathname === "/market",
          },
        )}
      >
        <Lottie
          lottieRef={platformRef}
          animationData={platformIcon}
          style={{ width: 24, height: 24 }}
          autoplay={false}
          loop={false}
        />
        <span className="text-sm capitalize">market</span>
      </Link>
      {role === "user" ? <UserNav /> : null}
      {role === "singer" ? <SingerNav /> : null}

      <Modal />
    </nav>
  );
}
