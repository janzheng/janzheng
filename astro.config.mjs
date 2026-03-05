import { defineConfig } from "astro/config";
import deno from "@deno/astro-adapter";
import tailwind from "@astrojs/tailwind";
import tailwindcssNesting from "tailwindcss/nesting";
import postcssNesting from "postcss-nesting";
import svelte from "@astrojs/svelte";
import cssDiscardComments from 'postcss-discard-comments'
import mdx from "@astrojs/mdx";
import react from "@astrojs/react";

// https://astro.build/config
export default defineConfig({
  output: "server",
  security: {
    // checkOrigin: true, // for lucia auth, but no I don't want this (want to be able to login from elsewhere)
  },
  vite: {
    css: {
      postcss: {
        plugins: [
          cssDiscardComments({ removeAll: true }),
          tailwindcssNesting(),
          postcssNesting(),
        ]
      }
    }
  },
  integrations: [
    tailwind({
      // applyBaseStyles: true,
      applyBaseStyles: false,
    }), 
    svelte(), mdx(), react()],
  adapter: deno({
    start: true,
  })
});