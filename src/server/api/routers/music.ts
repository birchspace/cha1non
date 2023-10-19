import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

import { Prisma } from "@prisma/client";

const defaultMusicSelect = Prisma.validator<Prisma.MusicSelect>()({
  author: true,
});

export const musicRouter = createTRPCRouter({
  create: protectedProcedure
    .input(
      z.object({
        title: z.string(),
        author: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      if (input.author === "null") return "null";
      await new Promise((resolve) => setTimeout(resolve, 1000));

      return ctx.db.music.create({
        data: {
          title: input.title,
          author: input.author,
          createdBy: { connect: { address: ctx.session.user.id } },
        },
      });
    }),

  getLatest: protectedProcedure
    .input(
      z.object({
        author: z.string(),
      }),
    )
    .query(({ ctx, input }) => {
      if (input.author === "null") return undefined;
      return ctx.db.music.findMany({
        take: 2,
        orderBy: { createdAt: "desc" },
        where: { createdById: input.author },
      });
    }),

  list: protectedProcedure.query(async ({ ctx, input }) => {
    const data = await ctx.db.music.findMany({
      select: defaultMusicSelect,
      orderBy: { createdAt: "desc" },
      where: {},
    });
    return [...new Set(data.map((item) => item.author))];
  }),

  byAddress: protectedProcedure
    .input(
      z.object({
        author: z.string(),
      }),
    )
    .query(({ ctx, input }) => {
      if (input.author === "null") return undefined;
      return ctx.db.music.findMany({
        orderBy: { createdAt: "desc" },
        where: { createdById: input.author },
      });
    }),
});
