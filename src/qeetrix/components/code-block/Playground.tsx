// Components › Code block › Playground: the spec the playground kit draws. An island.
import { CodeBlock } from "@qeetrix/react/experimental";
import PlaygroundKit, { type Spec } from "../PlaygroundKit";
import { EVENT, METADATA, SNIPPET } from "./examples";

const CODE: Record<string, string> = {
  shell: "bun add @qeetrix/react @qeetrix/tokens",
  tsx: SNIPPET,
  json: EVENT,
  xml: METADATA,
};

const spec: Spec = {
  file: "snippet.tsx",
  imports: [[["CodeBlock"], "@qeetrix/react/experimental"]],
  component: "CodeBlock",
  controls: [
    {
      prop: "language",
      label: "Language",
      kind: "choice",
      initial: "json",
      options: [
        ["shell", "Shell"],
        ["tsx", "TSX"],
        ["json", "JSON"],
        ["xml", "XML"],
      ],
    },
    { prop: "title", label: "Title", kind: "text", initial: "" },
    { prop: "wrap", label: "Wrap", kind: "switch", initial: false },
    {
      prop: "lineNumbers",
      label: "Line numbers",
      kind: "switch",
      initial: true,
      code: (value, v) => (v.language === "shell" || value ? null : ["lineNumbers", "{false}"]),
    },
  ],
  after: (v) => [["code", v.language === "shell" ? `"${CODE.shell}"` : "{code}"]],
  render: (v) => (
    <div className="qc-code-stage">
      <CodeBlock
        language={v.language as "json"}
        title={String(v.title) || undefined}
        wrap={Boolean(v.wrap)}
        lineNumbers={v.language === "shell" ? undefined : Boolean(v.lineNumbers)}
        code={CODE[String(v.language)] ?? EVENT}
      />
    </div>
  ),
};

export default function Playground() {
  return <PlaygroundKit spec={spec} />;
}
