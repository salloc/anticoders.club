import rehypeExternalLinks from "rehype-external-links"
import { defineConfig } from "astro/config"
import tailwind from "@astrojs/tailwind"
import sitemap from "@astrojs/sitemap"
import mdx from "@astrojs/mdx"
import preact from "@astrojs/preact"

import cloudflare from "@astrojs/cloudflare"

// https://astro.build/config
export default defineConfig({
  output: "hybrid",
  compressHTML: true,
  trailingSlash: "never",
  adapter: cloudflare({
    imageServiceSection: "cloudflare",
  }),
  vite: {
    optimizeDeps: {
      exclude: ["@resvg/resvg-js"],
    },
  },
  markdown: {
    drafts: true,
    shikiConfig: { theme: "css-variables" },
    rehypePlugins: [[rehypeExternalLinks, { target: "_blank" }]],
  },
  shikiConfig: {
    wrap: true,
    skipInline: false,
    drafts: true,
  },
  site: process.env.SITE_URL || "http://localhost:4321",
  integrations: [tailwind({ applyBaseStyles: false }), sitemap(), mdx(), preact()],
})
