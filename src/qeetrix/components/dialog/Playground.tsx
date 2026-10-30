// Components › Dialog › Playground: the spec the playground kit draws. An island.
import {
  Button,
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogTrigger,
} from "@qeetrix/react";
import { element, indent, opening } from "../PlaygroundCode";
import PlaygroundKit, { type Spec } from "../PlaygroundKit";

const quote = (value: unknown) => `"${String(value)}"`;

const spec: Spec = {
  file: "revoke.tsx",
  imports: [
    [
      ["Button", "Dialog", "DialogClose", "DialogContent", "DialogFooter", "DialogTrigger"],
      "@qeetrix/react",
    ],
  ],
  component: "Dialog",
  controls: [
    {
      prop: "intent",
      label: "Intent",
      kind: "choice",
      initial: "danger",
      omit: "standard",
      options: [
        ["standard", "Standard"],
        ["warning", "Warning"],
        ["danger", "Danger"],
      ],
    },
    {
      prop: "title",
      label: "Title",
      kind: "text",
      initial: "Revoke this API key?",
      code: () => null,
    },
    {
      prop: "description",
      label: "Description",
      kind: "text",
      initial: "The reconciler stops working at once.",
      code: () => null,
    },
    {
      prop: "size",
      label: "Size",
      kind: "choice",
      initial: "sm",
      options: [
        ["sm", "sm"],
        ["md", "md"],
        ["lg", "lg"],
      ],
      code: () => null,
    },
    {
      prop: "dismissible",
      label: "Dismissible",
      kind: "switch",
      initial: false,
      code: (value, v) =>
        v.intent === "danger"
          ? value
            ? ["dismissible"]
            : null
          : value
            ? null
            : ["dismissible", "{false}"],
    },
  ],
  inner: (v) => {
    const tone = v.intent === "danger" ? [["tone", '"danger"']] : [];
    const content: Array<[string, string?]> = [["title", quote(v.title || "Title")]];
    if (v.description) content.push(["description", quote(v.description)]);
    if (v.size !== "md") content.push(["size", quote(v.size)]);
    return [
      ...element("DialogTrigger", [["render", "{<Button>Open</Button>}"]]),
      ...opening("DialogContent", content),
      ...indent([
        ...opening("DialogFooter", []),
        ...indent([
          ...element("DialogClose", [["render", '{<Button variant="ghost">Cancel</Button>}']]),
          ...element("DialogClose", [
            ["render", `{<Button${tone.length ? ' tone="danger"' : ""}>Confirm</Button>}`],
          ]),
        ]),
        [["</"], ["DialogFooter"], [">"]],
      ]),
      [["</"], ["DialogContent"], [">"]],
    ];
  },
  render: (v) => {
    const intent = v.intent as "standard" | "warning" | "danger";
    return (
      <Dialog
        intent={intent}
        dismissible={Boolean(v.dismissible) || (intent !== "danger" && v.dismissible !== false)}
      >
        <DialogTrigger
          render={<Button tone={intent === "danger" ? "danger" : "brand"}>Open</Button>}
        />
        <DialogContent
          title={String(v.title) || "Title"}
          description={String(v.description) || undefined}
          size={v.size as "sm"}
        >
          <DialogFooter>
            <DialogClose render={<Button variant="ghost">Cancel</Button>} />
            <DialogClose
              render={<Button tone={intent === "danger" ? "danger" : "brand"}>Confirm</Button>}
            />
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  },
};

export default function Playground() {
  return <PlaygroundKit spec={spec} />;
}
