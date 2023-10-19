"use client";

import { api } from "~/trpc/react";
import { User } from "./user";

export function HomeNav({ address }: { address: string }) {
  const role = api.role.get.useQuery({
    address: address ? address : "null",
  });

  return <div>{role.data === "user" ? <User /> : null}</div>;
}
