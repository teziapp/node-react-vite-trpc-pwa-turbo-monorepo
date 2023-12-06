import { inferAsyncReturnType, inferRouterOutputs } from "@trpc/server";
import { CreateExpressContextOptions, createExpressMiddleware } from "@trpc/server/adapters/express";
import { Application } from "express";
import packageJson from '../../package.json';
import { authController } from "../controllers/auth.controller";
import { publicProcedure, router } from "../trpc";

export const trpcRouter = router({
  auth: authController,
  version: publicProcedure
    .query(() => ({
      be_version: packageJson.version,
      force_logout_below_frontend_version: packageJson.force_logout_below_frontend_version,
      force_update_below_frontend_version: packageJson.force_update_below_frontend_version
    }))
});

export type AppRouter = typeof trpcRouter;
export type RouterOutputs = inferRouterOutputs<AppRouter>;

const createContext = ({req, res}: CreateExpressContextOptions) => ({req, res})

export type Context = inferAsyncReturnType<typeof createContext>;

export const initializeTrpc = async (app: Application) => {
  app.use(
    "/trpc",
    createExpressMiddleware({
      router: trpcRouter,
      createContext,
    })
  )
}