import { z } from "astro/zod";

/** A component's or page's lifecycle, the same words `@qeetrix/react` uses. */
export const status = z.enum(["stable", "experimental", "deprecated"]);

/**
 * Every docs page's metadata, checked at build time: a page without a title or description, or
 * with an unknown status, fails the build.
 */
export const docsSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  status: status.optional(),
  since: z
    .string()
    .regex(/^\d+\.\d+\.\d+$/)
    .optional(), // the package version it arrived in
  aka: z.array(z.string()).default([]), // other names, for search
});
