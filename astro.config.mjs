import { defineConfig } from "astro/config";
import deno from "@deno/astro-adapter";
import tailwind from "@astrojs/tailwind";
import tailwindcssNesting from "tailwindcss/nesting";
import postcssNesting from "postcss-nesting";
import svelte from "@astrojs/svelte";
import preprocess from "svelte-preprocess";
import cssDiscardComments from 'postcss-discard-comments'
import mdx from "@astrojs/mdx";

// https://astro.build/config
export default defineConfig({
  output: "server",
  image: {
    // @deno/astro-adapter doesn't support sharp (Astro 6 default)
    service: { entrypoint: 'astro/assets/services/noop' },
  },
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
    svelte({
      preprocess: preprocess(),
      onwarn: (warning, handler) => {
        const suppress = [
          'css_unused_selector',
          'export_let_unused',
          'element_invalid_self_closing_tag',
          'attribute_illegal_colon',
          'a11y_no_noninteractive_tabindex',
          'a11y_no_static_element_interactions',
          'block_empty',
        ];
        if (suppress.includes(warning.code)) return;
        handler(warning);
      },
    }),
    mdx(),
  ],
  adapter: deno(),
});
