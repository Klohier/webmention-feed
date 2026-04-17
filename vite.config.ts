import { defineConfig } from "vite";

export default defineConfig(({ mode }) => {
  if (mode === "cdn") {
    return {
      build: {
        lib: {
          entry: "src/webmention-feed.ts",
          name: "WebmentionFeed",
          formats: ["es"],
          fileName: "webmention-feed",
        },
        outDir: "cdn",
        emptyOutDir: true,
      },
    };
  }

  return {
    build: {
      lib: {
        entry: "src/webmention-feed.ts",
        name: "WebmentionFeed",
        formats: ["es"],
        fileName: "webmention-feed",
      },
      rollupOptions: {
        external: ["lit", /^lit\//],
      },
    },
  };
});
