import { musicRouter } from "./routers/music";
import { roleRouter } from "./routers/role";
import { createTRPCRouter } from "~/server/api/trpc";
import { moneyRouter } from "./routers/money";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  role: roleRouter,
  music: musicRouter,
  money: moneyRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
