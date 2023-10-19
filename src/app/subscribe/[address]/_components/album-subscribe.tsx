"use client";

import React from "react";

import { Title } from "~/app/_components/title";
import AlbumSubscribeItem from "./album-subscribe-item";
import { useGetUserDescribeAlbumList } from "~/hooks/read/getUserDescribeAlbumList";

export function AlbumSubscribe({ address }: { address: string }) {
  const [init, setInit] = React.useState(false);

  const { getUserDescribeAlbumList } = useGetUserDescribeAlbumList({
    input: address,
  });

  React.useEffect(() => {
    setInit(true);
  }, []);

  return (
    <>
      {init ? (
        <>
          <section className="p-6">
            <Title variant="title" size="xl">
              Albums
            </Title>
            <ul className="card mt-6 grid place-items-center justify-center gap-4 md:grid-cols-2">
              {getUserDescribeAlbumList
                ? getUserDescribeAlbumList.map((item, index) => (
                    <li key={index}>
                      <AlbumSubscribeItem
                        title={item}
                        address={address}
                        index={index}
                      />
                    </li>
                  ))
                : null}
            </ul>
          </section>
        </>
      ) : null}
    </>
  );
}
