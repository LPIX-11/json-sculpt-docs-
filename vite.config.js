import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// GitHub Pages deploys to https://<user>.github.io/<repo>/
// Change this to match your GitHub repo name
const repoName = "/json-sculpt-docs/";

export default defineConfig({
  base: repoName,
  plugins: [react()],
  server: {
    port: 3000,
    open: true,
  },
  build: {
    outDir: "dist",
  },
});
