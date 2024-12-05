// vite.config.js
import { resolve } from "path";
import { defineConfig } from "vite";

export default defineConfig({
  server: {
    headers: {
      "Cross-Origin-Resource-Policy": "cross-origin",
      "Access-Control-Allow-Origin": "*",
    },
    cors: true,
  },
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        customer: resolve(__dirname, "customer.html"),
        agent: resolve(__dirname, "agent.html"),
      },
    },
  },
});
