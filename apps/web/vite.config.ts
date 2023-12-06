import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    // tsconfigPaths(),
    react(),
    VitePWA({ 
      devOptions: {
        enabled: true,
      },
      registerType: 'prompt',
      workbox: {
          globPatterns: ["**/*.{html,js,css,png,svg,jpg,gif,json,woff,woff2,eot,ico,webmanifest,map}"],
          maximumFileSizeToCacheInBytes: 10000000,
          sourcemap: true
      },
      includeAssets:['/favicon.ico', '/favicon/apple-touch-icon.png', '/favicon/favicon-32x32.png'],
      //   runtimeCaching: [
      //     getCache({ 
      //       pattern: /^https:\/\/s3.amazonaws.com\/my-library-cover-uploads/, 
      //       name: "local-images1" 
      //     }),
      //     getCache({ 
      //       pattern: /^https:\/\/my-library-cover-uploads.s3.amazonaws.com/, 
      //       name: "local-images2" 
      //     })
      //   ],
      manifest: {
        "short_name": "Smart Brand",
        "name": "Smart Brand",
        "description": "Smart Brand is an app for Brand to manage their business end-to-end.",
        "icons": [
        {
            "src": "favicon.ico",
            "sizes": "48x48",
            "type": "image/x-icon"
        },
        {
            "src": "/favicon/favicon-16x16.png",
            "sizes": "16x16",
            "type": "image/x-icon"
        },
        {
            "src": "/favicon/favicon-32x32.png",
            "sizes": "32x32",
            "type": "image/x-icon"
        },
        {
            "src": "/favicon/android-chrome-192x192.png",
            "type": "image/png",
            "sizes": "192x192"
        },
        {
            "src": "/favicon/android-chrome-512x512.png",
            "type": "image/png",
            "sizes": "512x512"
        }
        ],
        "start_url": ".",
        "display": "standalone",
        "theme_color": "#5296d9",
        "background_color": "#ffffff"
      }
    }),
  ],
  // server: {
  //   host: true,
  //   port: 3000,
    // proxy: { "/trpc": { target: "http://localhost:3001" } },
  // },
});