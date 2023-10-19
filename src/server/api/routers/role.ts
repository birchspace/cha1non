import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const roleRouter = createTRPCRouter({
  get: protectedProcedure
    .input(
      z.object({
        address: z.string(),
      }),
    )
    .query(async ({ input, ctx }) => {
      if (input.address === "null") return "null";
      const role = await ctx.db.user.findUnique({
        where: {
          address: input.address,
        },
      });
      return role?.role;
    }),

  setUser: protectedProcedure
    .input(
      z.object({
        address: z.string(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      return await ctx.db.user.updateMany({
        data: {
          role: "user",
        },
        where: {
          address: input.address,
        },
      });
    }),
  setSinger: protectedProcedure
    .input(
      z.object({
        address: z.string(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      return await ctx.db.user.updateMany({
        data: {
          role: "singer",
        },
        where: {
          address: input.address,
        },
      });
    }),
  setplatform: protectedProcedure
    .input(
      z.object({
        address: z.string(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      return await ctx.db.user.updateMany({
        data: {
          role: "platform",
        },
        where: {
          address: input.address,
        },
      });
    }),
  setOwner: protectedProcedure
    .input(
      z.object({
        address: z.string(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      return await ctx.db.user.updateMany({
        data: {
          role: "owner",
        },
        where: {
          address: input.address,
        },
      });
    }),
});
