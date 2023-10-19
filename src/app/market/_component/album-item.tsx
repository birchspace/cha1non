import React from "react";
import { useAccount } from "wagmi";
import { AlbumModalButton } from "./album-modal";
import { Card, CardHeader, Link } from "@nextui-org/react";
import { useSingerAlbums } from "~/hooks/read/singerAlbums";
import { Warpper } from "~/app/subscribe/[address]/_components/card";
import { CardBody, CardFooter, Divider } from "@nextui-org/react";
import { useIsDescribeAlbum } from "~/hooks/read/isDescribeAlbum";
import { useReadyForDescribe } from "~/hooks/write/readyForDescribe";
import { useIsReadyForDescribe } from "~/hooks/read/isReadyForDescribe";

interface AlbumItemProps {
  name: string;
  singer: string;
}

export function AlbumItem({ name, singer }: AlbumItemProps) {
  const account = useAccount();

  const connectAddress = account.address ? account.address : "null";

  const { isReadyForDescribe } = useIsReadyForDescribe({
    input: connectAddress,
  });

  const { readyForDescribe } = useReadyForDescribe({
    author: connectAddress,
  });

  const { isDescribeAlbum } = useIsDescribeAlbum({
    singer: singer,
    name: name,
  });

  const { singerAlbums } = useSingerAlbums({
    input: singer,
    name: name,
  });

  return (
    <Warpper>
      <Card className="w-72 border-none px-4 py-2">
        <CardHeader className="flex gap-3">
          <div className="flex flex-col">
            <p className="text-md">{name}</p>
          </div>
        </CardHeader>
        <Divider />
        <CardBody>
          <p>
            We offer album subscriptions for either 30 or 60 days. Once
            subscribed, you can listen to the album at any time you wish.
          </p>
        </CardBody>
        <Divider />
        <CardFooter className="flex items-center justify-between">
          {isDescribeAlbum ? (
            <Link
              isExternal
              showAnchorIcon
              href="https://github.com/nextui-org/nextui"
            >
              Visit now
            </Link>
          ) : (
            <>
              {isReadyForDescribe ? (
                <AlbumModalButton
                  name={name}
                  singer={singer}
                  text="Subscribe"
                  price={singerAlbums[1]!.toString()}
                />
              ) : (
                <button
                  className="btn btn-xs rounded-xl capitalize"
                  onClick={readyForDescribe}
                >
                  ready
                </button>
              )}
            </>
          )}
        </CardFooter>
      </Card>
    </Warpper>
  );
}
