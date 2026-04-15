import { defineConfig } from "vite";

export default defineConfig({
  build: {
    lib: {
      entry: "src/webmention-feed.ts",
      name: "WebmentionFeed",
      formats: ["es"],
      fileName: "webmention-feed",
    },
    rollupOptions: {},
  },
});
