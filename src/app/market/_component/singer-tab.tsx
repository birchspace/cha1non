"use client";

import { api } from "~/trpc/react";
import { SingerCard } from "./singer-card";
import { useAtom } from "jotai";
import { readyForDescribeAtom } from "~/utils/atom";

export function SingerTab() {
  const singerData = api.music.list.useQuery(undefined);
  const [ready, setReady] = useAtom(readyForDescribeAtom);
  return (
    <div className="grid grid-cols-2  gap-6">
      {singerData.data?.map((item, index) => (
        <div key={index}>
          <SingerCard address={item} />
        </div>
      ))}
    </div>
  );
}
