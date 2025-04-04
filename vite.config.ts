import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { VitePWA } from "vite-plugin-pwa";

/**
 * This is the Vite configuration file for a React application.
 * It includes plugins for React, Tailwind CSS, and PWA (Progressive Web App - work offline) support.
 * The configuration is set up to handle service workers and caching strategies.
 */
export default defineConfig({
  build: {
    outDir: "../dist",
  },
  server: {
    host: true,
    port: 5173
  },
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      workbox: {
        runtimeCaching: [
          {
            urlPattern: /\/api\/policies/,
            handler: "NetworkFirst",
            options: {
              cacheName: "api-cache",
              networkTimeoutSeconds: 3, // Wait 3 seconds before using cache
              expiration: {
                maxEntries: 50,
                maxAgeSeconds: 24 * 60 * 60, // 24 hours
              },
              cacheableResponse: {
                statuses: [0, 200],
              },
            },
          },
        ],
      },
    }),
  ],
});
