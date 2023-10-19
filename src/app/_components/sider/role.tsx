"use client";

import React from "react";

import { cn } from "~/utils";
import { useAtom } from "jotai";
import { useAccount } from "wagmi";
import { api } from "~/trpc/react";
import { toast } from "react-toastify";
import { roleAtom } from "~/utils/atom";

interface RoleItem {
  role: string;
  isLoading: boolean;
  mutate: () => void;
}

enum RoleType {
  User = "user",
  Singer = "singer",
  Platform = "platform",
  Owner = "owner",
}

export default function Role() {
  const { address } = useAccount();

  const [role, setRole] = useAtom(roleAtom);

  const connectAddress = address ? address.toString() : "null";

  const result = api.role.get.useQuery(
    {
      address: connectAddress,
    },
    {
      enabled: address !== undefined,
    },
  );

  const { mutate: updateSingerMutate, isLoading: updateSingerIsLoading } =
    api.role.setSinger.useMutation({
      onSuccess: () => {
        setRole("singer");
        toast(`🦄 The role updated to singer`, {
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

  const { mutate: updateOwnerMutate, isLoading: updateOwnerIsLoading } =
    api.role.setOwner.useMutation({
      onSuccess: () => {
        setRole("owner");
        toast(`🦄 The role updated to owner`, {
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

  const { mutate: updatePlatformMutate, isLoading: updatePlatformIsLoading } =
    api.role.setplatform.useMutation({
      onSuccess: () => {
        setRole("platform");

        toast(`🦄 The role updated to platform`, {
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

  const { mutate: updateUserMutate, isLoading: updateUserIsLoading } =
    api.role.setUser.useMutation({
      onSuccess: () => {
        setRole("user");

        toast(`🦄 The role updated to user`, {
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

  const roleMutationMap = {
    [RoleType.User]: updateUserMutate,
    [RoleType.Singer]: updateSingerMutate,
    [RoleType.Platform]: updatePlatformMutate,
    [RoleType.Owner]: updateOwnerMutate,
  };

  const roleLoadingMap = {
    user: updateUserIsLoading,
    singer: updateSingerIsLoading,
    platform: updatePlatformIsLoading,
    owner: updateOwnerIsLoading,
  };

  const roleNames = [
    RoleType.User,
    RoleType.Singer,
    RoleType.Platform,
    RoleType.Owner,
  ];

  const nextRoleIndex = roleNames.indexOf(role as RoleType);

  const nextRole =
    nextRoleIndex !== -1
      ? roleNames[(nextRoleIndex + 1) % roleNames.length]
      : roleNames[0];

  const handleRoleChange = (nextRole: RoleType) => {
    const mutate = roleMutationMap[nextRole];
    const isLoading = roleLoadingMap[nextRole];

    if (mutate && !isLoading) {
      mutate(
        { address: connectAddress },
        {
          onSuccess: () => {
            setRole(nextRole);
            () =>
              toast(`🦄 The role updated to ${nextRole}`, {
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
        },
      );
    }
  };

  React.useEffect(() => {
    if (result.data) {
      setRole(result.data);
    }
  }, [result.data]);

  return (
    <>
      {role !== "null" ? (
        <div>
          <RoleItem
            role={role}
            mutate={() => handleRoleChange(nextRole!)}
            isLoading={roleLoadingMap[nextRole!]}
          />
        </div>
      ) : (
        <span className={cn("loading loading-dots loading-xs")}></span>
      )}
    </>
  );
}

function RoleItem({ mutate, isLoading, role }: RoleItem) {
  return (
    <label tabIndex={0} className="btn btn-xs bg-foreground" onClick={mutate}>
      {isLoading ? (
        <span className={cn("loading loading-dots loading-xs")}></span>
      ) : (
        role
      )}
    </label>
  );
}
