// Components › Accordion › Playground: the spec the playground kit draws. An island.
import { Accordion, AccordionItem } from "@qeetrix/react";
import { element } from "../PlaygroundCode";
import PlaygroundKit, { type Spec } from "../PlaygroundKit";
import { FAQ } from "./examples";

const spec: Spec = {
  file: "faq.tsx",
  imports: [[["Accordion", "AccordionItem"], "@qeetrix/react"]],
  component: "Accordion",
  controls: [
    {
      prop: "headingLevel",
      label: "Heading level",
      kind: "choice",
      initial: "3",
      options: [
        ["2", "h2"],
        ["3", "h3"],
        ["4", "h4"],
        ["5", "h5"],
      ],
      code: () => null,
    },
    { prop: "multiple", label: "Several open", kind: "switch", initial: false },
    {
      prop: "defaultValue",
      label: "First open",
      kind: "switch",
      initial: true,
      code: (value) => (value ? ["defaultValue", '{["passkeys"]}'] : null),
    },
    { prop: "disabled", label: "Disabled", kind: "switch", initial: false },
  ],
  inner: (v) =>
    FAQ.flatMap(([value, title]) =>
      element(
        "AccordionItem",
        [
          ["value", `"${value}"`],
          ...(v.headingLevel !== "3"
            ? ([["headingLevel", `{${v.headingLevel}}`]] as Array<[string, string]>)
            : []),
          ["title", `"${title}"`],
        ],
        "…",
      ),
    ),
  render: (v) => (
    <div className="qc-fold-stage">
      <Accordion
        key={`${v.multiple}-${v.defaultValue}`}
        multiple={Boolean(v.multiple)}
        disabled={Boolean(v.disabled)}
        defaultValue={v.defaultValue ? ["passkeys"] : []}
      >
        {FAQ.map(([value, title, answer]) => (
          <AccordionItem
            key={value}
            value={value}
            title={title}
            headingLevel={Number(v.headingLevel) as 3}
          >
            {answer}
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  ),
};

export default function Playground() {
  return <PlaygroundKit spec={spec} />;
}
