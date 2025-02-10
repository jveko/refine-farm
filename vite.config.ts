import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());
  return {
    root: "",
    envDir: process.cwd(),
    build: {
      outDir: "../dist",
    },
    server: {
      port: 3000,
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
    plugins: [
      react(),
      VitePWA({
        registerType: "autoUpdate",
        devOptions: {
          enabled: true,
        },
        manifest: {
          name: env.VITE_PWA_APP_NAME,
          short_name: env.VITE_PWA_APP_SHORT_NAME,
          theme_color: "#000000",
          icons: [
            {
              src: "/pwa-192x192.png",
              sizes: "192x192",
              type: "image/png",
            },
            {
              src: "/pwa-192x192.png",
              sizes: "512x512",
              type: "image/png",
            },
          ],
        },
      }),
    ],
  };
});
