import React from "react";
import Image from "next/image";
import musicImg from "public/images/music.jpg";
import { Card, CardBody, Button, Progress } from "@nextui-org/react";

export function MusicCard() {
  const [liked, setLiked] = React.useState(false);

  return (
    <Card
      isBlurred
      className="bg-background/90 dark:bg-default-100/50 max-w-[610px] border-none"
      shadow="sm"
    >
      <CardBody>
        <div className="grid grid-cols-6 items-center justify-center gap-6 md:grid-cols-12 md:gap-4">
          <div className="relative col-span-6 h-32 md:col-span-4">
            <Image
              alt="Woman listing to music"
              className="rounded-lg shadow-2xl"
              src={musicImg}
              style={{
                width: "auto",
                height: "auto",
              }}
              placeholder="blur"
              blurDataURL={musicImg.blurDataURL}
            />
          </div>

          <div className="col-span-6 flex flex-col md:col-span-8">
            <div className="flex items-start justify-between">
              <div className="flex flex-col gap-0">
                <h3 className="text-foreground/90 font-semibold">Daily Mix</h3>
                <p className="text-small text-foreground/80">12 Tracks</p>
                <h1 className="text-large mt-2 font-medium">Frontend Radio</h1>
              </div>
              <Button
                isIconOnly
                className="text-default-900/60 data-[hover]:bg-foreground/10 -translate-y-2 translate-x-2"
                radius="full"
                variant="light"
                onPress={() => setLiked((v) => !v)}
              >
                2
              </Button>
            </div>

            <div className="mt-3 flex flex-col gap-1">
              <Progress
                aria-label="Music progress"
                classNames={{
                  indicator: "bg-default-800 dark:bg-white",
                  track: "bg-default-500/30",
                }}
                color="default"
                size="sm"
                value={33}
              />
              <div className="flex justify-between">
                <p className="text-small">1:23</p>
                <p className="text-small text-foreground/50">4:32</p>
              </div>
            </div>

            <div className="flex w-full items-center justify-center">1</div>
          </div>
        </div>
      </CardBody>
    </Card>
  );
}
