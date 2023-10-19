import { Metadata } from "next";
import { Divider } from "~/app/_components/divider";
import { AnimateEnter } from "~/app/_components/animate-enter";
import { AlbumSubscribe } from "./_components/album-subscribe";
import { Singerubscribe } from "./_components/singer-subscribe";

export const metadata: Metadata = {
  title: "My subscribe",
  description: "My subscribe",
};

export default function SubscriptionPage({
  params,
}: {
  params: { address: string };
}) {
  return (
    <AnimateEnter className="max-w-3xl py-8 lg:w-7/12">
      <Singerubscribe address={params.address} />
      <Divider className="my-1"/>
      <AlbumSubscribe address={params.address} />
    </AnimateEnter>
  );
}
