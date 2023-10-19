"use client";

import React from "react";
import { Card, CardHeader, Link } from "@nextui-org/react";
import { CardBody, CardFooter, Divider } from "@nextui-org/react";

import { useGetSingerAlbumsList } from "~/hooks/read/getSingerAlbumsList";

export function AlbumCard({ singer }: { singer: string }) {
  const [init, setInit] = React.useState(false);
  const { getSingerAlbumsList } = useGetSingerAlbumsList({
    input: singer,
  });

  React.useEffect(() => {
    setInit(true);
  }, []);

  return (
    <>
      {init ? (
        <div>
          {getSingerAlbumsList.map((item, index) => (
            <Card className="w-72 border-none px-4 py-2" key={index}>
              <CardHeader className="flex gap-3">
                <div className="flex flex-col">
                  <p className="text-md">{item}</p>
                  <p className="text-xs text-default-400">创建时间</p>
                </div>
              </CardHeader>
              <Divider />
              <CardBody>
                <p>
                  Make beautiful websites regardless of your design experience.
                </p>
              </CardBody>
              <Divider />
              <CardFooter className="flex items-center justify-between">
                <Link
                  isExternal
                  showAnchorIcon
                  href="https://github.com/nextui-org/nextui"
                >
                  Visit now
                </Link>
              </CardFooter>
            </Card>
          ))}{" "}
        </div>
      ) : null}
    </>
  );
}
