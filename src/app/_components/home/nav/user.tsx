"use client";

import React from "react";
import Lottie from "lottie-react";
import { Title } from "~/app/_components/title";

import arrowIcon from "public/icons/static/arrow.json";

export function User() {
  const arrowRef = React.useRef<any>();
  return (
    <section className="">
      <div className="flex items-center justify-between">
        <Title variant="title" size="xl">
          Latest subscription
        </Title>
        <button
          className="btn btn-ghost flex items-center gap-1 text-xs font-medium text-foreground duration-300 hover:text-primary"
          onMouseEnter={() => arrowRef.current?.play()}
          onMouseLeave={() => arrowRef.current?.stop()}
        >
          <span>Ver todos</span>
          <Lottie
            lottieRef={arrowRef}
            animationData={arrowIcon}
            style={{ width: 18, height: 18 }}
            autoplay={false}
            loop={false}
          />
        </button>
      </div>
      <ul className="mt-6 grid place-items-center gap-4 md:grid-cols-2">
        {/* {projects.slice(0, 2).map((props) => (
          <li key={props.id}>
            <ProjectItem {...props} />
          </li>
        ))} */}
      </ul>
    </section>
  );
}
