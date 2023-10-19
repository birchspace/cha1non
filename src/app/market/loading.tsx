import { AnimateEnter } from "~/app/_components/animate-enter";

export default function Loading() {
  return (
    <AnimateEnter className="flex h-[50vh] max-w-[854px] items-center justify-center py-8 lg:w-4/5">
      <span className="loading loading-spinner loading-xs"></span>
    </AnimateEnter>
  );
}
