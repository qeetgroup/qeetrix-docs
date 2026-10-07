import defaultMdxComponents from "fumadocs-ui/mdx";
import type { MDXComponents } from "mdx/types";
import { ComponentPreview } from "./component-preview";
import { Callout } from "./docs/callout";
import {
  CodeBlock,
  CodeTab,
  CodeTabs,
  CodeTabsList,
  CodeTabsTrigger,
} from "./docs/code-block";
import * as Foundations from "./foundations";

export function getMDXComponents(components?: MDXComponents) {
  return {
    ...defaultMdxComponents,
    // Code, tabbed code and callouts in the site's own frames (src/components/docs).
    pre: (props) => <CodeBlock {...props} />,
    CodeBlockTabs: CodeTabs,
    CodeBlockTabsList: CodeTabsList,
    CodeBlockTabsTrigger: CodeTabsTrigger,
    CodeBlockTab: CodeTab,
    Callout,
    ComponentPreview,
    ...Foundations,
    ...components,
  } satisfies MDXComponents;
}

export const useMDXComponents = getMDXComponents;

declare global {
  type MDXProvidedComponents = ReturnType<typeof getMDXComponents>;
}
