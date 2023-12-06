import { TRPCError, initTRPC } from '@trpc/server';
import { Context } from './router';

const t = initTRPC.context<Context>().create();

const isAuthed = t.middleware(async ({ next, ctx }) => {
  try {
    // const user = await authenticateReq(ctx.req.cookies.access_token, ctx.req.headers['user-agent']);
    return next({
      ctx,
    });
  } catch (error: any) {
    throw new TRPCError({
      code: error.message
    });
  };
});

export const middleware = t.middleware;
export const protectedProcedure = t.procedure.use(isAuthed);
export const publicProcedure = t.procedure;
export const teziAdminProcedure = t.procedure.use(isAuthed);//.use(isTeziAdmin);
export const router = t.router;