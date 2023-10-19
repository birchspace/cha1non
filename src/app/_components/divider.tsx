import { twMerge } from "tailwind-merge";

export function Divider({ className }: { className?: string }) {
  return (
    <div className={twMerge("my-6 h-px w-full bg-neutral-800", className)} />
  );
}
