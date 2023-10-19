"use client";

import { api } from "~/trpc/react";
import { shortenAddress } from "~/utils";
import { Typography } from "~/app/_components/typography";
import { Input, Select, SelectItem } from "@nextui-org/react";
import { Card, CardBody, CardHeader } from "@nextui-org/react";
import { useState } from "react";
import React from "react";

export function MusicTab() {
  const singerData = api.music.list.useQuery(undefined);
  const address = shortenAddress("0xC0a92F6D6B05b3F973A936eda56f28864c5e548C");
  const [a, setA] = useState<string[]>([]);
  const [b, setB] = useState<[]>([]);
  const [c, setC] = useState<[]>([]);

  React.useEffect(() => {
    console.log(a);
  }, [a]);
  return (
    <Card className="overflow-x-auto">
      <CardHeader className=" justify-between">
        <Select label="Select musicPlatform" className="max-w-xs">
          <SelectItem key={"1"} value={address}>
            {address}
          </SelectItem>
        </Select>
        <button className="btn btn-neutral">
          <Typography>0</Typography>
          <span className=" text-input">|</span>
          <div>investment</div>
        </button>
      </CardHeader>
      <CardBody>
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>
                <label>
                  <input type="checkbox" className="checkbox" />
                </label>
              </th>
              <th className="text-lg">singer</th>
              <th className="text-lg">amount</th>
            </tr>
          </thead>
          <tbody>
            {singerData.data?.map((item, index) => (
              <tr>
                <th>
                  <label>
                    <input
                      type="checkbox"
                      value={item}
                      className="checkbox"
                      onChange={() => setA((data) => [...data, item])}
                    />
                  </label>
                </th>

                <th>
                  <button className="btn btn-ghost btn-xs">
                    {shortenAddress(item)}
                  </button>
                </th>
                <th className="w-36">
                  <Input variant="bordered" placeholder="Enter amount" />
                </th>
              </tr>
            ))}
          </tbody>
        </table>
      </CardBody>
    </Card>
  );
}
