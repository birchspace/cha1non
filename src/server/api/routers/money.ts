import { z } from "zod";

import { api } from "~/trpc/server";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const moneyRouter = createTRPCRouter({
  get: protectedProcedure
    .input(
      z.object({
        address: z.string(),
      }),
    )
    .query(async ({ input, ctx }) => {
      if (input.address === "null") return 0;
      const user = await ctx.db.user.findUnique({
        where: {
          address: input.address,
        },
      });
      return user?.money;
    }),
  add: protectedProcedure
    .input(
      z.object({
        address: z.string(),
        money: z.number(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      return await ctx.db.user.updateMany({
        data: {
          money: input.money,
        },
        where: {
          address: input.address,
        },
      });
    }),
  sub: protectedProcedure
    .input(
      z.object({
        number: z.number(),
        address: z.string(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      const res = await ctx.db.user.findUnique({
        where: {
          address: input.address,
        },
      });
      return await ctx.db.user.updateMany({
        data: {
          money: res!.money - input.number,
        },
        where: {
          address: input.address,
        },
      });
    }),
});
