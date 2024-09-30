import { defineConfig } from "@farmfe/core";
import path from "path";
import { fileURLToPath, pathToFileURL } from "url";

export default defineConfig({
  envDir: process.cwd(),
  compilation: {
    define:{
      "process.platform": process.platform,
    },
    resolve: {
      alias: {
        "@/": path.join(process.cwd(), "src"),
        "@interfaces": path.join(process.cwd(), "src/interfaces/index.ts"),
      },
    },
  },
  plugins: [
    "@farmfe/plugin-react",
    "@farmfe/plugin-sass",
    "@farmfe/plugin-react-components",
  ],
});
