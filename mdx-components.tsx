import type { MDXComponents } from "mdx/types";
import type { ComponentProps } from "react";
import { CodeBlock } from "@/components/code-block";

/**
 * Maps MDX elements to Qeetrix-styled elements (design tokens only), and exposes
 * a few authoring components (e.g. <CodeBlock>). Used by @next/mdx across the app.
 */
export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h1: (props: ComponentProps<"h1">) => (
      <h1 className="font-display text-3xl font-semibold tracking-tight" {...props} />
    ),
    h2: (props: ComponentProps<"h2">) => (
      <h2 className="mt-10 font-display text-2xl font-semibold tracking-tight" {...props} />
    ),
    h3: (props: ComponentProps<"h3">) => (
      <h3 className="mt-6 font-display text-lg font-semibold" {...props} />
    ),
    p: (props: ComponentProps<"p">) => (
      <p className="mt-4 leading-relaxed text-muted-foreground" {...props} />
    ),
    a: (props: ComponentProps<"a">) => (
      <a className="text-brand-text underline-offset-4 hover:underline" {...props} />
    ),
    ul: (props: ComponentProps<"ul">) => (
      <ul className="mt-4 list-disc space-y-1.5 pl-6 text-muted-foreground" {...props} />
    ),
    ol: (props: ComponentProps<"ol">) => (
      <ol className="mt-4 list-decimal space-y-1.5 pl-6 text-muted-foreground" {...props} />
    ),
    li: (props: ComponentProps<"li">) => <li className="leading-relaxed" {...props} />,
    code: (props: ComponentProps<"code">) => (
      <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm" {...props} />
    ),
    pre: (props: ComponentProps<"pre">) => (
      <pre
        className="mt-4 overflow-x-auto rounded-xl border border-border bg-card p-4 font-mono text-xs [&_code]:bg-transparent [&_code]:p-0"
        {...props}
      />
    ),
    blockquote: (props: ComponentProps<"blockquote">) => (
      <blockquote
        className="mt-4 border-l-2 border-brand pl-4 text-muted-foreground italic"
        {...props}
      />
    ),
    hr: (props: ComponentProps<"hr">) => <hr className="my-8 border-border" {...props} />,
    CodeBlock,
    ...components,
  };
}
