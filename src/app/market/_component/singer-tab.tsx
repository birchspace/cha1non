"use client";

import { api } from "~/trpc/react";
import { SingerCard } from "./singer-card";

export function SingerTab() {
  const singerData = api.music.list.useQuery(undefined);
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
