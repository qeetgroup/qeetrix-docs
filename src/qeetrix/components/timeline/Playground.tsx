// Components › Timeline › Playground: the spec the playground kit draws. An island.
import { CircleXIcon } from "@qeetrix/icons/icons/circle-x";
import { LogInIcon } from "@qeetrix/icons/icons/log-in";
import { Timeline, TimelineItem } from "@qeetrix/react/experimental";
import { element } from "../PlaygroundCode";
import PlaygroundKit, { type Spec } from "../PlaygroundKit";

const spec: Spec = {
  file: "recent-activity.tsx",
  imports: [
    [["CircleXIcon", "LogInIcon"], "@qeetrix/icons"],
    [["Timeline", "TimelineItem"], "@qeetrix/react/experimental"],
  ],
  component: "Timeline",
  fixed: () => [["aria-label", '"Recent activity"']],
  controls: [
    {
      prop: "variant",
      label: "Variant",
      kind: "choice",
      initial: "default",
      omit: "default",
      options: [
        ["default", "Default"],
        ["compact", "Compact"],
      ],
    },
    {
      prop: "tone",
      label: "Second event",
      kind: "choice",
      initial: "danger",
      options: [
        ["neutral", "Neutral"],
        ["success", "Success"],
        ["warning", "Warning"],
        ["danger", "Danger"],
      ],
      code: () => null,
    },
    { prop: "description", label: "Descriptions", kind: "switch", initial: true, code: () => null },
  ],
  inner: (v) => [
    ...element("TimelineItem", [
      ["icon", "{LogInIcon}"],
      ["title", '"Signed in with a passkey"'],
      ...(v.description
        ? ([["description", '"Bengaluru, India"']] as Array<[string, string]>)
        : []),
      ["time", '"2 min ago"'],
      ["dateTime", '"2026-10-29T03:58:00Z"'],
    ]),
    ...element("TimelineItem", [
      ["icon", "{CircleXIcon}"],
      ...(v.tone !== "neutral" ? ([["tone", `"${v.tone}"`]] as Array<[string, string]>) : []),
      ["title", '"Failed sign-in"'],
      ...(v.description ? ([["description", '"Mumbai, India"']] as Array<[string, string]>) : []),
      ["time", '"09:12"'],
      ["dateTime", '"2026-10-29T03:42:00Z"'],
    ]),
  ],
  render: (v) => (
    <div className="qc-fold-stage">
      <Timeline aria-label="Recent activity, playground" variant={v.variant as "default"}>
        <TimelineItem
          icon={LogInIcon}
          title="Signed in with a passkey"
          description={v.description ? "Bengaluru, India" : undefined}
          time="2 min ago"
          dateTime="2026-10-29T03:58:00Z"
        />
        <TimelineItem
          icon={CircleXIcon}
          tone={v.tone as "danger"}
          title="Failed sign-in"
          description={v.description ? "Mumbai, India" : undefined}
          time="09:12"
          dateTime="2026-10-29T03:42:00Z"
        />
      </Timeline>
    </div>
  ),
};

export default function Playground() {
  return <PlaygroundKit spec={spec} />;
}
