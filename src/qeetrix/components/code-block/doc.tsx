// Components › Code block: its documentation, from @qeetrix/react 0.2.0 (experimental/code-block),
// the Storybook stories (typography/code-block.stories.tsx) and the changelog. Its examples run
// live (Live.tsx), so Copy copies; the figures are server-rendered.
import { CodeBlock } from "@qeetrix/react/experimental";
import { DISPLAY_TESTED } from "../display";
import type { ComponentDoc } from "../types";
import { EVENT, examples, SNIPPET } from "./examples";

export const codeBlock: ComponentDoc = {
  name: "Code block",
  slug: "code-block",
  category: "data-display",
  status: "experimental",
  since: "0.0.6",
  lede: "Code to read and copy: a command, a snippet, a JSON event or XML metadata, coloured, with one Copy button.",
  exports: ["CodeBlock"],
  renders: "<pre>",
  source: "experimental/code-block",
  story: "components/typography/code-block.stories.tsx",
  examples,

  usage: {
    useFor: [
      "A command to run: bun add @qeetrix/react.",
      "A snippet, a webhook event, SAML metadata.",
    ],
    notFor: [
      { text: "A key or an ID in a sentence", use: "Text" },
      { text: "A value to copy, in a record", use: "Copy button" },
      { text: "Code to edit", use: "Textarea" },
    ],
    anatomyFigure: (
      <div className="qc-code-stage">
        <CodeBlock language="json" title="user.signed_in" code={EVENT} />
      </div>
    ),
    anatomy: [
      {
        slot: "code-block-header",
        element: "<div>",
        note: "The title or the language, and Copy: for more than one line.",
      },
      {
        slot: "copy",
        select: '[data-slot="code-block-header"] button',
        element: "<button>",
        note: '"Copy code": the code exactly, never the line numbers.',
      },
      {
        slot: "region",
        select: '[data-slot="code-block"] section',
        element: "<section>",
        note: "The code: a named region that takes focus, so long lines scroll by keyboard.",
      },
      {
        slot: "code",
        select: '[data-slot="code-block"] pre',
        element: "<pre>",
        note: "Monospace, coloured by the code tokens; ligatures off.",
      },
    ],
    rules: [
      {
        title: "The code as it's copied",
        doLine: "Exactly what runs: no prompt, no output.",
        dontLine: "A $ prompt and the output: Copy takes them too.",
        doIt: (
          <div className="qc-code-stage">
            <CodeBlock language="shell" code="bun add @qeetrix/react @qeetrix/tokens" />
          </div>
        ),
        dontIt: (
          <div className="qc-code-stage">
            <CodeBlock
              language="shell"
              code={"$ bun add @qeetrix/react @qeetrix/tokens\ninstalled @qeetrix/react@0.2.0"}
            />
          </div>
        ),
      },
      {
        title: "Name the language",
        doLine: "language: it's coloured, and the header says what it is.",
        dontLine: "Left as text: no colours, and no name.",
        doIt: (
          <div className="qc-code-stage">
            <CodeBlock language="tsx" code={SNIPPET} />
          </div>
        ),
        dontIt: (
          <div className="qc-code-stage">
            <CodeBlock code={SNIPPET} />
          </div>
        ),
      },
    ],
    content: [
      "The code exactly as it should run or be pasted.",
      "A title for a file or an event: qeet-id.config.ts, user.signed_in.",
      "Short: the lines that matter, not a whole file.",
    ],
  },

  api: {
    props: [
      {
        name: "code",
        type: "string",
        default: "required",
        note: "The code, as it should be copied.",
      },
      {
        name: "language",
        type: '"shell" | "javascript" | "typescript" | "tsx" | "json" | "xml" | "html" | "css" | "text"',
        default: '"text"',
        note: "How to colour it; text has no colours.",
      },
      { name: "title", type: "ReactNode", default: "the language", note: "The header's label." },
      {
        name: "lineNumbers",
        type: "boolean",
        default: "more than one line",
        note: "Number the lines; drawn by CSS, so copying never picks them up.",
      },
      {
        name: "wrap",
        type: "boolean",
        default: "false",
        note: "Wrap long lines under their own start, instead of scrolling sideways.",
      },
      {
        name: "messages",
        type: "object",
        default: "the provider's",
        note: '"Copy code", the region\'s name.',
      },
    ],
    parts: [
      { slot: "code-block", element: "<div>", note: "The block." },
      { slot: "code-block-header", element: "<div>", note: "The label and Copy." },
    ],
    recipes: [
      {
        title: "On the server",
        line: "Server-safe: the code is highlighted where it renders; only Copy hydrates.",
        file: "install.tsx",
        code: `import { CodeBlock } from "@qeetrix/react/experimental";

<CodeBlock language="shell" code="bun add @qeetrix/react @qeetrix/tokens" />`,
      },
      {
        title: "Without React",
        line: "highlightHtml: the same colours as HTML, for a static page's build.",
        file: "build.ts",
        code: `import { highlightHtml } from "@qeetrix/react/experimental";

const html = \`<pre><code>\${highlightHtml(source, "css")}</code></pre>\`;`,
      },
    ],
  },

  accessibility: {
    keyboard: [
      { keys: ["Tab"], action: "To Copy, then to the code region when its lines scroll." },
      { keys: ["←", "→"], action: "Scroll the region sideways, while it has focus." },
    ],
    checks: [
      {
        check: "Region",
        result: 'A <section> named by the title, or "Code"; it takes focus, unless wrap.',
      },
      { check: "Copy", result: 'Named "Copy code"; it says "Copied" as it copies.' },
      { check: "Line numbers", result: "Drawn by CSS: never read, never copied." },
    ],
    tested: DISPLAY_TESTED,
  },

  changelog: [
    {
      version: "0.2.0",
      items: [
        "Server-safe: highlighted where it renders; only Copy hydrates.",
        "css is a language; highlight and highlightHtml are exported for static pages.",
      ],
    },
    {
      version: "0.1.0",
      items: ["Wrapped lines keep their indent, and the number column fits three-digit lines."],
    },
    {
      version: "0.0.6",
      items: [
        "CodeBlock: code to read and copy, coloured by the code tokens with our own small highlighter (shell, JavaScript and TypeScript with JSX, JSON, XML and HTML). More than one line gets a header with the language and Copy, and CSS line numbers; long lines scroll in a named, keyboard-reachable region, or wrap. Ligatures are off.",
      ],
    },
  ],

  related: [
    { name: "Copy button", when: "A value to copy" },
    { name: "Text", when: "Inline code, mono" },
  ],
};
