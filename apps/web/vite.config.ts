import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [
    // tsconfigPaths(),
    react(),
  ],
  // server: {
  //   host: true,
  //   port: 3000,
    // proxy: { "/trpc": { target: "http://localhost:3001" } },
  // },
});