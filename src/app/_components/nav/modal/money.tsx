"use client";

import React from "react";
import { Clock } from "./clock";
import { api } from "~/trpc/react";
import { useAccount } from "wagmi";
import { Dropdown, DropdownTrigger } from "@nextui-org/react";
import { DropdownMenu, DropdownItem } from "@nextui-org/react";
import { toast } from "react-toastify";

export function Money() {
  const { address } = useAccount();

  const connectAddress = address ? address.toString() : "null";

  const [number, setNumber] = React.useState(100);

  const userMoney = api.money.get.useQuery(
    { address: connectAddress },
    {
      enabled: address !== undefined,
    },
  );

  const items = [
    {
      key: "add",
      label: "Add 100",
    },
  ];

  React.useEffect(() => {
    setNumber(userMoney.data ? userMoney.data : 100);
  }, [userMoney]);

  const { mutate: updateMoneyMutate, isLoading: updateMoneyIsLoading } =
    api.money.add.useMutation({
      onSuccess: () => {
        toast.success(`🦄 add 100 success, current balance ${userMoney.data}`, {
          position: "top-right",
          autoClose: 1000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      },
    });

  const handleRoleChange = () => {
    const mutate = updateMoneyMutate;
    const isLoading = updateMoneyIsLoading;

    if (mutate && !isLoading) {
      setNumber((number) => number + 100);
      mutate({ address: connectAddress, money: number + 100 });
    }
  };

  return (
    <>
      <Dropdown>
        <DropdownTrigger>
          <div className="flex items-center gap-2 rounded-lg px-2.5 py-2 text-foreground duration-300 hover:bg-neutral-800  hover:text-primary">
            <Clock />
            <button className="text-sm capitalize">
              System balance &nbsp;<span>{userMoney.data}</span>
            </button>
          </div>
        </DropdownTrigger>
        <DropdownMenu aria-label="Dynamic Actions" items={items}>
          {items.map((item) => (
            <DropdownItem
              key={item.key}
              color={item.key === "delete" ? "danger" : "default"}
              className={item.key === "delete" ? "text-danger" : ""}
              onPress={handleRoleChange}
            >
              {item.label}
            </DropdownItem>
          ))}
        </DropdownMenu>
      </Dropdown>
    </>
  );
}
