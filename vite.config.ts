import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { VitePWA } from "vite-plugin-pwa";
import crypto from "crypto-browserify";
import path from "path";

export default defineConfig({
  define: {
    crypto: crypto,
  },
  base: "./",
  root: ".",
  build: {
    outDir: 'dist',
    assetsDir: 'assets',  // Organize assets properly
    manifest: true,  // Generate asset manifest
    sourcemap: true  // For better debugging
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:5050', // Your Express server
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  },
  resolve: {
    alias: {
      crypto: path.resolve(__dirname, "node_modules/crypto-browserify"),
      stream: path.resolve(__dirname, "node_modules/stream-browserify"),
      util: path.resolve(__dirname, "node_modules/util"),
    },
  },
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: "autoUpdate",
      manifest: {
        name: "OpenPages Policy Viewer",
        short_name: "PolicyViewer",
        start_url: "/",
        display: "standalone",
        background_color: "#ffffff",
        theme_color: "#1f2937",
        icons: [
          {
            src: "/pwa-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "/pwa-512x512.png",
            sizes: "512x512",
            type: "image/png",
          },
        ],
      },
      workbox: {
        runtimeCaching: [
          {
            urlPattern: /\/api\/policies/,
            handler: "NetworkFirst",
            options: {
              cacheName: "api-cache",
              networkTimeoutSeconds: 3,
              expiration: {
                maxEntries: 50,
                maxAgeSeconds: 24 * 60 * 60,
              },
              cacheableResponse: {
                statuses: [0, 200],
              },
            },
          },
        ],
      },
      // Add this to prevent HTTPS issues in development
      devOptions: {
        enabled: false, // Disable PWA completely in dev
        suppressWarnings: true
      }
    }),
  ],
});
