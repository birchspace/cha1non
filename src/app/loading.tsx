import { AnimateEnter } from "./_components/animate-enter";

export default function Loading() {
  return (
    <AnimateEnter className="max-w-[854px] py-8 lg:w-4/5 flex items-center justify-center h-[50vh]">
      <span className="loading loading-spinner loading-xs"></span>
    </AnimateEnter>
  );
}
