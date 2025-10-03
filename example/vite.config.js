import { defineConfig } from "vite";
import path from "path";

export default defineConfig({
  root: ".", // Use current directory as root
  // Detect base path for GitHub Pages: allow override via BASE/VITE_BASE, fallback to /{repo}/ in CI, else /
  base:
    process.env.BASE ||
    process.env.VITE_BASE ||
    (process.env.GITHUB_ACTIONS && process.env.GITHUB_REPOSITORY
      ? `/${process.env.GITHUB_REPOSITORY.split("/")[1]}/`
      : "/"),
  build: {
    outDir: "dist",
    emptyOutDir: true,
  },
  server: {
    open: true,
    port: 5173,
    fs: {
      allow: [".."], // Allow serving files from parent directory
    },
  },
});
