import { defineConfig, Plugin } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { createServer } from "./server";
import fs from "fs";
import type { Connect } from "vite";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  root: ".",
  server: {
    host: "::",
    port: 8080,
    strictPort: false, // дозволяє Vite вибрати інший порт
    configureServer(server) {
      server.httpServer?.once("listening", () => {
        const address = server.httpServer?.address();
        const port = typeof address === "object" && address?.port;
        fs.writeFileSync("../.vite-port", String(port));
      });
    },

    fs: {
      allow: ["./"],
      deny: [".env", ".env.*", "*.{crt,pem}", "**/.git/**", "server/**"],
    },
  },
  build: {
    outDir: "dist/spa",
  },
  plugins: [react(), expressPlugin()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./client"),
      "@shared": path.resolve(__dirname, "./shared"),
    },
  },
}));

function expressPlugin(): Plugin {
  return {
    name: "express-plugin",
    apply: "serve",
    async configureServer(server) {
      const { createServer } = await import("./server"); // 👈 динамічний імпорт
      const app = createServer();

      server.middlewares.use("/api", app);
    },
  };
}
