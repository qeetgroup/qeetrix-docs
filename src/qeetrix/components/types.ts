// A component's documentation, as every component page reads it: its facts, its examples, how to
// use it, its API, its accessibility and its changelog. Each component writes one (button/doc.tsx);
// the page template (ComponentPage.astro and tab-pages/) renders it, one tab per address.
import type { ReactNode } from "react";

export type Tab = "examples" | "usage" | "api" | "accessibility" | "changelog";

/** The tabs, in order, each its own address under the component's: "" is the component's own. */
export const TABS: ReadonlyArray<{ id: Tab; label: string; path: string }> = [
  { id: "examples", label: "Examples", path: "" },
  { id: "usage", label: "Usage", path: "usage" },
  { id: "api", label: "API", path: "api" },
  { id: "accessibility", label: "Accessibility", path: "accessibility" },
  { id: "changelog", label: "Changelog", path: "changelog" },
];

/** One live example: the real component, rendered to HTML, and the code that draws it. */
export interface ExampleDoc {
  id: string;
  title: string;
  line: string;
  code: string;
  render: () => ReactNode;
}

/** A do beside a don't, each drawn with the real components. */
export interface RuleDoc {
  title: string;
  doLine: string;
  dontLine: string;
  doIt: ReactNode;
  dontIt: ReactNode;
}

/** A part of the component: its data-slot, the element it renders, and what it's for. */
export interface PartDoc {
  slot: string;
  /** Which element the anatomy marks, when the slot alone isn't enough: the chosen day of a month. */
  select?: string;
  element: string;
  note: string;
}

export interface PropDoc {
  name: string;
  type: string;
  default: string;
  note: string;
}

export interface ComponentDoc {
  name: string;
  /** The address segment: "button" for /components/button. */
  slug: string;
  /** The category's id in components.ts: "actions". */
  category: string;
  status: "stable" | "experimental";
  since: string;
  /** One line: what it is and the rule that matters most. */
  lede: string;
  /** What `import { … }` names. */
  exports: string[];
  /** The element it renders: "<button>". */
  renders: string;
  /** The folder in qeetrix-react's packages/react/src, and the story file in qeetrix-story's stories. */
  source: string;
  story?: string;
  examples: ExampleDoc[];
  usage: {
    useFor: string[];
    notFor: Array<{ text: string; use: string }>;
    /** The component drawn large, its parts numbered in `anatomy` order (anatomy.ts marks them). */
    anatomyFigure: ReactNode;
    anatomy: PartDoc[];
    rules: RuleDoc[];
    /** The sizes at 1×, and a table of them: its column heads, then a row per size (size first). */
    sizes?: {
      /** The line under the heading; by default, that heights follow the density. */
      line?: string;
      specimen: ReactNode;
      columns: string[];
      rows: string[][];
    };
    content: string[];
  };
  api: {
    props: PropDoc[];
    parts: PartDoc[];
    /** Short notes, with the code each needs. */
    recipes: Array<{ title: string; line: string; file: string; code: string }>;
  };
  accessibility: {
    keyboard: Array<{ keys: string[]; action: string }>;
    checks: Array<{ check: string; result: string }>;
    tested: string[];
  };
  changelog: Array<{ version: string; items: string[] }>;
  /** Component names, as components.ts lists them. */
  related: Array<{ name: string; when: string }>;
}
