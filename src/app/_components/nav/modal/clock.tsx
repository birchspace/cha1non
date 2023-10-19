"use client";

import { useState, useRef, useEffect, use } from "react";

import Lottie from "lottie-react";

import clockIcon from "public/icons/static/clock.json";

import { Button, Tooltip } from "@nextui-org/react";

export function Clock() {
  const [client, setClient] = useState(false);
  const [date, setDate] = useState<Date>(new Date());
  const clockRef = useRef<any>();

  function refreshClock() {
    setDate(new Date());
  }

  useEffect(() => {
    setClient(true);
    const timerId = setInterval(refreshClock, 1000);

    return () => {
      clearInterval(timerId);
    };
  }, []);

  const hour = date.toLocaleString("zh-CN", {
    hour: "2-digit",
    minute: "numeric",
    second: "numeric",
    timeZone: "Asia/Shanghai",
  });

  return (
    <>
      {client ? (
        <Tooltip content={`${hour} UTC-8`}>
          <Button isIconOnly color="primary" variant="light">
            <Lottie
              lottieRef={clockRef}
              animationData={clockIcon}
              style={{ width: 20, height: 20 }}
              autoplay={true}
              loop={true}
            />
          </Button>
        </Tooltip>
      ) : null}
    </>
  );
}
