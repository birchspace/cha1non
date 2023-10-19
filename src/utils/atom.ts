import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";

export const numAtom = atom(0);
export const indexAtom = atom(0);
export const readyForDescribeAtom = atomWithStorage("readyForDescribe", false);
export const roleAtom = atomWithStorage("AccountRole", "null");
