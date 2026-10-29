import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { docsSchema } from "./platform/content/schema";

export const collections = {
  docs: defineCollection({
    loader: glob({ pattern: "**/*.mdx", base: "./src/content/docs" }),
    schema: docsSchema,
  }),
};
