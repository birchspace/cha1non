import { clsx } from "clsx";
import { ethers } from "ethers";
import { twMerge } from "tailwind-merge";

import type { ClassValue } from "clsx";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(input: Date): string {
  return input.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export function absoluteUrl(path: string) {
  return `${process.env.NEXT_PUBLIC_APP_URL}${path}`;
}

export const stringToBytes4 = (str: string) => {
  const hash = ethers.utils.keccak256(ethers.utils.toUtf8Bytes(str));
  return hash.substring(0, 10);
};

export function isEOAAddress(address: string): boolean {
  return ethers.utils.isAddress(address);
}

export const stringToBytes8 = (str: string) => {
  const hash = ethers.utils.keccak256(ethers.utils.toUtf8Bytes(str));

  return `"0x${hash.substring(2, 18)}`;
};

export const isBytes4 = (input: string) => {
  const regExp = /^0x[0-9A-Fa-f]{8}$/;
  return regExp.test(input);
};

export function shortenAddress(address: string) {
  return address.slice(0, 4) + "..." + address.slice(-4);
}
