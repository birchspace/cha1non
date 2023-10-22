import { Globe } from "lucide-react";
import { Title } from "~/app/_components/title";
import { Typography } from "~/app/_components/typography";

export function Default() {
  return (
    <section className="flex flex-col gap-4 rounded-lg border border-neutral-800 bg-neutral-900 p-5">
      <div className="flex gap-6">
        <Title variant="title">Welcom to cha1n0n</Title>
        <Typography variant="muted" className="flex items-center gap-2">
          <span className="text-emerald-600">
            <Globe size={16} />
          </span>
          ETH TESTNET
        </Typography>
      </div>
      <Typography className="leading-relaxed">
        We understand that in the current domestic music market, users often
        encounter a problem: certain artists' music can only be heard on
        specific platforms. When users want to enjoy music from other artists,
        they have to switch platforms, which is quite inconvenient. To address
        this issue, we have created this platform with the aim to explore and
        implement a unified music listening model. Here, users only need to pay
        once, and they can enjoy the same music service on all major platforms.
        Our mission is to provide users with a higher quality and more
        convenient music experience.
      </Typography>
      <span className="btn btn-active btn-neutral w-fit">
        Click left sign button in to launch
      </span>
    </section>
  );
}
