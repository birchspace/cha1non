"use client";

import React from "react";
import { useAccount } from "wagmi";
import { Icons } from "./_component/icons";
import { MusicTab } from "./_component/music-tab";
import { AlbumTab } from "./_component/album-tab";
import { SingerTab } from "./_component/singer-tab";
import { AnimateEnter } from "~/app/_components/animate-enter";
import { Tabs, Tab, Card, CardBody, CardHeader } from "@nextui-org/react";

export default function Market() {
  const [init, setInit] = React.useState(false);

  const { address } = useAccount();

  const [selected, setSelected] = React.useState("photos");

  const handleSelectionChange = (key: React.Key) => {
    if (typeof key === "string") {
      setSelected(key);
    }
  };

  React.useEffect(() => {
    setInit(true);
  }, []);

  return (
    <>
      {init ? (
        <AnimateEnter className="max-w-3xl py-8 lg:w-7/12">
          <Tabs
            aria-label="Options"
            selectedKey={selected}
            onSelectionChange={handleSelectionChange}
          >
            <Tab
              key="singer"
              title={
                <div className="flex items-center space-x-2">
                  <Icons.singer className="h-6 w-6" />
                  <span className="capitalize">singer</span>
                </div>
              }
            >
              <div className="pt-6">
                <Card>
                  <CardBody className="flex items-center justify-center pt-8">
                    <SingerTab />
                  </CardBody>
                </Card>
              </div>
            </Tab>

            <Tab
              key="album"
              title={
                <div className="flex items-center space-x-2">
                  <Icons.album className="h-6 w-6" />
                  <span className="capitalize">album</span>
                </div>
              }
            >
              <AlbumTab />
            </Tab>
          </Tabs>
        </AnimateEnter>
      ) : null}
    </>
  );
}
