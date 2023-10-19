import "~/styles/globals.css";
import 'react-toastify/dist/ReactToastify.css';

import { headers } from "next/headers";
import { TRPCReactProvider } from "~/trpc/react";
import { Poppins, Kanit } from "next/font/google";
import { AnimateEnter } from "./_components/animate-enter";

import { Blur } from "./_components/blur";
import { Sidebar } from "./_components/sider";
import { ToastContainer } from "react-toastify";
import { Provider } from "./_components/provider";

import type { Metadata } from "next";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-default",
});

const kanit = Kanit({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-title",
});

export const metadata: Metadata = {
  authors: [{ name: "Cha1nOn Team", url: "" }],
  category: "Cha1nOn",
  creator: "Cha1nOn",
  description: "Cha1nOn Music DAPP",
  title: "Cha1nOn",
  icons: {
    apple: "/favicon.ico",
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
  },
  keywords: ["智能合约", "Music Dapp", "Cha1nOn", "去中心化音乐DAPP", "Nextjs"],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body
        className={`font-sans ${poppins.variable} ${kanit.variable} min-h-screen bg-background font-poppins outline-none`}
      >
        <Blur />
        <TRPCReactProvider headers={headers()}>
          <Provider>
            <AnimateEnter className="mx-auto flex max-w-6xl flex-col px-8 lg:flex-row lg:gap-10 lg:py-16">
              <Sidebar />
              {children}
              <ToastContainer />
            </AnimateEnter>
          </Provider>
        </TRPCReactProvider>
      </body>
    </html>
  );
}
