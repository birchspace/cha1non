"use client";

import React from "react";
import Link from "next/link";
import { MoveLeft } from "lucide-react";
import { Title } from "~/app/_components/title";
import SingerSubscribeItem from "./singer-subscribe-item";
import { useGetUserDescribeSingerList } from "~/hooks/read/getUserDescribeSingerList";

export function Singerubscribe({ address }: { address: string }) {
  const [init, setInit] = React.useState(false);

  const { getUserDescribeSingerList } = useGetUserDescribeSingerList({
    input: address,
  });

  React.useEffect(() => {
    setInit(true);
  }, []);

  return (
    <>
      {init ? (
        <section className="p-6">
          <Title variant="title" size="xl" className="flex items-center gap-4">
            <span>Singer</span>
          </Title>
          <ul className="card mt-6 grid place-items-center justify-center gap-4 md:grid-cols-6">
            {getUserDescribeSingerList
              ? getUserDescribeSingerList.map((item, index) => (
                  <li key={index}>
                    <SingerSubscribeItem title={item} index={index} />
                  </li>
                ))
              : null}
          </ul>
        </section>
      ) : null}
    </>
  );
}
