import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig, loadEnv } from "vite"
import { VitePWA } from "vite-plugin-pwa"

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd())
  const isProd = mode === "production"

  return {
    root: "",
    envDir: process.cwd(),
    build: {
      outDir: "dist",
      sourcemap: !isProd,
      minify: isProd,
      rollupOptions: {
        output: {
          manualChunks: {
            vendor: ["react", "react-dom", "react-router", "@refinedev/core"],
            antd: ["antd", "@ant-design/icons"],
            msal: ["@azure/msal-browser", "@azure/msal-react"],
          },
        },
      },
      chunkSizeWarningLimit: 1000,
    },
    server: {
      port: 3000,
      cors: true,
      hmr: {
        overlay: true,
      },
    },
    resolve: {
      alias: {
        "@": path.join(process.cwd(), "src"),
        "@interfaces": path.join(process.cwd(), "src/interfaces/index.ts"),
      },
    },
    define: {
      "process.platform": JSON.stringify(process.platform),
    },
    // Optimize dependencies
    optimizeDeps: {
      include: ["react", "react-dom", "react-router", "antd", "@refinedev/core"],
      exclude: [],
    },
    plugins: [
      react(),
      VitePWA({
        registerType: "autoUpdate",
        devOptions: {
          enabled: true,
        },
        // Improved PWA configuration
        manifest: {
          name: env.VITE_PWA_APP_NAME,
          short_name: env.VITE_PWA_APP_SHORT_NAME,
          description: "A Refine-powered application",
          theme_color: "#ffffff",
          background_color: "#ffffff",
          display: "standalone",
          orientation: "portrait",
          start_url: "/",
          icons: [
            {
              src: "/pwa-192x192.png",
              sizes: "192x192",
              type: "image/png",
              purpose: "any maskable",
            },
            {
              src: "/pwa-512x512.png", // This should be a 512x512 icon
              sizes: "512x512",
              type: "image/png",
              purpose: "any maskable",
            },
          ],
        },
        // Workbox configuration
        workbox: {
          globPatterns: ["**/*.{js,css,html,ico,png,svg,jpg}"],
          runtimeCaching: [
            {
              urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
              handler: "CacheFirst",
              options: {
                cacheName: "google-fonts-cache",
                expiration: {
                  maxEntries: 10,
                  maxAgeSeconds: 60 * 60 * 24 * 365, // 1 year
                },
                cacheableResponse: {
                  statuses: [0, 200],
                },
              },
            },
            {
              urlPattern: /^https:\/\/fonts\.gstatic\.com\/.*/i,
              handler: "CacheFirst",
              options: {
                cacheName: "gstatic-fonts-cache",
                expiration: {
                  maxEntries: 10,
                  maxAgeSeconds: 60 * 60 * 24 * 365, // 1 year
                },
                cacheableResponse: {
                  statuses: [0, 200],
                },
              },
            },
            {
              urlPattern: /^https:\/\/.*\.(?:png|jpg|jpeg|svg|gif)$/,
              handler: "CacheFirst",
              options: {
                cacheName: "images-cache",
                expiration: {
                  maxEntries: 50,
                  maxAgeSeconds: 60 * 60 * 24 * 30, // 30 days
                },
              },
            },
            {
              urlPattern: /^https:\/\/.*api.*$/i,
              handler: "NetworkFirst",
              options: {
                cacheName: "api-cache",
                expiration: {
                  maxEntries: 100,
                  maxAgeSeconds: 60 * 60, // 1 hour
                },
                networkTimeoutSeconds: 10,
              },
            },
          ],
        },
      }),
    ],
  }
})
