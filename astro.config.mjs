import mdx from "@astrojs/mdx";
import react from "@astrojs/react";
import { defineConfig } from "astro/config";

// Static pages; React only where an island asks for it (client:*). See README.md.
export default defineConfig({
  site: "https://ui.qeet.in",
  output: "static",
  integrations: [react(), mdx()],
  vite: {
    // @qeetrix/tokens names its breakpoints with @custom-media (--qx-viewport-*).
    css: { lightningcss: { drafts: { customMedia: true } } },
  },
});
