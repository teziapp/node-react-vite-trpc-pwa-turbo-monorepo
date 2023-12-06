A template with straightforward and flexible approach to use the benefits of tRPC in your React projects. uses the monorepo approach that significantly improves the developer experience. If you're looking for a zero-fuss setup with pure React and modularization, this template is an excellent place to start! Custom components are compartmentalised as a seperate package to be re-used across the project.

For local execution, use `pnpm i` and `pnpm dev`.

# Features:
1. envs are validated using Zod in the back end.
2. We use Material-UI for components & styling.
3. We use React Hook Form for forms.
4. Forms are Persistent on page reloads.
5. Server Sent Events(SSE) are used to handle user sessions.
6. Progessive Web Apps(PWA) with force-update & force-logout functionality on version mismatch from backend.
7. Rate Limiting activated in back-end.
8. Auth via JWT in cookie.
9. End-to-End Typesafety between backend & frontend using TRPC.

# Todos:
1. Push Notifications
2. Central error handling in trpc for updates & session-invalidated.
3. Testing
4. Add ORM.
5. Backend Logs to Database.
6. Front-End logs with user/session tags.
7. Auto version on PR/Push.
8. Social Login.
9. Feature flags for easy rollbacks.
10. A/B testing.
11. Github actions for devops.
12. pm2 monitoring.

# Must Read:
- Dont upgrade react-query to v5 unless trpc is upgraded to v11. More here: https://github.com/TanStack/query/issues/6186#issuecomment-1772356489 

# Inspirations:
-[prisma-express-typescript-boilerplate] (https://github.com/antonio-lazaro/prisma-express-typescript-boilerplate)
- [react-vite-trpc] (https://github.com/kuubson/react-vite-trpc/tree/main)
