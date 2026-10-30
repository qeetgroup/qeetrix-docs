// Components › Collapsible › Playground: the spec the playground kit draws. An island.
import { ChevronDownIcon } from "@qeetrix/icons/icons/chevron-down";
import {
  Box,
  Button,
  Collapsible,
  CollapsiblePanel,
  CollapsibleTrigger,
  Stack,
} from "@qeetrix/react";
import { element } from "../PlaygroundCode";
import PlaygroundKit, { type Spec } from "../PlaygroundKit";
import { Facts } from "./examples";

const spec: Spec = {
  file: "advanced-settings.tsx",
  imports: [
    [["ChevronDownIcon"], "@qeetrix/icons"],
    [["Button", "Collapsible", "CollapsiblePanel", "CollapsibleTrigger"], "@qeetrix/react"],
  ],
  component: "Collapsible",
  controls: [
    { prop: "label", label: "Label", kind: "text", initial: "Advanced settings", code: () => null },
    {
      prop: "variant",
      label: "Trigger",
      kind: "choice",
      initial: "ghost",
      options: [
        ["ghost", "Ghost"],
        ["soft", "Soft"],
      ],
      code: () => null,
    },
    { prop: "defaultOpen", label: "Open at first", kind: "switch", initial: false },
    { prop: "disabled", label: "Disabled", kind: "switch", initial: false },
  ],
  inner: (v) => [
    ...element("CollapsibleTrigger", [
      [
        "render",
        `{<Button variant="${v.variant}" icon={ChevronDownIcon}>${v.label || "Advanced settings"}</Button>}`,
      ],
    ]),
    ...element("CollapsiblePanel", [], "…"),
  ],
  render: (v) => (
    <div className="qc-fold-stage">
      <Collapsible
        key={String(v.defaultOpen)}
        defaultOpen={Boolean(v.defaultOpen)}
        disabled={Boolean(v.disabled)}
      >
        <Stack gap="sm">
          <div>
            <CollapsibleTrigger
              render={
                <Button variant={v.variant as "ghost"} icon={ChevronDownIcon}>
                  {String(v.label) || "Advanced settings"}
                </Button>
              }
            />
          </div>
          <CollapsiblePanel>
            <Box border="default" radius="control" padding="md">
              <Facts
                rows={[
                  ["Token lifetime", "3,600 s"],
                  ["Clock skew", "30 s"],
                ]}
              />
            </Box>
          </CollapsiblePanel>
        </Stack>
      </Collapsible>
    </div>
  ),
};

export default function Playground() {
  return <PlaygroundKit spec={spec} />;
}
