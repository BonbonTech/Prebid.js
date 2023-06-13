import { defineConfig } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";
import sveltePreprocess from "svelte-preprocess";

export default defineConfig({
  build: {
    lib: {
      entry: "./src/lib/index.js",
      name: "BonbonComponents",
      fileName: "bonbon-modal",
    },
  },
  plugins: [
    svelte({
      include: ["src/lib/Modal.svelte", "src/lib/BonbonLogo.svelte"],
      preprocess: sveltePreprocess(),
      compilerOptions: {
        css: true,
        customElement: true,
      },
    })
  ],
});