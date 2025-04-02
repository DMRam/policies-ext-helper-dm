import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { VitePWA } from "vite-plugin-pwa";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),

    VitePWA({
      registerType: "autoUpdate", // Auto-update when new content is available
      workbox: {
        globPatterns: ["**/*.{js,css,html,json}"], // Cache all static assets
        runtimeCaching: [
          {
            urlPattern: /\/api\/policies/, // Cache your OpenPages API calls
            handler: "StaleWhileRevalidate", // Serve cached, update in background
            options: {
              cacheName: "policies-cache",
              expiration: {
                maxEntries: 50,
                maxAgeSeconds: 24 * 60 * 60, // 24 hours
              },
            },
          },
        ],
      },
    }),
  ],
});
