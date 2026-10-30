// Components › Tabs › Playground: the spec the playground kit draws. An island.
import { Tab, Tabs, TabsList, TabsPanel, Text } from "@qeetrix/react";
import { element, indent, opening } from "../PlaygroundCode";
import PlaygroundKit, { type Spec } from "../PlaygroundKit";
import { APP } from "./examples";

const spec: Spec = {
  file: "application-page.tsx",
  imports: (v) => [
    ...(v.icons
      ? ([[APP.map(([, , , name]) => name), "@qeetrix/icons"]] as Array<[string[], string]>)
      : []),
    [["Tab", "Tabs", "TabsList", "TabsPanel"], "@qeetrix/react"],
  ],
  component: "Tabs",
  fixed: () => [["defaultValue", '"users"']],
  controls: [
    {
      prop: "orientation",
      label: "Orientation",
      kind: "choice",
      initial: "horizontal",
      omit: "horizontal",
      options: [
        ["horizontal", "Horizontal"],
        ["vertical", "Vertical"],
      ],
    },
    {
      prop: "variant",
      label: "Variant",
      kind: "choice",
      initial: "line",
      options: [
        ["line", "Line"],
        ["contained", "Contained"],
      ],
      code: () => null,
    },
    { prop: "icons", label: "Icons", kind: "switch", initial: false, code: () => null },
    { prop: "count", label: "Count", kind: "switch", initial: true, code: () => null },
    {
      prop: "activateOnFocus",
      label: "Select on focus",
      kind: "switch",
      initial: true,
      code: () => null,
    },
  ],
  inner: (v) => {
    const list: Array<[string, string?]> = [["aria-label", '"Payroll portal"']];
    if (v.variant !== "line") list.push(["variant", `"${v.variant}"`]);
    if (!v.activateOnFocus) list.push(["activateOnFocus", "{false}"]);
    const tabs = APP.flatMap(([value, label, , name]) => {
      const props: Array<[string, string?]> = [["value", `"${value}"`]];
      if (v.icons) props.push(["icon", `{${name}}`]);
      if (v.count && value === "users") props.push(["badge", "{642}"]);
      return element("Tab", props, label);
    });
    return [
      ...opening("TabsList", list),
      ...indent(tabs),
      [["</"], ["TabsList"], [">"]],
      ...element("TabsPanel", [["value", '"users"']], "…"),
    ];
  },
  render: (v) => (
    <div className="qc-tabs-stage">
      <Tabs
        defaultValue="users"
        orientation={v.orientation as "horizontal"}
        className={v.orientation === "vertical" ? "qc-tabs-vertical" : undefined}
      >
        <TabsList
          aria-label="Payroll portal"
          variant={v.variant as "line"}
          activateOnFocus={Boolean(v.activateOnFocus)}
        >
          {APP.map(([value, label, Icon]) => (
            <Tab
              key={value}
              value={value}
              icon={v.icons ? Icon : undefined}
              badge={v.count && value === "users" ? 642 : undefined}
            >
              {label}
            </Tab>
          ))}
        </TabsList>
        {APP.map(([value, , , , panel]) => (
          <TabsPanel key={value} value={value} className="qc-tab-panel">
            <Text tone="subtle">{panel}</Text>
          </TabsPanel>
        ))}
      </Tabs>
    </div>
  ),
};

export default function Playground() {
  return <PlaygroundKit spec={spec} />;
}
