import { router } from "../trpc";
import { shortenRouter } from "./shorten";

export const appRouter = router({
  shorten: shortenRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
