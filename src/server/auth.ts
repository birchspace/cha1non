/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import {
  getServerSession,
  type DefaultSession,
  type NextAuthOptions,
} from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { getCsrfToken } from "next-auth/react";
import { SiweMessage } from "siwe";

import { env } from "~/env.mjs";
import { db } from "~/server/db";

/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */
declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
    } & DefaultSession["user"];
  }
}

/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks, etc.
 *
 * @see https://next-auth.js.org/configuration/options
 */
export const authOptions: NextAuthOptions = {
  callbacks: {
    session: ({ session, token }) => ({
      ...session,
      user: {
        ...session.user,
        id: token.sub,
      },
    }),
  },
  adapter: PrismaAdapter(db),
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      credentials: {
        message: {
          label: "Message",
          placeholder: "0x0",
          type: "text",
        },
        signature: {
          label: "Signature",
          placeholder: "0x0",
          type: "text",
        },
      },
      name: "Ethereum",
      async authorize(credentials, req) {
        try {
          const siwe = new SiweMessage(
            JSON.parse(
              (credentials?.message as string) ?? "{}",
            ) as Partial<SiweMessage>,
          );

          const nextAuthUrl = env.NEXTAUTH_URL
            ? env.NEXTAUTH_URL
            : "https://cha1n0n.vercel.app/";

          if (!nextAuthUrl) {
            return null;
          }

          const nextAuthHost = new URL(nextAuthUrl).host;
          console.log("domain:nextAuthHost", siwe.domain, nextAuthHost);
          if (siwe.domain !== nextAuthHost) {
            console.log("domain", siwe.domain, nextAuthHost);

            return null;
          }

          if (
            siwe.nonce !==
            (await getCsrfToken({ req: { headers: req.headers } }))
          ) {
            return null;
          }

          // 检查用户是否存在数据库中
          const user = await db.user.findUnique({
            where: {
              address: siwe.address,
            },
          });

          // 不存在用户则创建，默认身份是用户
          if (!user) {
            const user = await db.user.create({
              data: {
                address: siwe.address,
                role: "user",
              },
            });

            await db.account.create({
              data: {
                userId: user.id,
                type: "credentials",
                provider: "Ethereum",
                providerAccountId: siwe.address,
              },
            });
          }

          await siwe.verify({ signature: credentials?.signature ?? "{}" });

          return {
            id: siwe.address,
          };
        } catch (e) {
          return null;
        } finally {
        }
      },
    }),
  ],
};

/**
 * Wrapper for `getServerSession` so that you don't need to import the `authOptions` in every file.
 *
 * @see https://next-auth.js.org/configuration/nextjs
 */
export const getServerAuthSession = () => getServerSession(authOptions);
