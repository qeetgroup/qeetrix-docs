// Components › Tooltip › Playground: the spec the playground kit draws. An island.
import { DownloadIcon } from "@qeetrix/icons/icons/download";
import { IconButton, Tooltip } from "@qeetrix/react";
import { element } from "../PlaygroundCode";
import PlaygroundKit, { type Spec } from "../PlaygroundKit";

const spec: Spec = {
  file: "download.tsx",
  imports: [
    [["DownloadIcon"], "@qeetrix/icons"],
    [["IconButton", "Tooltip"], "@qeetrix/react"],
  ],
  component: "Tooltip",
  controls: [
    { prop: "content", label: "Text", kind: "text", initial: "Download INV-2026-0042 (PDF)" },
    {
      prop: "side",
      label: "Side",
      kind: "choice",
      initial: "top",
      omit: "top",
      options: [
        ["top", "Top"],
        ["bottom", "Bottom"],
        ["left", "Left"],
        ["right", "Right"],
      ],
    },
    { prop: "delay", label: "Delay, ms", kind: "number", initial: "500", omit: "500" },
  ],
  inner: () =>
    element("IconButton", [
      ["icon", "{DownloadIcon}"],
      ["aria-label", '"Download invoice"'],
      ["tooltip", "{false}"],
    ]),
  render: (v) => (
    <Tooltip
      content={String(v.content) || "Text"}
      side={v.side as "top"}
      delay={Number(v.delay) || 0}
    >
      <IconButton icon={DownloadIcon} aria-label="Download invoice" tooltip={false} />
    </Tooltip>
  ),
};

export default function Playground() {
  return <PlaygroundKit spec={spec} />;
}
