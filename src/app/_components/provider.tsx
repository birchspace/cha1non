"use client";

import React from "react";
import { env } from "~/env.mjs";
import { ethers } from "ethers";
import { Theme } from "@radix-ui/themes";
import { hardhat, goerli } from "wagmi/chains";
import { SessionProvider } from "next-auth/react";
import { NextUIProvider } from "@nextui-org/react";
import { darkTheme } from "@rainbow-me/rainbowkit";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";
import { WagmiConfig, configureChains, createConfig } from "wagmi";
import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { RainbowKitSiweNextAuthProvider } from "@rainbow-me/rainbowkit-siwe-next-auth";

import abi from "~/config/abi.json";
import "@radix-ui/themes/styles.css";
import "@rainbow-me/rainbowkit/styles.css";

import type { GetSiweMessageOptions } from "@rainbow-me/rainbowkit-siwe-next-auth";

interface ContextProps {
  signer: ethers.Contract;
}

const chain = env.NEXT_PUBLIC_CHAIN_ID === "5" ? goerli : hardhat;

const { chains, publicClient, webSocketPublicClient } = configureChains(
  [chain],
  [
    alchemyProvider({
      apiKey: env.NEXT_PUBLIC_ALCHEMY_API_KEY ?? "",
    }),
    publicProvider(),
  ],
);

const { connectors } = getDefaultWallets({
  appName: "Solidity Next.js Starter",
  projectId: env.NEXT_PUBLIC_RAINBOWKIT_PROJECT_ID ?? "",
  chains,
});

const config = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
  webSocketPublicClient,
});

const cha1n0nAppInfo = {
  appName: "cha1n0n Demo",
};

const getSiweMessageOptions: GetSiweMessageOptions = () => ({
  statement: "Sign in to the cha1n0n",
});

const provider = new ethers.providers.JsonRpcProvider(
  env.NEXT_PUBLIC_RPC_Provider,
  5,
);

const signer = new ethers.Wallet(env.NEXT_PUBLIC_Private_Key, provider);

const contract = new ethers.Contract(
  env.NEXT_PUBLIC_CONTRACT_ADDRESS,
  abi,
  signer,
);

const contractWithSigner = contract.connect(signer);

const initialValues = {
  signer: contractWithSigner,
};

const AppContext = React.createContext<ContextProps>(initialValues);

export function Provider({ children }: { children: React.ReactNode }) {
  const value = {
    signer: contractWithSigner,
  };
  return (
    <SessionProvider refetchInterval={0}>
      <WagmiConfig config={config}>
        <RainbowKitSiweNextAuthProvider
          getSiweMessageOptions={getSiweMessageOptions}
        >
          <RainbowKitProvider
            appInfo={cha1n0nAppInfo}
            chains={chains}
            modalSize="compact"
            theme={darkTheme()}
          >
            <AppContext.Provider value={value}>
              <NextUIProvider>
                <Theme>{children}</Theme>
              </NextUIProvider>
            </AppContext.Provider>
          </RainbowKitProvider>
        </RainbowKitSiweNextAuthProvider>
      </WagmiConfig>
    </SessionProvider>
  );
}

export function useHooks() {
  return React.useContext(AppContext);
}
