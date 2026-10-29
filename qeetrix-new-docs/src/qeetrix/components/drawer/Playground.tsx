// Components › Drawer › Playground: the spec the playground kit draws. An island.
import {
  Button,
  Drawer,
  DrawerBody,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerTrigger,
  TextField,
} from "@qeetrix/react";
import { element, indent, opening } from "../PlaygroundCode";
import PlaygroundKit, { type Spec } from "../PlaygroundKit";

const spec: Spec = {
  file: "edit-member.tsx",
  imports: [
    [
      [
        "Button",
        "Drawer",
        "DrawerBody",
        "DrawerClose",
        "DrawerContent",
        "DrawerFooter",
        "DrawerTrigger",
        "TextField",
      ],
      "@qeetrix/react",
    ],
  ],
  component: "Drawer",
  controls: [
    {
      prop: "side",
      label: "Side",
      kind: "choice",
      initial: "end",
      omit: "end",
      options: [
        ["start", "Start"],
        ["end", "End"],
      ],
    },
    { prop: "title", label: "Title", kind: "text", initial: "Priya Sharma", code: () => null },
    {
      prop: "size",
      label: "Size",
      kind: "choice",
      initial: "md",
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
      initial: true,
      code: (value) => (value ? null : ["dismissible", "{false}"]),
    },
  ],
  inner: (v) => {
    const content: Array<[string, string?]> = [["title", `"${v.title || "Title"}"`]];
    if (v.size !== "md") content.push(["size", `"${v.size}"`]);
    return [
      ...element("DrawerTrigger", [["render", "{<Button>Open</Button>}"]]),
      ...opening("DrawerContent", content),
      ...indent([
        ...opening("DrawerBody", []),
        ...indent(element("TextField", [["label", '"Display name"']])),
        [["</"], ["DrawerBody"], [">"]],
        ...opening("DrawerFooter", []),
        ...indent(element("DrawerClose", [["render", "{<Button>Save changes</Button>}"]])),
        [["</"], ["DrawerFooter"], [">"]],
      ]),
      [["</"], ["DrawerContent"], [">"]],
    ];
  },
  render: (v) => (
    <Drawer side={v.side as "start" | "end"} dismissible={Boolean(v.dismissible)}>
      <DrawerTrigger render={<Button>Open</Button>} />
      <DrawerContent title={String(v.title) || "Title"} size={v.size as "md"}>
        <DrawerBody>
          <TextField label="Display name" defaultValue="Priya Sharma" />
        </DrawerBody>
        <DrawerFooter>
          <DrawerClose render={<Button>Save changes</Button>} />
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  ),
};

export default function Playground() {
  return <PlaygroundKit spec={spec} />;
}
